<template>
  <div class="row partLat ">
    <div class="col-12 perfiles">
      <select class="form-select">
        <option value="1">Negocio 1</option>
        <option value="2">Negocio 2</option>
      </select>
    </div>

    <div class="col-12 config">
      <div class="config-item">
        <i class="bi bi-gear-fill"></i>
        <RouterLink to="/InfoNeg">Configuraciones</RouterLink>
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
      <div class="gest-item"><h5>Gestiona tus contactos</h5></div>
      
      <div class="gest-item">
        <RouterLink to="/ClientesTreinta">Clientes</RouterLink>
      </div>
      <div class="gest-item">
        <RouterLink to="/ProvedoreProd">Proveedores</RouterLink>
      </div>
      
      
      
    </div>
  </div>
</template>

<script scoped>
export default {
  name: 'ParteLateral',
  
}
</script>

<style scoped>

.partLat{
  margin: 1px;
  
}
.partLat a{
  text-decoration: none;
  color: black;
  margin-left: 5px;
  font-size: 17px;
}
.perfiles{
  margin-top: 40px;
  margin-bottom: 40px;
}

.config{
  margin-top: 40px;
  margin-bottom: 40px;
}
.product{
  margin-top: 40px;
  margin-bottom: 40px;
}
.gest{
  margin-top: 40px;
  margin-bottom: 40px;
}

.config-item{
  margin-bottom: 10px;
}
.produc-item{
  margin-bottom: 10px;
}

.gest-item{
  margin-bottom: 10px;
}

</style>