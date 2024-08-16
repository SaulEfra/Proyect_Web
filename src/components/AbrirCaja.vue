<template>
  <div>
    <form @submit.prevent="abrirCaja">
      <div class="form-group">
        <label for="montoInicial">Monto Inicial</label>
        <input
          type="number"
          id="montoInicial"
          v-model.number="montoInicial"
          class="form-control"
          placeholder="Ingrese el monto inicial"
          required
          min="0"
          max="900000"
          @input="validarMonto"
        />
      </div>
      <button type="submit" class="btn btn-primary mt-3">Abrir Caja</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

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
    validarMonto() {
      if (this.montoInicial < 0) {
        this.montoInicial = 0;
      } else if (this.montoInicial > 900000) {
        this.montoInicial = 900000;
      }
    },
    async abrirCaja() {
      try {
        const formData = {
          fechaHora: this.fechaHora,
          montoInicial: this.montoInicial,
        };

        const openResponse = await axios.post('http://localhost:3000/AbrirCaja', formData, { withCredentials: true });
        console.log('Respuesta del servidor:', openResponse.data);
        
        await Swal.fire({
          icon: 'success',
          title: 'Caja Abierta',
          text: 'Se abrió caja correctamente',
          timer: 2000,
          showConfirmButton: false
        });

        localStorage.setItem('cajaAbierta', JSON.stringify(openResponse.data));

        this.limpiarDatos();

        this.$emit('caja-abierta', openResponse.data);
      } catch (error) {
        console.error('Error al abrir caja:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al abrir caja: ' + error.message,
        });
      }
    },
    limpiarDatos() {
      this.montoInicial = '';
    },
  },
};
</script>