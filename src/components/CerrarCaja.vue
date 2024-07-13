<template>
    <div>
      
      <p v-if="datosCajaAbierta">ID Caja: {{ datosCajaAbierta.IDAbrirCaja }}</p>
      <p v-if="datosCajaAbierta">Fecha y Hora: {{ datosCajaAbierta.Fecha }}</p>
      <p v-if="datosCajaAbierta">Monto Inicial: $ {{ datosCajaAbierta.MontoInicial }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CerrarCaja',
    props: {
      datosCajaAbierta: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
 
  
  <style scoped>
  .form-group {
    margin-bottom: 15px;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    text-align: end;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
  </style>
  