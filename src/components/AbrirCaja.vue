<template>
  <div>
    <form >
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
export default {
  name: 'AbrirCaja',
  data() {
    return {
      montoInicial: '',
      fechaHora: '', // No necesitamos inicializar fechaHora aquí
    };
  },
  mounted() {
    // Generar la fecha y hora actual
    this.fechaHora = new Date().toISOString().slice(0, 16); // Formato "YYYY-MM-DDTHH:mm"
  },
  methods: {
    abrirCaja() {
      // Aquí puedes manejar la lógica para abrir la caja.
      // Por ejemplo, puedes enviar los datos a un servidor.
      console.log('Caja abierta con monto inicial:', this.montoInicial, 'y fecha/hora:', this.fechaHora);
      // Resetea el formulario después de abrir la caja
      this.montoInicial = '';
      // No es necesario resetear fechaHora, ya que se actualizará automáticamente al montar el componente nuevamente
      // this.fechaHora = '';
      // Cerrar el modal (si es necesario)
      this.$emit('close');
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
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>
