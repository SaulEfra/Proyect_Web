<template>
  <div>
    <form @submit.prevent="montoInicialCaja">
      <div class="form-group">
        <label for="montoInicial">Monto Inicial</label>
        <input
          type="number"
          id="montoInicial"
          v-model="montoInicial"
          class="form-control"
          placeholder="Ingrese el monto inicial"
          required
        />
      </div>
    
      <button type="submit" class="btn btn-primary mt-3">Abrir Caja</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AbrirCaja',
  data() {
    return {
      montoInicial: '',
      fechaHora: '',
    };
  },
  mounted() {
    this.fechaHora = new Date().toISOString().slice(0, 16);
  },
  methods: {
    async montoInicialCaja() {
      const formData = {
        montoInicial: this.montoInicial,
        fechaHora: this.fechaHora,
      };
      try {
        const response = await axios.post('http://localhost:3000/AbrirCaja', formData);
        console.log('Respuesta del servidor:', response.data); 
        alert('Se Abrió Caja Correctamente');

        // Obtener los datos del último registro
        const dataResponse = await axios.get('http://localhost:3000/AbrirCaja');
        const datos = dataResponse.data;
        alert(`Última Caja Abierta:
          ID: ${datos.idAbrirCaja}
          Fecha: ${datos.Fecha}
          Monto Inicial: ${datos.MontoInicial}`);

        this.limpiarDatos(); // Limpiar datos
        
        // Emitir un evento con los datos obtenidos
        this.$emit('caja-abierta', datos);

      } catch (error) {
        console.error('Error al Abrir caja:', error);
        alert('Error al abrir caja: ' + error.message);
      }
    },
    limpiarDatos() {
      this.montoInicial = '';
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




