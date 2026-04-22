<script setup>

</script>

<template>
    <div class="gg">
        <h1>GG</h1>
    </div>
    <div class="flex">
        <RouterLink :to="{ name: 'page1' }">Первая страница</RouterLink>
        <RouterLink :to="{ name: 'page2' }">Вторая страница</RouterLink>
        <RouterLink :to="{ name: 'page3' }">Третья страница</RouterLink>

    </div>

    <RouterView></RouterView>
</template>

<style scoped>
.flex{
    display: flex;
    justify-content: center;
    gap: 20px;
}

a{
    color: black;
    font-size: 20px;
}

a:hover{
    color:cornflowerblue;
}

</style>
