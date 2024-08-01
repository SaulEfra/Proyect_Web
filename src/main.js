import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
 // Asegúrate de que tu archivo de store esté correctamente exportado

const app = createApp(App);

// Se pueden crear directivas aquí
app.directive('font-size', {
  beforeMount: (el) => {
    el.style.fontSize = '70px';
  },
});


app.use(router); // Usar el router para la navegación

app.mount('#app');
