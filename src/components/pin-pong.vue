<script setup>
import { computed, reactive, ref } from 'vue';

// const goriz = reactive({
//   horiz: true

// })

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




function go() {
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


setInterval(go, 8)

</script>

<template>

    <div class="pole" tabindex="0" autofocus @keydown.arrow-up.prevent="moveLeftPlatformUp"
        @keydown.arrow-down.prevent="moveLeftPlatformDown" @keydown.w.prevent="moveRightPlatformUp"
        @keydown.s.prevent="moveRightPlatformDown">
        <div class="platforma" :style="{ top: Lplat }">
        </div>

        <div class="platforma2" :style="{ top: Rplat }">
        </div>
        <div class="crug" :style="{ left: vper, top: vni }">
        </div>

        <div class="score">
            <h4>{{ countR }}  : {{ countL }}</h4>


        </div>

    </div>

</template>

<style scoped>
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
    padding: 0 5px ;
    color: aliceblue;
    text-shadow: 0 5px 20px rgb(255, 255, 255);
    box-shadow: 0 5px 20px rgb(255, 255, 255);
    max-width: 60px;
    position: relative;
    left: 50%;
    border-radius: 20%;
}
</style>