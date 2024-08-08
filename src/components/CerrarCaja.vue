<template>
  <div>
    <p v-if="datosCajaAbierta">ID Caja: {{ datosCajaAbierta.IDAbrirCaja }}</p>
    <p v-if="datosCajaAbierta">Fecha y Hora: {{ datosCajaAbierta.Fecha }}</p>
    <p v-if="datosCajaAbierta">Monto Inicial: {{ datosCajaAbierta.MontoInicial }}</p>
    <p v-if="datosCajaAbierta">Ventas totales: {{ datosCajaAbierta.totalVentas }}</p>
    <p v-if="datosCajaAbierta">Gastos totales: {{ datosCajaAbierta.totalGastos }}</p>
    <p v-if="datosCajaAbierta">Balance Total: {{ balanceTotal }}</p>

    <form @submit.prevent="MontoFinalCaja">
      <div class="form-group">
        <label for="montoFinal">Total de dinero en efectivo:</label>
        <input
          type="number"
          id="montoFinal"
          v-model="montoFinal"
          class="form-control"
          placeholder="Ingrese el monto final"
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
  data() {
    return {
      datosCajaAbierta: null,
      montoFinal: '',
      fechaHoraCierre: '',
    };
  },
  computed: {
    balanceTotal() {
      if (this.datosCajaAbierta) {
        return (
          this.datosCajaAbierta.totalVentas - this.datosCajaAbierta.totalGastos
        );
      }
      return 0;
    },
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/CajaAbierta');
      this.datosCajaAbierta = response.data;
    } catch (error) {
      console.error('Error al obtener datos de la caja:', error);
    }
    this.fechaHoraCierre = new Date().toISOString().slice(0, 16);
  },
  methods: {
    async MontoFinalCaja() {
      const formData = {
        montoFinal: this.montoFinal,
        fechaHoraCierre: this.fechaHoraCierre,
        IDAbrirCaja: this.datosCajaAbierta.IDAbrirCaja,
      };
      try {
        const response = await axios.post(
          'http://localhost:3000/cierrecaja',
          formData
        );
        console.log('Respuesta del servidor:', response.data);
        alert('Se cerró caja correctamente');

        this.limpiarDatos(); // Limpiar datos
        this.$emit('caja-cerrada');
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
  