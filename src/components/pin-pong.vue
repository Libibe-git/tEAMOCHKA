<script setup>
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const styles = ref('#dd8c8c')
let index = 0

function rColor() {
    if (route.name == 'pin_pong') {
        let spisok = ref(['rgb(52, 0, 86)', 'rgb(69, 0, 114)', 'rgb(25, 0, 72)', 'rgb(34, 0, 96)'])
        styles.value = spisok.value[index]
    } else {
        styles.value = 'black'
    }
    if (index < 2) {
        index = index + 1

    } else {
        index = 0
    }

}

setInterval(rColor, 1000)


const goriz = reactive({
    ni: false,
    horiz: true
})

const leftnum = ref(300)
const righttnum = ref(100)
const lplat = ref(0)
const rplat = ref(0)
const countR = ref(0)
const countL = ref(0)

const vper = computed(() => leftnum.value + 'px')
const vni = computed(() => righttnum.value + 'px')
const Lplat = computed(() => lplat.value + 'px')
const Rplat = computed(() => rplat.value + 'px')

const flag = ref(true);



function go() {
    if (flag.value) {
        if (goriz.horiz) {
            leftnum.value++
        } else {
            leftnum.value--
        }

        if (leftnum.value >= 750) {
            goriz.horiz = !goriz.horiz
            // console.log(vni.value);
            // console.log(leftnum.value);
        } else if (leftnum.value <= 0) {
            goriz.horiz = !goriz.horiz
            // console.log(vni.value);
            // console.log(leftnum.value);
        }
        // console.log(Lplat.value);

        // console.log(vni.value);

        if (leftnum.value <= 40) {
            if (righttnum.value + 50 >= lplat.value && righttnum.value <= lplat.value + 100) {
                goriz.horiz = true;
            } else if (leftnum.value <= 0) {
                countL.value += 1

            }
        }

        if (leftnum.value >= 710) {
            if (righttnum.value + 50 >= rplat.value && righttnum.value <= rplat.value + 100) {
                goriz.horiz = false;
            } else if (leftnum.value >= 750) {
                countR.value += 1
            }
        }

        if (goriz.ni) {
            righttnum.value++
        } else {
            righttnum.value--
        }

        if (righttnum.value >= 650) {
            goriz.ni = !goriz.ni
        } else if (righttnum.value <= 0) {
            goriz.ni = !goriz.ni
        }
    }

    if (countL.value >= 5 || countR.value >= 5) {
        flag.value = false
        leftnum.value = 300
        righttnum.value = 100
    }

    // console.log(flag.value);

}



function moveLeftPlatformUp() {
    if (lplat.value > 0) {
        lplat.value -= 18
    }
}
function moveRightPlatformUp() {
    if (rplat.value > 0) {
        rplat.value -= 18
    }
}


function moveLeftPlatformDown() {
    if (lplat.value < 600) {
        lplat.value += 18
    }

}

function moveRightPlatformDown() {
    if (rplat.value < 600) {
        rplat.value += 18
    }
}

function restart() {
    flag.value = true
    countL.value = 0
    countR.value = 0
    go()
}


setInterval(go, 6)

</script>

<template>
    <main class="flex_col" v-if="flag">
        <h1>Ping-Pong Ultra</h1>
        <div class="pole" tabindex="0" autofocus @keydown.arrow-up.prevent="moveLeftPlatformUp"
            @keydown.arrow-down.prevent="moveLeftPlatformDown" @keydown.w.prevent="moveRightPlatformUp"
            @keydown.s.prevent="moveRightPlatformDown" @keydown.ц.prevent="moveRightPlatformUp"
            @keydown.ы.prevent="moveRightPlatformDown">
            <div class="platforma" :style="{ top: Lplat }">
            </div>

            <div class="platforma2" :style="{ top: Rplat }">
            </div>
            <div class="crug" :style="{ left: vper, top: vni }">
            </div>

            <div class="score">
                <h4>{{ countR }} : {{ countL }}</h4>


            </div>

        </div>
    </main>

    <div class="modal" v-if="!flag">
        <div class="v_model">
            <div class="black">
            <h1>Конец Игры !</h1>
            <p>Итоговый счёт {{ countL }} : {{ countR }}</p>
            <div class="model_btn">
                <button class="btn1" @click="restart">Играть</button>
                <button class="btn1" @click="router.push({ name: 'Main_page' })">На главную</button>
                </div>
            </div>
        </div>

    </div>


</template>

<style scoped>
.black {
    width: 100%;
    height: 100%;
    background: #000000a0;
    border-radius: 2%;
}

.modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(30, 30, 30, 0.448);
    display: flex;
    justify-content: center;
    align-items: center;
}


.v_model {
    background-color: rgb(0, 0, 59);
    color: white;
    width: 500px;
    height: 300px;
    display: flex;
    flex-direction: column;
    border: 0px solid white;
    border-radius: 10px;
    background-image: url(../assets/fon_ping.avif);
}

.model_btn {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    color: rgb(0, 0, 55);
}

.btn1 {
    max-height: 42px;
    transition: 1s;
    background-color: aliceblue;    
}

.btn1:hover {
    background-color: rgb(56, 56, 124);
    color: white;
    width: 120px;
    max-height: 55px;
    height: 80px;
    border: 1px solid white;
}

.btn2:hover {
    background-color: rgb(56, 56, 124);
    color: white;
    padding: 15px;
    transition: 1s;
    border: 1px solid white;
}

.flex_col {
    display: flex;
    flex-direction: column;
    margin-top: -100px;
}

h1 {
    color: v-bind(styles);
    font-family: fantasy;
    letter-spacing: 2px;

}

p {
    font-size: 30px;
    margin-top: -1px;
    margin-bottom: 50px;
}

.v_model h1 {
    color: v-bind(styles);
    font-family: fantasy;
    letter-spacing: 2px;
    -webkit-text-stroke: 0.5px white;
}

.pole {
    width: 800px;
    height: 700px;
    border: 1px solid black;
    margin-top: 50px;
    position: relative;
    background-image: url(../assets/fon_ping.jpg);
    background-repeat: no-repeat;
    background-size: 100% 150%;
    overflow: hidden;
    border-radius: 1%;
    box-shadow: 4px 10px 18px black;




    color: rgb(34, 0, 96);
}

.crug {
    width: 50px;
    height: 50px;
    /* border: 1px solid rgba(0, 0, 0, 0.473); */
    border-radius: 100%;
    position: absolute;
    /* background-color: rgb(255, 255, 255); */
    background-image: url(../assets/luna.jpg);
    background-size: 200% 110%;
    background-position: 50%;
    box-shadow: 0 5px 20px rgb(255, 255, 255);

}

.platforma {
    width: 30px;
    height: 100px;
    border: 1px solid black;
    box-shadow: 4px 0 4px 4px greenyellow;
    position: absolute;
    left: 10px;
    border-radius: 6px;
}

.platforma2 {
    width: 30px;
    height: 100px;
    border: 1px solid black;
    position: absolute;
    right: 10px;
    box-shadow: -4px 0 4px 4px greenyellow;
    border-radius: 6px;
}

.score {
    font-size: 30px;
    padding: 0 5px;
    color: aliceblue;
    text-shadow: 0 5px 20px rgb(255, 255, 255);
    box-shadow: 0 5px 20px rgb(255, 255, 255);
    max-width: 100px;
    position: relative;
    left: 45%;
    border-radius: 20%;
}

main {
    display: flex;
    justify-content: center;
}
</style>