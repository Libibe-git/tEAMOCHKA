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
    <main>
        <RouterView></RouterView>

    </main>

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
    margin-top: 10%;

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



header {
    font-family: fantasy;
    letter-spacing: 2px;
    margin: 2%;
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

h2 {
    font-size: 40px;
}
</style>
