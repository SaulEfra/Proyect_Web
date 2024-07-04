import { createRouter,  createMemoryHistory } from 'vue-router';


import PaintallaSiet from '../components/PaintallaSiet.vue';
import InfoNeg from '@/components/InfoNeg.vue';
import DatosNegocios from '../components/DatosDeNegocio.vue';
import MovimientosApp from '../components/Movimientos.vue';
import EmpleadosApp from '../components/Empleados.vue';

const routes = [
    { path: '/', component: PaintallaSiet },
    { path: '/Productos', component: PaintallaSiet },
    { path: '/InfoNeg', component: InfoNeg},
    { path: '/AgregarNegocio', component: DatosNegocios},
    { path: '/Movimientos', component: MovimientosApp},
    { path: '/Empleados', component: EmpleadosApp},
    
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})



export default router;