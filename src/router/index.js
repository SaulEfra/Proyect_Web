import { createRouter, createMemoryHistory } from 'vue-router';

import InfoNeg from '@/components/InfoNeg.vue';
import AddProduct from '../components/AddProductForm.vue';
import DatosNegocios from '../components/DatosDeNegocio.vue';
import MovimientosApp from '../components/Movimientos.vue';
import EmpleadosApp from '../components/Empleados.vue';
import ProductInventory from '../components/Productos.vue';
import NuevaVenta from '@/components/NuevaVenta.vue';
import ClientesTreinta from '@/components/ClientesTreinta.vue';
import LoginAdm from '@/components/LoginAdmin.vue'; 

const routes = [
    { path: '/InfoNeg', component: InfoNeg },
    { path: '/', component: MovimientosApp },
    { path: '/AddProduct', component: AddProduct },
    { path: '/AgregarNegocio', component: DatosNegocios },
    { path: '/Movimientos', component: MovimientosApp },
    { path: '/Empleados', component: EmpleadosApp },
    { path: '/Productos', component: ProductInventory },
    { path: '/NuevaVenta', component: NuevaVenta },
    { path: '/ClientesTreinta', component: ClientesTreinta },
    { path: '/LoginAdm', component: LoginAdm },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})



export default router;