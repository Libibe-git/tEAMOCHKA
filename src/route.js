import { createRouter, createWebHistory } from 'vue-router'
import page1 from './components/page1.vue'
import page2 from './components/page2.vue'
import page3 from './components/page3.vue'


const routes = [
    {path: '/', component: page1, name: 'page1'},
    {path: '/page2', component: page2, name: 'page2'},
    {path: '/page3', component: page3, name: 'page3'},
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

