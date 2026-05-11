<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const fish_x = ref(400);
const fish_y = ref(200);
const random_x = ref(0)
const random_y = ref(0)

const pos_a = ref(0)
const random_a = ref(0)

const eat_bar = ref(100)
const eat_color = ref('#12ce12')
const eat_text = ref('')

const filter_bar = ref(0)
const filter_fon = ref(100)
const filter_color = ref('#12ce12')
const filter_text = ref('')

const flag = ref(false)
const fish_x_clone = ref(400);
const fish_y_clone = ref(500);

const end_time = ref(0)
const end_time_interval = ref()
const modal = ref(false)

onMounted(() => {
    end_time_interval.value = setInterval(() => { end_time.value++ }, 1000)

})


const styles = ref('#dd8c8c')
let index = 0

function rColor() {
    if (route.name == 'tomofish') {
        let spisok = ref(['orange', 'blue', 'green', 'grey'])
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



function end_timer() {
    clearInterval(end_time_interval.value)
    end_time_interval.value = ''
    modal.value = true
    // clearInterval(start_game)
}



function check() {
    if (filter_bar.value >= 30) {
        filter_color.value = 'yellow'
    }
    if (filter_bar.value >= 60) {
        filter_color.value = 'red'
        filter_text.value = 'Пока фильтр грязный рыбка плохо видит куда плыть!!!'

    }
    if (filter_bar.value < 30) {
        filter_color.value = '#12ce12'
    }

    if (eat_bar.value <= 60) {
        eat_color.value = 'yellow'
        eat_text.value = ''

    }
    if (eat_bar.value <= 30) {
        eat_color.value = 'red'
        eat_text.value = 'Срочно покормите рыбку!!!'
    }
    if (eat_bar.value >= 70) {
        eat_color.value = '#12ce12'
    }

    if (eat_bar.value == 0 && filter_bar.value == 100) {
        end_timer()
    }
}

function clone() {
    flag.value = !flag.value

    const timer = setTimeout(() => { flag.value = !flag.value }, 8000)
    // console.log(flag.value);

}

function eat() {
    if (eat_bar.value <= 90) {
        eat_bar.value += 10
    }
    check()
    // console.log(eat_bar.value);
}

function clear() {
    filter_bar.value = 0
    filter_fon.value = 100
    check()

}


function GoClickFishClone() {
    random_x.value = Math.random() * 200 - 150
    random_y.value = Math.random() * 200 - 150

    if ((fish_x_clone.value + random_x.value) <= 900 && (fish_x_clone.value + random_x.value) >= 0) {
        fish_x_clone.value += random_x.value

    } else {
        fish_x_clone.value = 100
    }

    if ((fish_y_clone.value + random_y.value) <= 1000 && (fish_y_clone.value + random_y.value) >= 0) {
        fish_y_clone.value += random_y.value
    } else {
        fish_y_clone.value = 100
    }

}

function GoClickFish() {
    random_x.value = Math.random() * 200 - 150
    random_y.value = Math.random() * 200 - 150
    random_a.value = Math.random() * 15 - 10

    if (eat_bar.value != 0) {
        eat_bar.value -= 10

        if (filter_bar.value == 100) {
            random_x.value = Math.random() * 20 - 15
            random_y.value = Math.random() * 20 - 15
        }

        if ((fish_x.value + random_x.value) <= 900 && (fish_x.value + random_x.value) >= 0) {
            fish_x.value += random_x.value

        } else {
            fish_x.value = 400
        }

        if ((pos_a.value + random_a.value) <= 100 && (pos_a.value + random_a.value) >= 0) {
            pos_a.value += random_a.value
        }

        if ((fish_y.value + random_y.value) <= 1000 && (fish_y.value + random_y.value) >= 0) {
            fish_y.value += random_y.value
        } else {
            fish_y.value = 600
        }
    }

    check()
}

function GoFish() {
    random_x.value = Math.random() * 200 - 150
    random_y.value = Math.random() * 200 - 150
    random_a.value = Math.random() * 15 - 10


    if (filter_bar.value != 100) {
        filter_bar.value += 10
        filter_fon.value -= 9
    } else {
        random_x.value = Math.random() * 20 - 15
        random_y.value = Math.random() * 20 - 15
    }

    if (eat_bar.value != 0) {
        eat_bar.value -= 10


        if ((fish_x.value + random_x.value) <= 900 && (fish_x.value + random_x.value) >= 0) {
            fish_x.value += random_x.value

        } else {
            fish_x.value = 400
        }

        if ((pos_a.value + random_a.value) <= 100 && (pos_a.value + random_a.value) >= 0) {
            pos_a.value += random_a.value
        }

        if ((fish_y.value + random_y.value) <= 1000 && (fish_y.value + random_y.value) >= 0) {
            fish_y.value += random_y.value
        } else {
            fish_y.value = 600
        }
    }

    check()
    // console.log(fish_y.value + random_y.value);
    // console.log(fish_x.value + random_x.value);
}

const start_game = setInterval(GoFish, 8000);

function restart() {
    filter_bar.value = 0
    eat_bar.value = 100
    check()
    modal.value = false
    filter_text.value = ''
    eat_text.value = ''
    fish_x.value = 400;
    fish_y.value = 200;
    clear()
}
// setInterval(() => { console.log(end_time.value) }, 1000);
</script>

<template>

    <main>
        <div>
            <h1>Томогочи-fish</h1>
        </div>
        <div class="game">
            <div class="stats">
                <div class="shadow">
                    <h2>Сытость:</h2>
                    <div class="progress-container">
                        <div class="progress-fill_1"></div>
                    </div>

                </div>
                <h2 class="danger_text">{{ eat_text }}</h2>
                <div class="shadow">
                    <h2>Загрязнение фильтра:</h2>
                    <div class="progress-container">
                        <div class="progress-fill_2"></div>
                    </div>
                </div>
                <h2 class="danger_text">{{ filter_text }}</h2>


            </div>


            <div class="acvar">
                <div class="fish" @click="GoClickFish()"> <img src="../assets/fish.jpg" alt=""></div>

                <div class="fish_clone" @click="GoClickFishClone()" v-if="flag"> <img src="../assets/fish.jpg" alt="">
                </div>


            </div>
            <div class="flex">
                <label for="">
                    <div class="btn" @click="eat()"><img src="../assets/eat.jpg" alt=""></div><strong>Покормить</strong>
                </label>
                <label for="">
                    <div class="btn" @click="clear()"><img src="../assets/filter.webp" alt=""></div><strong>Почистить
                        фильтр</strong>
                </label>
                <label for="" v-if="!flag">
                    <div class="btn" @click="clone()"><img src="../assets/i.webp" alt=""></div>
                    <strong>Клонирование</strong>
                </label>
                <h2 v-if="flag">Клон живёт 8 секунд и не тратит энергию!!</h2>
            </div>
        </div>

    </main>
    <div class="modal" v-if="modal">
        <div class="the_end">
            <h1 class="suc_text">Игра окончена рыбка прожила {{ end_time }} секунд</h1>
            <button @click="restart()">Начать занаво</button>
        </div>

    </div>
</template>

<style scoped>
main {
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 20px;
}

h1{
    color: v-bind(styles);
}

.game{
    display: flex;
    gap: 20px;
    align-items: center;
}

.acvar {
    min-width: 900px;
    min-height: 1000px;
    border: 1px solid black;
    border-radius: 10px;
    background-image: url(../assets/fon.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: v-bind(pos_a + '%');
    /* background-position: 0; */
    filter: brightness(v-bind(filter_fon + '%'));
    transition: 1.5s;

}

.fish {
    width: 150px;
    height: 140px;
    border: 2px solid black;
    position: relative;
    top: v-bind(fish_y + 'px');
    left: v-bind(fish_x + 'px');
    background: rgb(255, 255, 255);
    border-radius: 100%;
    overflow: hidden;
    transition: 1.6s;
    cursor: pointer;
}

.fish img {
    max-width: 160px;
    min-height: 150px;
    /* mix-blend-mode: multiply; */
}

.btn {
    width: 150px;
    height: 150px;
    border: 1px solid black;
    border-radius: 100%;
    overflow: hidden;
    box-shadow: 2px 2px 4px black;
    cursor: pointer;
}

.btn img {
    max-width: 150px;
    height: 150px;
    margin: 0;
}

.flex {
    margin-top: 20px;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    display: flex;
    gap: 40px;
}

.progress-container {
    width: 200px;
    height: 30px;
    background-color: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
}

.progress-fill_1 {
    width: v-bind(eat_bar + "%");
    height: 100%;
    /* background: linear-gradient(90deg, #4caf50, #8bc34a); */
    background: v-bind(eat_color);
    border-radius: 10px;
    transition: width 0.3s ease-in-out;
}

.progress-fill_2 {
    width: v-bind(filter_bar + "%");
    height: 100%;
    background: v-bind(filter_color);
    border-radius: 10px;
    transition: width 0.3s ease-in-out;
}

.shadow {
    border-radius: 10%;
    padding: 20px;
    box-shadow: 2px 2px 4px black;
    max-width: 200px;
}

.stats{
    max-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
}


.fish_clone {
    width: 150px;
    height: 140px;
    border: 2px solid black;
    position: relative;
    top: v-bind(fish_y_clone + 'px');
    left: v-bind(fish_x_clone + 'px');
    background: rgb(255, 255, 255);
    border-radius: 100%;
    background-size: cover;
    overflow: hidden;
    transition: 1.6s;
    cursor: pointer;
}

.fish_clone img {
    max-width: 160px;
    min-height: 150px;
    /* mix-blend-mode: multiply; */
}

.danger_text {
    color: red;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.726);

    display: flex;
    justify-content: center;
    align-items: center;
}

.the_end {
    max-width: 600px;
    height: 400px;
    color: rgb(0, 255, 106);
    background-color: rgba(216, 213, 213, 0.932);
    background-image: url(../assets/fon.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10%;
    box-shadow: 4px -14px 14px rgba(0, 0, 0, 0.637);

}


.the_end button {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    color: black;
    font-size: 20px;
    transition: 1s;
    box-shadow: 4px 14px 14px rgba(0, 0, 0, 0.637);
}

.the_end button:hover {
    background-color: aqua;
    transform: translate(10px, 10px);
}
</style>