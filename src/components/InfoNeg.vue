<template>
  <div>
    <nav class="navbar bg-body-tertiary">
      <div class="container-fluid">
        <span class="navbar-brand">
          <h1>Datos del negocio</h1>
        </span>
        <button v-if="!modificar" @click="modificar = true" class="btn btn-primary">Modificar</button>
      </div>
    </nav>
    <div class="row mt-5">
      <div class="col-lg-12">
        <div v-if="!modificar" class="row">
          <div class="col-md-4">
            <p><strong>Tipo de negocio</strong></p>
            <p>{{ negocio.tipoNegocio }}</p>
          </div>
          <div class="col-md-4">
            <p><strong>Nombre del negocio</strong></p>
            <p>{{ negocio.nombre }}</p>
          </div>
          <div class="col-md-4">
            <p><strong>Dirección del negocio</strong></p>
            <p>{{ negocio.direccion }}</p>
          </div>
        </div>

        <form v-if="modificar" @submit.prevent="guardarCambios">
          <div class="row">
            <div class="col-lg-12">
              <h2 class="mb-4">Modificar Datos del Negocio</h2>
              <div class="row">
                <div class="col-md-4 mb-3">
                  <label for="tipoNegocio" class="form-label">Tipo de negocio</label>
                  <select v-model="negocioEditado.tipoNegocio" id="tipoNegocio" required class="form-select">
                    <option value="">Seleccione un tipo</option>
                    <option v-for="tipo in tiposNegocio" :key="tipo" :value="tipo">
                      {{ tipo }}
                    </option>
                  </select>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="nombreNegocio" class="form-label">Nombre del negocio</label>
                  <input v-model="negocioEditado.nombre" type="text" class="form-control" id="nombreNegocio" required>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="direccionNegocio" class="form-label">Dirección del negocio</label>
                  <input v-model="negocioEditado.direccion" type="text" class="form-control" id="direccionNegocio" required>
                </div>
              </div>
              <div class="d-grid col-md-4 mx-auto mt-3">
                <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                <button @click="cancelarEdicion" type="button" class="btn btn-secondary mt-2">Cancelar</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'InfoNeg',
  data() {
    return {
      modificar: false,
      negocio: {
        tipoNegocio: 'Restaurante',
        nombre: 'Mi Negocio',
        direccion: 'Calle Principal 123'
      },
      negocioEditado: {},
      tiposNegocio: ['Restaurante', 'Tienda', 'Servicios', 'Otro']
    }
  },
  methods: {
    guardarCambios() {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Quieres guardar estos cambios?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, guardar cambios",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.negocio = { ...this.negocioEditado };
          this.modificar = false;
          Swal.fire({
            title: "¡Guardado!",
            text: "Los cambios han sido guardados.",
            icon: "success"
          });
        }
      });
    },
    cancelarEdicion() {
      this.negocioEditado = { ...this.negocio };
      this.modificar = false;
    }
  },
  created() {
    this.negocioEditado = { ...this.negocio };
  }
}
</script>

<style scoped>
body {
  background-color: aquamarine;
}
</style>