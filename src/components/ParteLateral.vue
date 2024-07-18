<template>
  <div class="row partLat">
    <div class="col-12 perfiles">
      <select class="form-select">
        <option value="1">Negocio 1</option>
        <option value="2">Negocio 2</option>
      </select>
    </div>

    <div class="col-12 config">
      <div class="config-item">
        <i class="bi bi-gear-fill"></i>
        <RouterLink to="/Configuracion">Configuraciones</RouterLink>
      </div>
      <div class="config-item">
        <i class="bi bi-plus-circle-fill"></i>
        <RouterLink to="/AgregarNegocio">Agregar negocio</RouterLink>
      </div>
    </div>

    <div class="col-12 produc">
      <div class="produc-item">
        <i class="bi bi-file-earmark-minus-fill"></i>
        <RouterLink to="/Movimientos">Movimientos</RouterLink>
      </div>
      <div class="produc-item">
        <i class="bi bi-box-seam-fill"></i>
        <RouterLink to="/Productos">Productos</RouterLink>
      </div>
      <div class="produc-item">
        <i class="bi bi-people-fill"></i>
        <RouterLink to="/Empleados">Empleados</RouterLink>
      </div>
    </div>

    <div class="col-12 gest">
      <h6>Gestiona tus contactos</h6>
      <RouterLink to="/Clientes">Clientes</RouterLink>
      <br>
      <RouterLink to="/Proveedores">Proveedores</RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParteLateral'
};
</script>

<style scoped>
.partLat {
  padding: 20px;
}
.perfiles, .config, .produc, .gest {
  margin-bottom: 20px;
}
.config-item, .produc-item {
  margin-bottom: 10px;
}
</style>
