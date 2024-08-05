<template>
    <div>
      <form @submit.prevent="NuevoGasto">
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off"  value="Pagada" checked>
          <label class="btn btn-outline-primary" for="btnradio1">Pagada</label>
  
          <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off"  value="En Deuda">
          <label class="btn btn-outline-primary" for="btnradio2">En Deuda</label>
        </div>
        <div class="mb-3">
          <label for="FechaGasto" class="form-label">Fecha</label>
          <input type="date" class="form-control" id="FechaGasto" v-model="FechaGasto" required>
        </div>
        <div class="mb-3">
          <label for="categ" class="form-label">Categoría del gasto</label>
          <select  id="categ" class="form-select" aria-label="Default select example">
            <option disabled selected>Selecciona una categoría</option>
            <option value="Categoría 1">Categoría 1</option>
            <option value="Categoría 2">Categoría 2</option>
            <option value="Categoría 3">Categoría 3</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="ValorGasto" class="form-label">Valor</label>
          <input type="number" class="form-control" id="ValorGasto" v-model="ValorGasto" required>
        </div>
        <div class="mb-3">
          <label for="NombreGasto" class="form-label">¿Quieres darle un nombre a este gasto?</label>
          <input type="text" placeholder="Escríbelo aquí" class="form-control" id="NombreGasto" v-model="NombreGasto">
        </div>
        <div class="mb-3">
          <label for="ProveedorGasto" class="form-label">Agrega un proveedor al gasto</label>
          <input type="text" placeholder="Buscar..." class="form-control" id="ProveedorGasto" >
        </div>
        <button type="submit" class="btn btn-primary">Guardar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'NuevoGasto',
    data() {
      return {
        FechaGasto: '',
        ValorGasto: '',
        NombreGasto: '',
        
      };
    },
    methods: {
      async NuevoGasto() {
        const formData = {
          
          FechaGasto: this.FechaGasto,
          NombreGasto: this.NombreGasto,
          ValorGasto: this.ValorGasto,
          
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
        
        this.FechaGasto = '';
        this.ValorGasto = '';
        this.NombreGasto = '';
        
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
  