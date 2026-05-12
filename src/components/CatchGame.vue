<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";

// Импорт изображений
import flowerImg from "/src/assets/i.png";
import beeImg from "/src/assets/пчела.png";
import flower2Img from "/src/assets/flower2.png";
import flower3Img from "/src/assets/flower3.png";
import starImg from "/src/assets/star.png";

const route = useRoute();
const router = useRouter();

// текущий шаг игры берется из url роутера или ставится start по умолчанию
const currentStep = computed(() => route.query.step || "start");

// переменные для результатов из роутера
const resultStatus = computed(() => route.query.status);
const resultScore = computed(() => route.query.score || 0);
const resultReason = computed(() => route.query.reason || "");

// основные переменные состояния игры
const lives = ref(3);
const score = ref(0);
const highScore = ref(0);
const items = ref([]);
const currentTargetType = ref("flower");
const starMessage = ref("");

// переменная для хранения таймера раунда
let gameTimer = null;

// список всех возможных целей
const targetTypes = ["flower", "bee", "flower2", "flower3"];

// конфигурация игры
const config = {
  winScore: 20,
  initialSpeed: 1300,
  minSpeed: 500,
  speedIncrement: 50,
  timeoutBuffer: 1000,
  gameWidth: 700,
  gameHeight: 450,
  minDistance: 75,
  headerHeight: 100,
  bonusChance: 0.15,
  starDuration: 2000,
  images: {
    flower: flowerImg,
    bee: beeImg,
    flower2: flower2Img,
    flower3: flower3Img,
    star: starImg,
  },
};

// текущая скорость игры
const gameSpeed = ref(config.initialSpeed);

// функция очистки рекорда
const resetRecord = () => {
  localStorage.removeItem("flower_game_record");
  highScore.value = 0;
};

// проверка и обновление лучшего результата
const updateHighScore = (currentScore) => {
  const saved = parseInt(localStorage.getItem("flower_game_record") || "0");
  if (currentScore > saved) {
    localStorage.setItem("flower_game_record", currentScore.toString());
    highScore.value = currentScore;
  }
};

// сброс всех параметров
const initGameParams = () => {
  score.value = 0;
  lives.value = 3;
  gameSpeed.value = config.initialSpeed;
  items.value = [];
  starMessage.value = "";
};

// запуск игры
const startGame = async () => {
  initGameParams();
  await router.push({ query: { step: "play" } });
  spawnNewRound();
};

// остановка игры
const stopAndGoToMenu = () => {
  clearTimeout(gameTimer);
  router.push({ query: {} });
};

// генерация нового раунда
const spawnNewRound = () => {
  if (currentStep.value !== "play") return;

  clearTimeout(gameTimer);
  items.value = [];
  starMessage.value = "";

  // случайно выбираем цель из всех возможных
  const randomIndex = Math.floor(Math.random() * targetTypes.length);
  currentTargetType.value = targetTypes[randomIndex];
  items.value.push(generateItem(currentTargetType.value));

  // обманки
  const possibleDecoys = Object.keys(config.images).filter(
    (t) => t !== currentTargetType.value && t !== "star"
  );

  const decoyCount =
    score.value > 8 ? 3 : score.value > 4 ? 2 : score.value > 1 ? 1 : 0;

  possibleDecoys.slice(0, decoyCount).forEach((t) => {
    let d,
      att = 0;
    do {
      d = generateItem(t);
      att++;
    } while (isOverlapping(d, items.value) && att < 50);
    items.value.push(d);
  });

  // звезда
  if (Math.random() < config.bonusChance) {
    let starItem,
      att = 0;
    do {
      starItem = generateItem("star");
      att++;
    } while (isOverlapping(starItem, items.value) && att < 50);
    items.value.push(starItem);
    starMessage.value = "⭐ Звезда появилась! Поймай её для бонуса! ⭐";
    setTimeout(() => {
      items.value = items.value.filter((i) => i !== starItem);
      starMessage.value = "";
    }, config.starDuration);
  }

  gameTimer = setTimeout(
    () => endGame("Время вышло!", false),
    gameSpeed.value + config.timeoutBuffer
  );
};

// обработчик клика
const itemClicked = (item) => {
  if (item.type === "star") {
    score.value += 5;
    if (lives.value < 3) lives.value++;
    updateHighScore(score.value);
    items.value = items.value.filter((i) => i !== item);
    starMessage.value = "";
    return;
  }

  if (item.type !== currentTargetType.value) {
    lives.value--;
    if (lives.value <= 0) return endGame("Жизни закончились!", false);
    spawnNewRound();
    return;
  }

  score.value++;
  updateHighScore(score.value);

  if (score.value >= config.winScore) return endGame("", true);

  if (gameSpeed.value > config.minSpeed)
    gameSpeed.value -= config.speedIncrement;
  spawnNewRound();
};

// генератор координат
const generateItem = (type) => ({
  type,
  image: config.images[type],
  x: Math.random() * config.gameWidth,
  y:
    config.headerHeight +
    Math.random() * (config.gameHeight - config.headerHeight),
});

// проверка наложения
const isOverlapping = (n, e) => {
  return e.some(
    (i) =>
      Math.sqrt(Math.pow(n.x - i.x, 2) + Math.pow(n.y - i.y, 2)) <
      config.minDistance
  );
};

// завершение игры
const endGame = (reason = "", isWin = false) => {
  clearTimeout(gameTimer);
  router.push({
    query: {
      step: "result",
      status: isWin ? "won" : "lost",
      score: score.value,
      reason,
    },
  });
};

onMounted(() => {
  highScore.value = parseInt(localStorage.getItem("flower_game_record") || "0");
  if (currentStep.value === "play") {
    initGameParams();
    spawnNewRound();
  }
});

onUnmounted(() => {
  clearTimeout(gameTimer);
});
</script>

<template>
  <div class="game-container">
    <div v-if="currentStep === 'start'" class="game-overlay">
      <h1>Поймай их всех!</h1>
      <div class="record-wrapper">
        <p>Лучший результат: <strong>{{ highScore }}</strong></p>
        <button v-if="highScore > 0" @click="resetRecord" class="clear-btn" title="Очистить рекорд">🗑️</button>
      </div>
      <button @click="startGame">Начать игру</button>
    </div>

    <div v-else-if="currentStep === 'play'">
      <div class="lives-panel">
        <span class="lives-label">Жизни:</span>
        <span class="lives-icons">{{ "❤️".repeat(lives) }}</span>
      </div>

      <div v-if="starMessage" class="star-message">{{ starMessage }}</div>

      <div class="target-hint">
        <h2>Твоя цель:</h2>
        <img :src="config.images[currentTargetType]" class="hint-image" />
      </div>

      <h3 class="score-display">Счет: {{ score }}</h3>

      <img
        v-for="(item, index) in items"
        :key="index"
        :src="item.image"
        class="game-item"
        :style="{ top: item.y + 'px', left: item.x + 'px' }"
        @click="itemClicked(item)"
      />
    </div>

    <div v-else-if="currentStep === 'result'" class="game-overlay">
      <h1>{{ resultStatus === "won" ? "Победа!" : "Проигрыш!" }}</h1>
      <p v-if="resultStatus !== 'won'">{{ resultReason }}</p>
      <h2>Счет: {{ resultScore }}</h2>
      <div class="record-wrapper">
        <p class="record-text">Рекорд: {{ highScore }}</p>
        <span v-if="highScore > 0" @click="resetRecord" class="clear-btn">🗑️</span>
      </div>
      <button @click="startGame">Играть снова</button>
      <button class="secondary" @click="stopAndGoToMenu">В меню</button>
    </div>
  </div>
</template>

<style scoped>
.game-container {
  font-family: "Arial Black", Gadget, sans-serif;
  width: 800px;
  height: 600px;
  border: 3px solid #9875dd;
  border-radius: 15px;
  margin: 50px auto;
  text-align: center;
  position: relative;
  background-color: #ffffff;
  overflow: hidden;
}

.star-message {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(45deg, gold, orange);
  color: #fff;
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 1.2rem;
  font-weight: bold;
  animation: pulse 0.5s infinite alternate;
  z-index: 200;
  white-space: nowrap;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
}

@keyframes pulse {
  from { transform: translateX(-50%) scale(1); }
  to { transform: translateX(-50%) scale(1.05); }
}

.target-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;
}

.target-hint h2 {
  color: #29ad4c;
  margin: 0;
  font-size: 1.8rem;
}

.hint-image {
  width: 50px;
  height: 50px;
  animation: bounce 0.6s infinite alternate;
}

@keyframes bounce {
  from { transform: translateY(0); }
  to { transform: translateY(-5px); }
}

.score-display {
  margin-top: 5px;
  color: #333;
}

.record-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
  color: #000;
}

.clear-btn {
  cursor: pointer;
  font-size: 1.2rem;
  padding: 5px;
  opacity: 0.5;
  transition: 0.2s;
}

.clear-btn:hover {
  opacity: 1;
  transform: scale(1.2);
}

.lives-panel {
  position: absolute;
  top: 15px;
  right: 20px;
  background: #ffffff;
  padding: 10px 20px;
  border-radius: 50px;
  border: 2px solid #000000;
  box-shadow: 4px 4px 0px #9875dd;
  z-index: 1000;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.lives-label {
  font-weight: 900;
  margin-right: 10px;
  font-size: 1.2rem;
  text-transform: uppercase;
  color: #000;
}
.lives-icons {
  font-size: 1.4rem;
}

.game-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  color: #000;
}

h1 {
  font-size: 3.5rem;
  color: #000;
  margin-bottom: 10px;
}

.game-item {
  width: 60px;
  height: 60px;
  position: absolute;
  cursor: pointer;
  transition: transform 0.1s;
}

.game-item:hover {
  transform: scale(1.2);
}

button {
  padding: 15px 35px;
  font-size: 1.5rem;
  background: #9875dd;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin: 10px;
  font-family: inherit;
}

button:hover {
  background: #a54f93;
}
button.secondary {
  background: #555;
}
.record-text {
  font-size: 1rem;
  color: #666;
  font-weight: normal;
  margin: 0;
}
</style>
