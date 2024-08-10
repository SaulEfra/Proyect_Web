 <!--
 <template>
  <div class="">
    <MainView></MainView>
  </div>
  
</template>

<script>
import MainView from './views/MainView'
export default {
  name: 'App',
  components: {
    MainView
  }
}
</script>

<style>

</style>
-->
<template>
  <div id="App">
    <router-view></router-view>
  </div>
</template>

<script>



export default {
  name: 'App',
  data() {
    return {
      cajaAbierta: false,
      datosCaja: null,
    };
  },
  created() {
    this.verificarEstadoCaja();
  },
  methods: {
    verificarEstadoCaja() {
      const datosCaja = JSON.parse(localStorage.getItem('cajaAbierta'));
      if (datosCaja && datosCaja.Estado === 'abierta') {
        this.cajaAbierta = true;
        this.datosCaja = datosCaja;
      } else {
        this.cajaAbierta = false;
        this.datosCaja = null;
      }
    },
  },
};
</script>