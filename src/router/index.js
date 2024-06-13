import { createRouter,  createMemoryHistory } from 'vue-router';


import PaintallaSiet from '../components/PaintallaSiet.vue'

const routes = [
    { path: '/', component: PaintallaSiet },
    { path: '/Productos', component: PaintallaSiet },
    
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})



export default router;