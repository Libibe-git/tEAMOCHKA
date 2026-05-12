<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const styles = ref("#dd8c8c");
let index = 0;
let intervalId = null;

function rColor() {
  if (route.name === "Main_page") {
    let spisok = ["orange", "blue", "green", "grey"];
    styles.value = spisok[index];
    
    if (index < 3) {
      index = index + 1;
    } else {
      index = 0;
    }
  } else {
    styles.value = "black";
  }
}

onMounted(() => {
  intervalId = setInterval(rColor, 1000);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <div>
    <div class="welcome">
      <div>
        <h1>Добро пожаловать, приятной игры</h1>
      </div>

      <div class="text_contain">
        <p class="text">
          «Сделай паузу! Наш сайт — это место, где можно забыть о делах и просто
          насладиться игрой. Выбирай своё приключение на сегодня!»
        </p>
      </div>
    </div>

    <div class="flex">
      <router-link :to="{ name: 'tomofish' }" class="card-link">
        <div class="card">
          <div class="img_fish"></div>
          <div class="opisanie-t">Томогочи-fish</div>
        </div>
      </router-link>
      
      <router-link :to="{ name: 'pin_pong' }" class="card-link">
        <div class="card">
          <div class="img_ping"></div>
          <div class="opisanie-p">Пин-Понг</div>
        </div>
      </router-link>
      
      <router-link :to="{ name: 'football' }" class="card-link">
        <div class="card">
          <div class="img_football"></div>
          <div class="opisanie-f">Футик</div>
        </div>
      </router-link>
      
      <router-link :to="{ name: 'game' }" class="card-link">
        <div class="card">
          <div class="img_catch"></div>
          <div class="opisanie-c">Попробуй поймать</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-family: fantasy;
  min-width: 100vw;
}

.card-link {
  text-decoration: none;
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
  background: rgba(240, 248, 255, 0.781);
}

.card:hover {
  width: 520px;
  transition: 1.6s;
  box-shadow: 0 20px 20px rgb(104, 104, 104);
}

.img_fish {
  background-image: url(../assets/rich_fish.jpg);
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
  background-position: 50%;
}

.img_football {
  background-image: url(../assets/img/pole.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 250px;
  background-position: 100%;
}

.img_catch {
  background-image: url(../assets/img_catch.png);
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 250px;
  background-position: 100%;
}

.opisanie-t {
  padding-top: 10px;
  -webkit-text-stroke: 1px rgb(253, 238, 151);
  color: rgb(255, 123, 0);
  letter-spacing: 2px;
}

.opisanie-p {
  padding-top: 10px;
  -webkit-text-stroke: 1px rgb(114, 176, 247);
  color: rgb(0, 48, 138);
  letter-spacing: 2px;
}

.opisanie-f {
  padding-top: 10px;
  -webkit-text-stroke: 1px rgb(114, 176, 247);
  color: rgb(0, 48, 138);
  letter-spacing: 2px;
}

.opisanie-c {
  padding-top: 10px;
  -webkit-text-stroke: 1px rgb(90, 3, 81);
  color: rgb(202, 5, 205);
  letter-spacing: 2px;
}

.welcome {
  min-width: 100vw;
}

.welcome h1 {
  color: v-bind(styles);
  font-family: fantasy;
  letter-spacing: 2px;
  -webkit-text-stroke: 1px rgb(255, 255, 255);
}

.text {
  font-size: 36px;
  font-family: fantasy;
  letter-spacing: 1.5px;
  padding: 2rem;
  -webkit-text-stroke: 0.5px black;
}

.text_contain {
  margin-bottom: 40px;
}
</style>