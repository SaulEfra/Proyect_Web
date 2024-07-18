import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'



/* createApp(App).mount('#app') */

const app = createApp(App)

/* se pueden crear las directivas aqui */

app.directive('font-size',{
    beforeMount : (el) => {
        el.style.fontSize = "70px"
    }
})

app.use(router)
app.mount('#app')