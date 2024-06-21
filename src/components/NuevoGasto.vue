<template>
    <div>
      <!-- Botón para abrir el modal -->
      <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#NuevoGastoModal">Nuevo gasto</button>
  
      <!-- Modal para Nuevo Gasto -->
      <div class="modal fade" id="NuevoGastoModal" tabindex="-1" aria-labelledby="NuevoGastoModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="NuevoGastoModalLabel">Nuevo Gasto</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitGasto">
                <div class="mb-3">
                  <label for="concepto" class="form-label">Concepto</label>
                  <input type="text" class="form-control" id="concepto" v-model="concepto" required>
                </div>
                <div class="mb-3">
                  <label for="monto" class="form-label">Monto</label>
                  <input type="number" class="form-control" id="monto" v-model="monto" required>
                </div>
                <div class="mb-3">
                  <label for="fecha" class="form-label">Fecha</label>
                  <input type="date" class="form-control" id="fecha" v-model="fecha" required>
                </div>
                <div class="mb-3">
                  <label for="medioPago" class="form-label">Medio de Pago</label>
                  <select class="form-select" id="medioPago" v-model="medioPago" required>
                    <option value="efectivo">Efectivo</option>
                    <option value="tarjeta">Tarjeta</option>
                    <option value="transferencia">Transferencia</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">Agregar Gasto</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NuevoGasto',
    data() {
      return {
        concepto: '',
        monto: '',
        fecha: '',
        medioPago: 'efectivo'
      };
    },
    methods: {
      submitGasto() {
        // Aquí puedes manejar la lógica para enviar los datos del nuevo gasto
        console.log('Nuevo Gasto:', this.concepto, this.monto, this.fecha, this.medioPago);
        // Resetear los campos del formulario después de enviar
        this.concepto = '';
        this.monto = '';
        this.fecha = '';
        this.medioPago = 'efectivo';
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .modal-title {
    margin: 0;
  }
  
  .form-control,
  .form-select {
    margin-bottom: 15px;
  }
  
  button[type="submit"] {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }
  
  button[type="submit"]:hover {
    background-color: #0056b3;
  }
  </style>
  