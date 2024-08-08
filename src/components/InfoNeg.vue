<template>
  <div class="business-app">
    <nav class="navbar" style="background-color: #1A365D;">
      <div class="container-fluid">
        <span class="navbar-brand">
          <h1 style="color: #F8F9FA;">Datos del negocio</h1>
        </span>
        <button v-if="!modificar" @click="modificar = true" class="btn btn-accent">Modificar</button>
      </div>
    </nav>
    <div class="row mt-5">
      <div class="col-lg-12">
        <div v-if="!modificar" class="row">
          <div class="col-md-4">
            <p class="label"><strong>Tipo de negocio</strong></p>
            <p>{{ negocio.tipoNegocio }}</p>
          </div>
          <div class="col-md-4">
            <p class="label"><strong>Nombre del negocio</strong></p>
            <p>{{ negocio.nombre }}</p>
          </div>
          <div class="col-md-4">
            <p class="label"><strong>Dirección del negocio</strong></p>
            <p>{{ negocio.direccion }}</p>
          </div>
        </div>

        <form v-if="modificar" @submit.prevent="guardarCambios" class="edit-form">
          <div class="row">
            <div class="col-lg-12">
              <h2 class="mb-4" style="color: #1A365D;">Modificar Datos del Negocio</h2>
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
                <button type="submit" class="btn btn-success">Guardar Cambios</button>
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
// ... (el script se mantiene igual)
</script>

<style scoped>
.business-app {
  background-color: #F8F9FA;
  color: #333333;
}

.navbar {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.btn-accent {
  background-color: #F39C12;
  color: #FFFFFF;
  border: none;
}

.btn-accent:hover {
  background-color: #E67E22;
}

.label {
  color: #1A365D;
  font-weight: bold;
}

.edit-form {
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.form-label {
  color: #2ECC71;
}

.btn-success {
  background-color: #2ECC71;
  border-color: #2ECC71;
}

.btn-success:hover {
  background-color: #27AE60;
  border-color: #27AE60;
}

.btn-secondary {
  background-color: #95A5A6;
  border-color: #95A5A6;
}

.btn-secondary:hover {
  background-color: #7F8C8D;
  border-color: #7F8C8D;
}
</style>

