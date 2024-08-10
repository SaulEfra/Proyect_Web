/*
import { createRouter,  createMemoryHistory } from 'vue-router';


import AddProduct from '../components/AddProductForm.vue';
import DatosNegocios from '../components/DatosDeNegocio.vue';
import MovimientosApp from '../components/Movimientos.vue';
import EmpleadosApp from '../components/Empleados.vue';
import ProductInventory from '../components/Productos.vue';
import NuevaVenta from '@/components/NuevaVenta.vue';
import ClientesTreinta from '@/components/ClientesTreinta.vue';
import InfoNeg from '@/components/InfoNeg.vue';

const routes = [
    { path: '/', component: MovimientosApp },
    { path: '/AddProduct', component: AddProduct },
    { path: '/InfoNeg', component: InfoNeg  },
    { path: '/AgregarNegocio', component: DatosNegocios},
    { path: '/Movimientos', component: MovimientosApp},
    { path: '/Empleados', component: EmpleadosApp},
    { path:'/Productos', component: ProductInventory},
    { path:'/NuevaVenta', component: NuevaVenta},
    { path: '/ClientesTreinta', component: ClientesTreinta },
    { path: '/ProvedoreProd', component: ProvedoreProd   }
    
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})



export default router;*/
import { createRouter, createWebHistory } from 'vue-router';
import MovimientosApp from '../components/Movimientos.vue';
import AddProduct from '../components/AddProductForm.vue';
import ConfiguracionesApp from '../components/Configuraciones.vue';
import DatosNegocios from '../components/DatosDeNegocio.vue';
import EmpleadosApp from '../components/Empleados.vue';
import ProductInventory from '../components/Productos.vue';
import NuevaVenta from '@/components/NuevaVenta.vue';
import InicioSesion from '@/components/InicioSesion.vue';
import ParteLateral from '@/components/ParteLateral.vue';
import ClientesTreinta from '@/components/ClientesTreinta.vue';
import ProvedoreProd from '@/components/ProvedoreProd.vue';

const routes = [
  { path: '/', component: InicioSesion },
  {
    path: '/Movimientos',
    component: MovimientosApp,
    props: route => ({ cajaAbierta: route.query.cajaAbierta === 'true' }),
  },
  { path: '/AddProduct', component: AddProduct },
  { path: '/Configuracion', component: ConfiguracionesApp },
  { path: '/AgregarNegocio', component: DatosNegocios },
  { path: '/Empleados', component: EmpleadosApp },
  { path: '/Productos', component: ProductInventory },
  { path: '/NuevaVenta', component: NuevaVenta },
  { path: '/ClientesTreinta', component: ClientesTreinta },
  { path: '/ParteLateral', component: ParteLateral },
  { path: '/ProvedoreProd', component: ProvedoreProd },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;