<script setup>

import { ref } from 'vue'
import { useRoute } from 'vue-router'

const styles = ref('#dd8c8c')
let index = 0

function rColor() {
    if (route.name == 'Main_page') {
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


const route = useRoute()
</script>
<template>
    
    <div class="welcome">
        <div>
            <h1>Добро пожаловать, приятной игры</h1>
        </div>

        <div class="text_contain">
            <p class="text">«Сделай паузу! Наш сайт — это место, где можно забыть о делах и просто насладиться
                игрой.
                Выбирай своё приключение на сегодня!»</p>
        </div>
    </div>

    <div class="flex">
        <RouterLink :to="{ name: 'tomofish' }">
            <div class="card">
                <div class="img_fish">
                </div>
                <div class="opisanie-t">Томогочи-fish</div>
            </div>
        </RouterLink>
        <RouterLink :to="{ name: 'pin_pong' }">
            <div class="card">
                <div class="img_ping">
                </div>
                <div class="opisanie-p">Пин-Понг</div>
            </div>
        </RouterLink>
        <RouterLink :to="{ name: 'football' }">
            <div class="card">
                <div class="img_football"></div>
                <div class="opisanie-f">Футик</div>
            </div>

        </RouterLink>
    </div>
</template>

<style scoped>
.flex {
    display: flex;
    justify-content: center;
    gap: 20px;
    font-family: fantasy;
    min-width: 100vw;
    /* margin-bottom: 700px; */
    /* flex: 1 0 auto; */
}

.card {
    width: 385px;
    min-height: 350px;
    border: 1px solid grey;
    border-radius: 10%;
    padding: 0;
    overflow: hidden;
    box-shadow: 2px 2px 10px black;
    font-size: 28px;
}

.card:hover {
    width: 520px;
    /* transform: translate(-10px, -10px); */
    transition: 1.6s;
    box-shadow: 0 20px 20px rgb(104, 104, 104);
}

.img_fish {
    background-image: url(../assets/fish.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 250px;
}

.img_ping {
    background-image: url(../assets/luna.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 250px;
    background-position: 50%
}

.img_football {
    background-image: url(../assets/img/pole.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 250px;
    background-position: 100%
}

.opisanie-t {
    padding-top: 10px;
    -webkit-text-stroke: 0.5px black;
    color: rgb(255, 123, 0);
    letter-spacing: 2px;
}

.opisanie-p {
    padding-top: 10px;
    -webkit-text-stroke: 0.5px black;
    color: rgb(0, 48, 138);
    letter-spacing: 2px;
}

.opisanie-f {
    padding-top: 10px;
    -webkit-text-stroke: 0.5px black;
    color: rgb(55, 69, 0);
    letter-spacing: 2px;
}

.welcome {
    min-width: 100vw;
}

.welcome h1 {
    color: v-bind(styles);
    font-family: fantasy;
    letter-spacing: 2px;
}

.text {
    font-size: 26px;
    font-family: fantasy;
    letter-spacing: 0.5px;
}

.text_contain {
    margin-bottom: 40px;
}

</style>