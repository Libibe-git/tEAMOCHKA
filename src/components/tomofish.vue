<script setup>
import { ref } from 'vue';

const fish_x = ref(400);
const fish_y = ref(200);
const random_x = ref(0)
const random_y = ref(0)

function GoFish() {
    random_x.value = Math.random() * 200 - 150
    random_y.value = Math.random() * 200 - 150

    if ((fish_x.value + random_x.value) <= 900 && (fish_x.value + random_x.value) >= 0) {
        fish_x.value += random_x.value
    }else{
        fish_x.value = 400
    }

    if ((fish_y.value + random_y.value) <= 1000 && (fish_y.value + random_y.value) >= 0) {
        fish_y.value += random_y.value
    }else{
        fish_y.value = 600
    }

    console.log(fish_y.value + random_y.value);
    console.log(fish_x.value + random_x.value);
    
}

setInterval(GoFish, 2000);

</script>

<template>
    <div>
        <h1>Томогочи-fish</h1>
    </div>
    <div class="acvar">
        <div class="fish"> <img src="../assets/fish.png" alt=""></div>

    </div>
    <div class="flex">
        <label for="">
            <div class="btn"><img src="../assets/eat.jpg" alt=""></div><strong>Покормить</strong>
        </label>
        <label for="">
            <div class="btn"><img src="../assets/filter.webp" alt=""></div><strong>Почистить фильтр</strong>
        </label>
    </div>
</template>

<style scoped>
.acvar {
    min-width: 900px;
    min-height: 1000px;
    border: 1px solid black;
    /* background-image: url(../assets/fon.png); */
    background-color: aqua;
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
}

.fish img {
    max-width: 150px;
    mix-blend-mode: multiply;
}

.btn {
    width: 150px;
    height: 150px;
    border: 1px solid black;
    border-radius: 100%;
    overflow: hidden;
}

.btn img {
    max-width: 150px;
    height: 150px;
    margin: 0;
}

.flex {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 40px;
}
</style>