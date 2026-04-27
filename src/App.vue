<script setup>

</script>

<template>
    <header>
        <RouterLink :to="{ name: 'Main_page' }">
            <div class="logo">
                <h1>Mini-Games</h1>
                <img src="./assets/logo.jpg" alt="">

            </div>
        </RouterLink>


    </header>
    <div class="flex">
        <RouterLink :to="{ name: 'tomofish' }">
            <div class="card">
                <div class="img_fish">
                </div>
                <div class="opisanie">Томогочи-fish</div>
            </div>
        </RouterLink>
        <RouterLink :to="{ name: 'pin_pong' }">
            <div class="card">
                <div class="img_">
                </div>
                <div class="opisanie">Пин-Понг</div>
            </div>
        </RouterLink>
        <RouterLink :to="{name: 'football'}">
            <div class="card">
            <div class="img"></div>
            <div class="opisanie">Футик</div>

            </div>

        </RouterLink>
    </div>

    <RouterView></RouterView>
</template>

<style scoped>
.flex {
    display: flex;
    justify-content: center;
    gap: 20px;
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

.card{
    width: 180px;
    min-height: 180px;
    border: 1px solid grey;
    border-radius: 10%;
    padding: 0;
    overflow: hidden;
}

.img_fish{
    background-image: url(assets/fish.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100px;
}

</style>
