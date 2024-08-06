<template>
  <div>
    <form @submit.prevent="abrirCaja">
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
      montoInicial: '', // Monto inicial de la caja
      fechaHora: '',    // Fecha y hora actual
    };
  },
  mounted() {
    // Establece la fecha y hora actual al montarse el componente
    this.fechaHora = new Date().toISOString().slice(0, 16);
  },
  methods: {
  async abrirCaja() {
    try {
      // Prepara los datos para enviar al servidor
      const formData = {
        fechaHora: this.fechaHora,
        montoInicial: this.montoInicial,
      };

      // Envía la solicitud para abrir la caja
      const openResponse = await axios.post('http://localhost:3000/AbrirCaja', formData, { withCredentials: true });
      console.log('Respuesta del servidor:', openResponse.data);
      alert('Se abrió caja correctamente');

      // Guardar los detalles de la caja abierta en localStorage
      localStorage.setItem('cajaAbierta', JSON.stringify(openResponse.data));

      // Limpia los datos del formulario
      this.limpiarDatos();

      // Emite el evento con los datos de la caja abierta
      this.$emit('caja-abierta', openResponse.data);
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud
      console.error('Error al abrir caja:', error);
      alert('Error al abrir caja: ' + error.message);
    }
  },
  limpiarDatos() {
    // Limpia el campo de monto inicial
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
