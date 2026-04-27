<script setup>
import { computed, reactive, ref, onMounted } from 'vue';

// Настройки игры
const FIELD_WIDTH = 500;
const FIELD_HEIGHT = 500;
const BALL_SIZE = 40;

const pos = reactive({ x: 50, y: 200 }); // Позиция мяча
const speed = reactive({ x: 2, y: 2 });  // Скорость (направление)
const score = ref(0);
const message = ref('Бей по мячу!');

const ballStyle = computed(() => ({
    left: pos.x + 'px',
    top: pos.y + 'px'
}));

// Главный цикл анимации
function update() {
    pos.x += speed.x;
    pos.y += speed.y;

    // Отскок от левой и правой стенки
    if (pos.x <= 0 || pos.x >= FIELD_WIDTH - BALL_SIZE) {
        speed.x *= -1;
    }

    // Отскок от верхней и нижней стенки
    if (pos.y <= 0 || pos.y >= FIELD_HEIGHT - BALL_SIZE) {
        speed.y *= -1;
    }

    // Проверка на гол (если мяч в районе ворот у правой стены)
    // Ворота находятся справа (x > 450) и посередине по вертикали
    if (pos.x > FIELD_WIDTH - BALL_SIZE - 10 && pos.y > 150 && pos.y < 250) {
        goal();
    }

    requestAnimationFrame(update);
}

function kick() {
    // Ускоряем мяч при ударе
    speed.x = Math.random() > 0.5 ? 5 : -5;
    speed.y = Math.random() * 10 - 5;
    message.value = "Хороший удар!";
}

function goal() {
    score.value++;
    message.value = "ГООООЛ!!!";
    // Сбрасываем мяч в центр
    pos.x = 50;
    pos.y = 200;
    speed.x = 2;
    speed.y = 2;
}

onMounted(() => {
    update();
});
</script>

<template>
    <div class="game-container">
        <h2>Счет: {{ score }}</h2>
        <p>{{ message }}</p>
        
        <button @click="kick" class="kick-btn">УДАР!</button>

        <div class="pole">
            <!-- Мяч -->
            <div class="crug" :style="ballStyle"></div>

            <!-- Ворота -->
            <div class="vorota">
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
                <div class="setka"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: sans-serif;
}

.kick-btn {
    padding: 10px 20px;
    font-size: 18px;
    background: #ff4757;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 10px;
}

.kick-btn:active {
    transform: scale(0.95);
}

.pole {
    width: 500px;
    height: 500px;
    border: 5px solid #2ed573;
    background-color: #7bed9f;
    position: relative;
    overflow: hidden;
    background-image: url(../assets/img/pole.png);
    background-size: cover;
    background-position: 90% 80%;
}

.crug {
    width: 40px;
    height: 40px;
    background-color: white;
    border: 2px solid #2f3542;
    border-radius: 50%;
    position: absolute;
    transition: background 0.2s;
    background-image: url(../assets/img/ball.jpeg);
    background-size: 150% 150%;
    background-position: 50%;
}

.vorota {
    width: 25px;
    height: 100px;
    background: rgba(255, 255, 255, 0.5);
    border: 3px solid white;
    border-right: none;
    position: absolute;
    right: 0;
    top: 150px; /* По центру вертикали */
    display: flex;
    flex-wrap: wrap;
}

.setka{
    width: 4px;
    height: 4px;
    border: 2px solid rgba(95, 95, 95, 0.644);
}
</style>
