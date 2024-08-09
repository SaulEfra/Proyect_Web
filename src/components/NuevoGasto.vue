<template>
  <div>
    <form @submit.prevent="NuevoGasto">
      <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" value="Pagada"
          v-model="estadoGasto" checked>
        <label class="btn btn-outline-primary" for="btnradio1">Pagada</label>

        <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" value="En Deuda"
          v-model="estadoGasto">
        <label class="btn btn-outline-primary" for="btnradio2">En Deuda</label>
      </div>

      <div class="mb-3">
        <label for="ValorGasto" class="form-label">Valor</label>
        <input type="number" class="form-control" id="ValorGasto" v-model="ValorGasto" required>
      </div>
      <div class="mb-3">
        <label for="NombreGasto" class="form-label">¿Quieres darle un nombre a este gasto?</label>
        <input type="text" placeholder="Escríbelo aquí" class="form-control" id="NombreGasto" v-model="NombreGasto">
      </div>
      <div class="mb-3" v-if="estadoGasto === 'En Deuda'">
        <label for="NombreProveedor" class="form-label">Nombre del Proveedor</label>
        <input type="text" class="form-control" id="NombreProveedor" v-model="NombreProveedor" required>
      </div>
      <div class="mb-3" v-if="estadoGasto === 'En Deuda'">
        <label for="telefonoProveedor" class="form-label">Telefono del Proveedor</label>
        <input type="number" class="form-control" id="telefonoProveedor" v-model="TelefonoProveedor" required>
      </div>
      <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NuevoGasto',
  props: {
    datosCajaAbierta: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      ValorGasto: '',
      NombreGasto: '',
      estadoGasto: 'Pagada',
      NombreProveedor: '', 
      TelefonoProveedor: ''// Solo se usará si el estado es "En Deuda"
    };
  },

  methods: {
    async NuevoGasto() {
      const IDAbrirCaja = this.datosCajaAbierta.IDAbrirCaja;
      const formData = {
        NombreGasto: this.NombreGasto,
        ValorGasto: this.ValorGasto,
        IDAbrirCaja: IDAbrirCaja,
        estadoGasto: this.estadoGasto,
        NombreProveedor: this.estadoGasto === 'En Deuda' ? this.NombreProveedor : null,
        TelefonoProveedorProveedor: this.estadoGasto === 'En Deuda' ? this.TelefonoProveedor : null,
      };
      try {
        // Registrar el gasto y, si es necesario, la deuda
        const response = await axios.post('http://localhost:3000/NuevoGasto', formData);
        console.log('Respuesta del servidor:', response.data);
        alert('Registro completado correctamente.');

        this.limpiarDatos(); // Limpiar datos

      } catch (error) {
        console.error('Error al registrar:', error);
        alert('Error al registrar: ' + error.message);
      }
    },
    limpiarDatos() {
      this.ValorGasto = '';
      this.NombreGasto = '';
      this.estadoGasto = 'Pagada';
      this.NombreProveedor = '';
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