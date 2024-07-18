<template>
    <div>
      
      <p v-if="datosCajaAbierta" id="IDAbrirCaja"
      >ID Caja: {{ datosCajaAbierta.IDAbrirCaja }}</p>
      <p v-if="datosCajaAbierta" id="Fecha">Fecha y Hora: {{ datosCajaAbierta.Fecha }}</p>
      <p v-if="datosCajaAbierta" id="MontoInicial">Monto Inicial: {{ datosCajaAbierta.MontoInicial }}</p>
      <p >Ventas totales: {{  }}</p>
      <p>Gastos totales:{{  }}</p>

      <p>Balance Total:{{  }}</p>

      <form @submit.prevent="MontoFinalCaja">
      <div class="form-group">
        <label for="montoFinal">Total de dinero en efectivo:</label>
        <input
          type="number"
          id="montoFinal"
          v-model="montoFinal"
          class="form-control"
          placeholder="Ingrese el monto Final"
          required
        />
      </div>
    
      <button type="submit" class="btn btn-primary mt-3">Cerrar Caja</button>
    </form>

    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    name: 'CerrarCaja',
    props: {
      datosCajaAbierta: {
        type: Object,
        required: true
      }
    },
    data(){
      return{
        montoFinal:'',
        fechaHoraCierre:'',
        

      };
    },
    mounted() {
    this.fechaHoraCierre = new Date().toISOString().slice(0, 16);
  },
  methods: {
    async MontoFinalCaja() {
      const formData = {
        montoFinal: this.montoFinal,
        fechaHoraCierre: this.fechaHoraCierre,
      };
      try {
        const response = await axios.post('http://localhost:3000/cierrecaja', formData);
        console.log('Respuesta del servidor:', response.data); 
        alert('Se cerró caja correctamente');

        this.limpiarDatos(); // Limpiar datos

      } catch (error) {
        console.error('Error al cerrar caja:', error);
        alert('Error al cerrar caja: ' + error.message);
      }
    },
    limpiarDatos() {
      this.montoFinal = '';
    },
  },
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
  