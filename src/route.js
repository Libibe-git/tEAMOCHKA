import { createRouter, createWebHistory } from 'vue-router'
import page1 from './components/page1.vue'
import tomofish from './components/tomofish.vue'
import page3 from './components/page3.vue'


const routes = [
    {path: '/', component: page1, name: 'page1'},
    {path: '/tomofish', component: tomofish, name: 'tomofish'},
    {path: '/page3', component: page3, name: 'page3'},
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

