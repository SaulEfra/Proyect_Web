import { createRouter, createWebHistory } from 'vue-router';

import AddProduct from '../components/AddProductForm.vue';
import ConfiguracionesApp from '../components/Configuraciones.vue';
import DatosNegocios from '../components/DatosDeNegocio.vue';
import MovimientosApp from '../components/Movimientos.vue';
import EmpleadosApp from '../components/Empleados.vue';
import ProductInventory from '../components/Productos.vue';
import NuevaVenta from '@/components/NuevaVenta.vue';
<<<<<<< HEAD
import InicioSesion from '@/components/InicioSesion.vue'; // Importa el componente de inicio de sesión
import ParteLateral from '@/components/ParteLateral.vue';
=======
import ClientesTreinta from '@/components/ClientesTreinta.vue';
>>>>>>> 026a7b3ca303f01ad591891f2d47a8cbbf252d25

const routes = [
    { path: '/', component: InicioSesion }, // Configura el componente de inicio de sesión como la ruta raíz
    { path: '/AddProduct', component: AddProduct },
<<<<<<< HEAD
    { path: '/Configuracion', component: ConfiguracionesApp },
    { path: '/AgregarNegocio', component: DatosNegocios },
    { path: '/Movimientos', component: MovimientosApp },
    { path: '/Empleados', component: EmpleadosApp },
    { path: '/Productos', component: ProductInventory },
    { path: '/NuevaVenta', component: NuevaVenta },
    {
        path: '/ParteLateral', component: ParteLateral
    }
=======
    { path: '/Configuracion', component: ConfiguracionesApp  },
    { path: '/AgregarNegocio', component: DatosNegocios},
    { path: '/Movimientos', component: MovimientosApp},
    { path: '/Empleados', component: EmpleadosApp},
    { path:'/Productos', component: ProductInventory},
    { path:'/NuevaVenta', component: NuevaVenta},
    { path: '/ClientesTreinta', component: ClientesTreinta },
>>>>>>> 026a7b3ca303f01ad591891f2d47a8cbbf252d25
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
