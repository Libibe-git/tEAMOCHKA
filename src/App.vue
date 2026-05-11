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
    <div id="black">

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
    </div>
    <footer>
        <div class="list_row">

            <div>
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
    background-color: rgb(27, 83, 1);
    border-top: 2px solid rgb(15, 150, 3);
    /* display: flex;
    flex-direction: column;
    flex-wrap: wrap; */
    align-items: center;
    min-height: 15%;
    min-width: 100vw;
    margin: 0;

}

.list_row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
}

.list_column {
    display: flex;
    flex-direction: row;
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
    color: aliceblue;
}

.logo img {

    max-width: 100px;
    max-height: 60px;
    border-radius: 100%;
}

.logo:hover {
    color: cornflowerblue;
}

h2 {
    font-size: 40px;
}

main {
    display: flex;
    flex-wrap: wrap;
    min-width: 100vw;
    align-items: center;
    justify-content: center;
    padding-bottom: 5%;
}
</style>
