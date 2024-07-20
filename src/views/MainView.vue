<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-2">
          <ParteLateral></ParteLateral>
        </div>
        <div class="col-lg-10">
          
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ParteLateral from '../components/ParteLateral.vue';
  
  
  export default {
    name: 'MainView',
    components: {
      ParteLateral
    }
  }
  </script>
  
  <style scoped>
  .container-fluid {
    padding: 0;
  }
  .row {
    margin: 0;
  }
  .col-lg-2 {
    padding: 0;
    background-color: #f8f9fa; /* Fondo gris claro para la parte lateral */
    min-height: 100vh; /* Altura completa de la ventana */
  }
  .col-lg-10 {
    padding: 20px;
  }
  </style>
  
