<script setup>
import { computed, reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
// Настройки игры
const FIELD_WIDTH = 500;
const FIELD_HEIGHT = 500;
const BALL_SIZE = 40;

const pos = reactive({ x: 50, y: 200 }); // Позиция мяча
const speed = reactive({ x: 4, y: 4 });  // Скорость (направление)
const score = ref(0);
// const message = ref('Бей по мячу!');

const ballStyle = computed(() => ({
    left: pos.x + 'px',
    top: pos.y + 'px'
}));

// Главный цикл анимации
function update() {

    if (gend.value) {
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
        if (pos.x > FIELD_WIDTH - BALL_SIZE - 10 && pos.y > 130 && pos.y < 250) {
            goal();
        }

        
    }
}

setInterval(update, 10)

function kick() {
    if (gend.value) {

        // Ускоряем мяч при ударе
        speed.x = Math.random() > 0.5 ? 5 : -5;
        speed.y = Math.random() * 10 - 5;
        // message.value = "Хороший удар!";
    }
}

function goal() {
    score.value++;
    // message.value = "ГООООЛ!!!";
    // Сбрасываем мяч в центр
    pos.x = 50;
    pos.y = 200;
    speed.x = 4;
    speed.y = 4;
}

//    console.log(timeend);

// const time = ref('Осталось :', timeend);
const timeLeft = ref(10); // время в секундах
const gend = ref(true);

function timer() {
    const timeend = setInterval(() => {
        if (timeLeft.value <= 0) {
            clearInterval(timeend);
            // message.value = 'ИГРА ОКОНЧЕНА !'
            gend.value = false
            pos.x = 50
            pos.y = 200
            speed.x = 0;
            speed.y = 0;

        } else {
            timeLeft.value--;
        }
    }, 1000)
}


function restart() {
    gend.value = true
    timeLeft.value = 10
    timer()
    update()
    speed.x = 4
    speed.y = 4
    score.value = 0;

}

onMounted(() => {
    update();
    timer();
});

const route = useRoute()
const styles = ref('#dd8c8c')
let index = 0

function rColor() {
    if (route.name == 'football') {
        let spisok = ref(['#00693f', '#008c54', '#2ed573', '#7bed9f'])
        styles.value = spisok.value[index]

    } else {
        styles.value = 'black'

    }

    // console.log(spisok.value[index]);
    if (index < 2) {
        index = index + 1

    } else {
        index = 0
    }

}

setInterval(rColor, 1000)



</script>

<template>
    <div class="fl_1">
        <div class="name_game">
            <h1>
                Футбольчик
            </h1>
        </div>
        <div class="fl_2">
            <div class="game-container">
                <div class="g_score">
                    <h2>Счет: {{ score }}</h2>
                    <p>{{ message }}</p>
                    <p>Осталось времени : {{ timeLeft }}</p>

                    <button @click="kick" class="kick-btn">УДАР!</button>
                </div>


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

            <div class="modal" v-if="!gend">
                <div class="v_modal">
                    <div class="black">
                        <h1>Игра окончена !</h1>
                        <div class="table">
                            <p class="modal_score">Итоговый счёт : {{ score }}</p>
                        </div>
                        <div class="modal_btn">
                            <button class="btn_modal" @click="restart()">Начать сначала</button>
                            <button class="btn_modal" @click="router.push({ name: 'Main_page' })">Выйти в главное
                                меню</button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>




</template>

<style scoped>
.name_game h1 {
    color: v-bind(styles);
    font-family: fantasy;
    letter-spacing: 2px;

}

.fl_1 {
    display: flex;
    flex-direction: column;
    margin-top: -300px;
}

.fl_2 {
    display: flex;
    flex-direction: row;
}

.name_game {
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-text-stroke: 0.5px black;


}

.g_score {
    display: flex;
    flex-direction: column;

}

p {
    margin-top: 5px;
    margin-bottom: 5px;
}

.modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #00000054;
    color: rgb(0, 0, 0);
    display: flex;
    justify-content: center;
    align-items: center;
}

.v_modal {
    color: white;
    background-color: #2ed573;
    background-image: url(../assets/img/pole.jpg);
    background-size: cover;
    width: 500px;
    height: 350px;
    display: flex;
    flex-direction: column;
    border: 0px solid white;
    border-radius: 10px;

}

.black {
    width: 100%;
    height: 100%;
    background: #000000a0;
    border-radius: 2%;
}

.modal_score {
    color: white;
    font-size: 30px;
}

.table {
    display: flex;
    align-items: start;
    padding-left: 50px;
}

.modal_btn {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 20px;
}

.btn_modal {
    color: white;
    background-color: #00693f;
}

.btn_modal:hover {
    background-color: #008c54;
    border: 1px solid white;
    transform: 2s;
}

.game-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    gap: 10%;
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
    min-width: 500px;
    min-height: 500px;
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
    top: 150px;
    /* По центру вертикали */
    display: flex;
    flex-wrap: wrap;
}

.setka {
    width: 4px;
    height: 4px;
    border: 2px solid rgba(95, 95, 95, 0.644);
}
</style>
