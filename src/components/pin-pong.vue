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
      countL.value +=1

    }
  }

  if (leftnum.value >= 710) {
    if (righttnum.value + 50 >= rplat.value && righttnum.value <= rplat.value + 100) {
      goriz.horiz = false;
    } else if (leftnum.value >= 750) {
      countR.value +=1
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
    lplat.value -= 10
  }
}
function moveRightPlatformUp() {
  if (rplat.value > 0) { 
    rplat.value -= 10
  }
}


function moveLeftPlatformDown(){
  if (lplat.value < 600) {
    lplat.value += 10
  }

}

function moveRightPlatformDown(){
  if (rplat.value < 600) {
    rplat.value += 10
  }
}


setInterval(go, 8)

</script>

<template>

  <div class="pole" tabindex="0" autofocus  @keydown.arrow-up.prevent="moveLeftPlatformUp"
    @keydown.arrow-down.prevent="moveLeftPlatformDown"
    @keydown.w.prevent="moveRightPlatformUp"
    @keydown.s.prevent="moveRightPlatformDown">
    <div class="platforma" :style="{ top: Lplat }" >
    </div>

    <div class="platforma2" :style="{ top: Rplat }" >
    </div>
    <div class="crug" :style="{ left: vper, top: vni }">
    </div>

    <div>
      {{ countR }}
      :
      {{ countL }}
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

}

.crug {
  width: 50px;
  height: 50px;
  border: 1px solid black;
  border-radius: 100%;
  position: absolute;
}

.platforma {
  width: 30px;
  height: 100px;
  border: 1px solid black;
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

  border-radius: 6px;
}
</style>