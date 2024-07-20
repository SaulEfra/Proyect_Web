<template>
<<<<<<< HEAD
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
=======
    
        <div class="row">
            <div class="col-lg-2 partlt shadow">
                <ParteLateral></ParteLateral>
            </div>
            <div class="Contenid col-lg-9">
                <RouterView></RouterView>
            </div>
        </div>
    
</template>
<script>
import ParteLateral from '../components/ParteLateral.vue';

export default {
>>>>>>> 026a7b3ca303f01ad591891f2d47a8cbbf252d25
    name: 'MainView',
    components: {
      ParteLateral
    }
<<<<<<< HEAD
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
  
=======
}

</script>
<style scoped>
.Cont {
    display: flex;
}

.Contenid {
    flex: 1;
    padding: 20px;
}
.partlt{
    border-right: 2px solid #f2f2f2;;
}
</style>
>>>>>>> 026a7b3ca303f01ad591891f2d47a8cbbf252d25
