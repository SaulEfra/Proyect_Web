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
  name: 'ParteLateral',
}
</script>

<style scoped>
.partLat {
  padding: 20px;
  background-color: #f8f9fa; /* Color de fondo para el contenedor principal */
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Sombra ligera */
}

.perfiles {
  margin-bottom: 20px; /* Espacio entre el selector de perfiles y el siguiente bloque */
}

.config,
.produc,
.gest {
  margin-bottom: 20px; /* Espacio entre los bloques */
}

.config-item,
.produc-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* Espacio entre ícono y texto */
}

.config-item i,
.produc-item i {
  margin-right: 10px; /* Espacio entre el ícono y el texto */
}

.gest h6 {
  font-size: 16px; /* Tamaño de fuente para el título */
  margin-bottom: 10px; /* Espacio entre el título y los enlaces */
}

.gest RouterLink {
  display: block;
  margin-bottom: 5px; /* Espacio entre los enlaces */
  text-decoration: none; /* Quitar subrayado de los enlaces */
  color: #000; /* Color de texto para los enlaces */
}

.gest RouterLink:hover {
  text-decoration: underline; /* Subrayado al pasar el mouse sobre los enlaces */
}
</style>
