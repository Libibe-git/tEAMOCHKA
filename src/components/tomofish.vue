<script setup>
import { ref } from 'vue';

const fish_x = ref(400);
const fish_y = ref(200);
const random_x = ref(0)
const random_y = ref(0)

const pos_a = ref(0)
const random_a = ref(0)

const eat_bar = ref(100)
const eat_color = ref('#12ce12')


const filter_bar = ref(0)
const filter_fon = ref(100)
const filter_color = ref('#12ce12')

function check() {
    if (filter_bar.value >= 30) {
        filter_color.value = 'yellow'
    }
    if (filter_bar.value >= 60) {
        filter_color.value = 'red'
    }
    if (filter_bar.value < 30) {
        filter_color.value = '#12ce12'
    }

    if (eat_bar.value <= 60) {
        eat_color.value = 'yellow'
    }
    if (eat_bar.value <= 30) {
        eat_color.value = 'red'
    }
    if (eat_bar.value >= 70) {
        eat_color.value = '#12ce12'
    }
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

function GoClickFish() {
    random_x.value = Math.random() * 200 - 150
    random_y.value = Math.random() * 200 - 150

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

setInterval(GoFish, 8000);

</script>

<template>
    <div>
        <h1>Томогочи-fish</h1>
    </div>
    <main>
        <div class="stats">
            <div class="shadow">
                <h2>Сытость:</h2>
                <div class="progress-container">
                    <div class="progress-fill_1"></div>
                </div>
            </div>

            <div class="shadow">
                <h2>Загрязнение фильтра:</h2>
                <div class="progress-container">
                    <div class="progress-fill_2"></div>
                </div>
            </div>


        </div>


        <div class="acvar">
            <div class="fish" @click="GoClickFish()"> <img src="../assets/fish.jpg" alt=""></div>

        </div>
        <div class="flex">
            <label for="">
                <div class="btn" @click="eat()"><img src="../assets/eat.jpg" alt=""></div><strong>Покормить</strong>
            </label>
            <label for="">
                <div class="btn" @click="clear()"><img src="../assets/filter.webp" alt=""></div><strong>Почистить
                    фильтр</strong>
            </label>
        </div>
    </main>

</template>

<style scoped>
main {
    display: flex;
    gap: 20px;
}

.acvar {
    min-width: 900px;
    min-height: 1000px;
    border: 1px solid black;
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
    mix-blend-mode: multiply;
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
}
</style>