<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";

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

// переменная для хранения таймера раунда
let gameTimer = null;

// конфигурация игры с настройками сложности и картинками
const config = {
  winScore: 20, initialSpeed: 1300, minSpeed: 500, speedIncrement: 50,
  timeoutBuffer: 1000, gameWidth: 700, gameHeight: 450, minDistance: 75,
  headerHeight: 100, bonusChance: 0.15, starDuration: 2000,
  images: {
    flower: "src/assets/i.png", bee: "src/assets/пчела.png",
    flower2: "src/assets/flower2.png", flower3: "src/assets/flower3.png",
    star: "src/assets/star.png",
  },
};

// текущая скорость игры которая будет уменьшаться
const gameSpeed = ref(config.initialSpeed);

// функция очистки рекорда напрямую из памяти браузера
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

// сброс всех параметров перед началом новой игры
const initGameParams = () => {
  score.value = 0;
  lives.value = 3;
  gameSpeed.value = config.initialSpeed;
  items.value = [];
};

// запуск игры и смена url через роутер
const startGame = async () => {
  initGameParams();
  await router.push({ query: { step: 'play' } });
  spawnNewRound();
};

// принудительная остановка игры и возврат в главное меню
const stopAndGoToMenu = () => {
  clearTimeout(gameTimer);
  router.push({ query: {} }); 
};

// функция генерации нового раунда
const spawnNewRound = () => {
  // защита от запуска если мы не на экране игры
  if (currentStep.value !== "play") return;
  
  clearTimeout(gameTimer);
  items.value = [];
  
  // случайно выбираем кого нужно ловить в этом раунде
  currentTargetType.value = Math.random() > 0.5 ? "flower" : "bee";
  items.value.push(generateItem(currentTargetType.value));

  // собираем массив картинок-обманок исключая текущую цель и звезду
  const possibleDecoys = Object.keys(config.images).filter(t => t !== currentTargetType.value && t !== "star");
  
  // усложнение игры увеличиваем количество обманок в зависимости от счета
  const decoyCount = score.value > 8 ? 3 : score.value > 4 ? 2 : score.value > 1 ? 1 : 0;

  // расставляем обманки на поле с проверкой наложения
  possibleDecoys.slice(0, decoyCount).forEach(t => {
    let d, att = 0;
    do { d = generateItem(t); att++; } while (isOverlapping(d, items.value) && att < 50);
    items.value.push(d);
  });

  // шанс появления бонусной звезды на короткое время
  if (Math.random() < config.bonusChance) {
    const starItem = generateItem("star");
    items.value.push(starItem);
    // убираем звезду если игрок не успел на нее нажать
    setTimeout(() => { items.value = items.value.filter(i => i !== starItem); }, config.starDuration);
  }

  // запускаем таймер на проигрыш если игрок ничего не нажмет
  gameTimer = setTimeout(() => endGame("Время вышло!", false), gameSpeed.value + config.timeoutBuffer);
};

// обработчик клика по любому объекту на поле
const itemClicked = (item) => {
  // если кликнули по звезде даем очки и восстанавливаем жизнь
  if (item.type === "star") {
    score.value += 5;
    if (lives.value < 3) lives.value++;
    updateHighScore(score.value);
    items.value = items.value.filter(i => i !== item);
    return;
  }

  // если кликнули по обманке отнимаем жизнь
  if (item.type !== currentTargetType.value) {
    lives.value--;
    if (lives.value <= 0) return endGame("Жизни закончились!", false);
    spawnNewRound();
    return;
  }

  // правильный клик увеличиваем счет
  score.value++;
  updateHighScore(score.value);
  
  // проверка на победу.
  if (score.value >= config.winScore) return endGame("", true);
  
  // ускоряем игру с каждым правильным кликом
  if (gameSpeed.value > config.minSpeed) gameSpeed.value -= config.speedIncrement;
  spawnNewRound();
};

// генератор случайных координат для объектов
const generateItem = (type) => ({
  type, image: config.images[type],
  x: Math.random() * config.gameWidth,
  y: config.headerHeight + Math.random() * (config.gameHeight - config.headerHeight),
});

// проверка чтобы картинки не появлялись друг на друге
const isOverlapping = (n, e) => {
  return e.some(i => Math.sqrt(Math.pow(n.x - i.x, 2) + Math.pow(n.y - i.y, 2)) < config.minDistance);
};

// логика завершения игры и передачи параметров в роутер
const endGame = (reason = "", isWin = false) => {
  clearTimeout(gameTimer);
  router.push({ 
    query: { step: 'result', status: isWin ? 'won' : 'lost', score: score.value, reason } 
  });
};

// при загрузке компонента читаем рекорд и проверяем состояние роутера
onMounted(() => {
  highScore.value = parseInt(localStorage.getItem("flower_game_record") || "0");
  if (currentStep.value === "play") {
    initGameParams();
    spawnNewRound();
  }
});

// обязательно чистим таймер если игрок ушел со страницы
onUnmounted(() => {
  clearTimeout(gameTimer);
});
</script>

<template>
    <div style="color: red; background: yellow;">CatchGame загружен!</div>
  <div class="game-container">
    
    <!-- 1 экран меню -->
    <div v-if="currentStep === 'start'" class="game-overlay">
      <h1>Поймай их всех!</h1>
      
      <div class="record-wrapper">
        <p>Лучший результат: <strong>{{ highScore }}</strong></p>
        <button v-if="highScore > 0" @click="resetRecord" class="clear-btn" title="Очистить рекорд">
          🗑️
        </button>
      </div>
      <button @click="startGame">Начать игру</button>
    </div>

    <!-- 2 экран игры -->
    <div v-else-if="currentStep === 'play'">
      <div class="lives-panel">
        <span class="lives-label">Жизни:</span>
        <span class="lives-icons">{{ "❤️".repeat(lives) }}</span>
      </div>

      <!-- улучшенная подсказка: текст плюс картинка -->
      <div class="target-hint">
        <h2>Твоя цель:</h2>
        <img :src="config.images[currentTargetType]" class="hint-image" />
      </div>

      <h3 class="score-display">Счет: {{ score }}</h3>
      
      <!-- рендерим все объекты из массива items на поле -->
      <img
        v-for="(item, index) in items"
        :key="index"
        :src="item.image"
        :class="['dot', { 'star-mini': item.type === 'star' }]"
        :style="{ top: item.y + 'px', left: item.x + 'px' }"
        @click="itemClicked(item)"
      />
    </div>

    <!-- 3 экран результатов -->
    <div v-else-if="currentStep === 'result'" class="game-overlay">
      <h1>{{ resultStatus === 'won' ? 'Победа!' : 'Проигрыш!' }}</h1>
      <p v-if="resultStatus !== 'won'">{{ resultReason }}</p>
      <h2>Счет: {{ resultScore }}</h2>
      
      <div class="record-wrapper">
        <p class="record-text">Рекорд: {{ highScore }}</p>
        <!-- поменяли button на span для кнопки очистки чтобы избежать конфликта стилей команды -->
        <span v-if="highScore > 0" @click="resetRecord" class="clear-btn">🗑️</span>
      </div>
      
      <button @click="startGame">Играть снова</button>
      <button class="secondary" @click="stopAndGoToMenu">В меню</button>
    </div>

  </div>
</template>

<style scoped>
/* основной контейнер игры */
.game-container {
    font-family: "Arial Black", Gadget, sans-serif;
  width: 800px; height: 600px;
  border: 3px solid #9875dd; 
  border-radius: 15px;
  margin: 50px auto; 
  text-align: center;
  position: relative; 
  background-color: #ffffff;
  overflow: hidden;
}

/* стили для подсказки цели вверху экрана */
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

/* анимация прыжка для картинки-подсказки */
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

/* блок обертка для текста рекорда и корзины */
.record-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
  color: #000;
}

/* стили для кастомной кнопки очистки */
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

/* панель жизней в правом верхнем углу */
.lives-panel {
  position: absolute; top: 15px; right: 20px;
  background: #ffffff; padding: 10px 20px;
  border-radius: 50px; border: 2px solid #000000;
  box-shadow: 4px 4px 0px #9875dd;
  z-index: 1000; display: flex; align-items: center; pointer-events: none;
}

.lives-label { font-weight: 900; 
  margin-right: 10px; 
  font-size: 1.2rem; 
  text-transform: uppercase; 
  color:#000;
}
.lives-icons { 
  font-size: 1.4rem; 
}

/* затемнение экрана для меню и результатов */
.game-overlay {
  position: absolute; 
  inset: 0; 
  background: rgba(255, 255, 255, 0.9);
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  z-index: 100;
  color:#000;
}

h1 { 
  font-size: 3.5rem; 
  color: #000; 
  margin-bottom: 10px; 
}

/* стили для кликабельных объектов на поле */
.dot { 
  width: 60px; 
  height: 60px; 
  position: absolute; 
  cursor: pointer; 
  transition: transform 0.1s; 
}
.dot:hover { 
  transform: scale(1.2); 
}

/* специальная пульсирующая анимация для звезды */
.star-mini { 
  animation: pulse-simple 0.4s infinite alternate; 
  z-index: 50; 
}
@keyframes pulse-simple { from { transform: scale(0.9); } to { transform: scale(1.1); } }

/* стили для кнопок меню */
button {
  padding: 15px 35px; 
  font-size: 1.5rem; 
  background: #9875dd; color: #fff;
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