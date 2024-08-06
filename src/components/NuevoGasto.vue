<template>
  <div>
    <form @submit.prevent="NuevoGasto">
      <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" value="Pagada" checked>
        <label class="btn btn-outline-primary" for="btnradio1">Pagada</label>

        <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" value="En Deuda">
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
    
    };
  },
  
  methods: {
    
    async NuevoGasto() {
      const IDAbrirCaja = this.datosCajaAbierta.IDAbrirCaja;
      const formData = {
      
        NombreGasto: this.NombreGasto,
        ValorGasto: this.ValorGasto,
        IDAbrirCaja: IDAbrirCaja, // Solo enviar IDAbrirCaja
        // ID del proveedor seleccionado
      };
      try {
        const response = await axios.post('http://localhost:3000/NuevoGasto', formData);
        console.log('Respuesta del servidor:', response.data);
        alert('Gasto registrado correctamente.');

        // Obtener los datos del último registro
        const dataResponse = await axios.get('http://localhost:3000/UltimoGasto');
        const datosGasto = dataResponse.data;
        alert(`Último Gasto Registrado:
          ID Gasto: ${datosGasto.IDGasto}
          Nombre Gasto: ${datosGasto.NombreGasto}
          Fecha Gasto: ${datosGasto.FechaGasto}
          Valor Gasto: ${datosGasto.ValorGasto}`);

        this.limpiarDatos(); // Limpiar datos

      } catch (error) {
        console.error('Error al registrar el gasto:', error);
        alert('Error al registrar el gasto: ' + error.message);
      }
    },
    limpiarDatos() {
     
      this.ValorGasto = '';
      this.NombreGasto = '';
     
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
  
  
  
  
  