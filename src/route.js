import { createRouter, createWebHistory } from 'vue-router'
import Main_page from './components/Main_page.vue'
import tomofish from './components/tomofish.vue'
import pin_pong from './components/pin-pong.vue'
import football from './components/football.vue'
import CatchGame from './components/CatchGame.vue'


const routes = [
    {path: '/', component: Main_page, name: 'Main_page'},
    {path: '/tomofish', component: tomofish, name: 'tomofish'},
    {path: '/pin_pong', component: pin_pong, name: 'pin_pong'},
    {path: '/football', component: football, name: 'football'},
    {path: '/game', component: CatchGame, name: 'game'}

]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

