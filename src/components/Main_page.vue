<script setup>
import { ref } from 'vue'

const styles = ref('#dd8c8c')
let index = 0

function rColor() {
    let spisok = ref(['purple', 'blue', 'green', 'grey'])

    styles.value = spisok.value[index]
    // console.log(spisok.value[index]);
    if (index < 2) {
        index = index + 1

    } else {
        index = 0
    }
    
}

setInterval(rColor, 1000)

</script>
<template>
    <div>
        <h1>Добро пожаловать, приятной игры</h1>
    </div>
</template>

<style scoped>
h1 {
    color: v-bind(styles);
}
</style>