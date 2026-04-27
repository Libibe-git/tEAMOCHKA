<script setup>
import { ref } from 'vue';

const fish_x = ref(400);
const fish_y = ref(200);




</script>

<template>
    <div>
        <h1>Тут будет рыбка</h1>
    </div>
    <div class="acvar">
        <div class="fish"> <img src="../assets/fish.png" alt=""></div>

    </div>
    <div class="flex">
        <label for=""><div class="btn"><img src="../assets/eat.jpg" alt=""></div><strong>Покормить</strong></label>
        <label for=""><div class="btn"><img src="../assets/filter.webp" alt=""></div><strong>Почистить фильтр</strong></label>
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