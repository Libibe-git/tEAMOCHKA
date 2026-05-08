<script setup>
import { useRoute } from 'vue-router';

import { ref } from 'vue'

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
    <header>
        <RouterLink :to="{ name: 'Main_page' }">
            <div class="logo">
                <h2>Mini-Games</h2>
                <img src="./assets/logo.jpg" alt="">

            </div>
        </RouterLink>
    </header>
    <div v-if="route.name == 'Main_page'" class="welcome">
        <div>
            <h1>Добро пожаловать, приятной игры</h1>
        </div>

        <div class="text_contain">
            <p class="text">«Сделай паузу! Наш сайт — это место, где можно забыть о делах и просто насладиться
                игрой.
                Выбирай своё приключение на сегодня!»</p>
        </div>
    </div>

    <div class="flex" v-if="route.name == 'Main_page'">
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

    <RouterView></RouterView>
    


    <footer>
        <div class="list_row">
            <div class="lisr_column">
                <p>Контакты:</p>
                <ol>
                    <li>Elizaveta F group 9ISP-232</li>
                    <li>Pavel S group 9ISP-232</li>
                </ol>
            </div>

            <div>
                <p>Adress: Rustaveli Street 33</p>
            </div>


        </div>

    </footer>

</template>

<style scoped>
footer {
    /* width: 100%; */
    /* min-height: 100px; */
    background-color: rgb(206, 206, 206);
    /* position: fixed;
    left: 0;
    bottom: 0;
    width: 100%; */
    /* margin-top: 50px; */

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    /* position: absolute; */
    min-height: 10%;
    min-width: 100vw;
    margin: 0;
    /* bottom: -1000px; */
    /* left: 0; */
    /* right: 0; */
    /* margin-top: 20px; */
    /* color: white; */
}

.list_row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.list_column {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
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

header {
    font-family: fantasy;
    letter-spacing: 2px;
}

.flex {
    display: flex;
    justify-content: center;
    gap: 20px;
    font-family: fantasy;
    /* margin-bottom: 700px; */
    flex: 1 0 auto;
}

a {
    color: black;
    font-size: 20px;
}

a:hover {
    color: cornflowerblue;
}

.logo {
    max-width: 500px;
    display: flex;
    gap: 10px;
}

.logo img {

    max-width: 100px;
    max-height: 60px;
    border-radius: 100%;
}

.card {
    width: 280px;
    min-height: 300px;
    border: 1px solid grey;
    border-radius: 10%;
    padding: 0;
    overflow: hidden;
    box-shadow: 2px 2px 10px black;
}

.card:hover {
    width: 320px;
    /* transform: translate(-10px, -10px); */
    transition: 1.6s;
}

.img_fish {
    background-image: url(assets/fish.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 250px;
}

.img_ping {
    background-image: url(assets/luna.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 250px;
    background-position: 50%
}

.img_football {
    background-image: url(assets/img/pole.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 250px;
    background-position: 100%
}

.welcome h1 {
    color: v-bind(styles);
    font-family: fantasy;
    letter-spacing: 2px;
}

h2 {
    font-size: 40px;
}

.text {
    font-size: 26px;
    font-family: fantasy;
    letter-spacing: 0.5px;
}

.text_contain {
    margin-bottom: 40px;
}

main {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>
