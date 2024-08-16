<template>
  <div class="row partLat">
    <button class="btn btn-primary d-lg-none" @click="toggleSidebar">
      <i class="bi bi-list"></i>
    </button>
    <div :class="['sidebar', {'d-none': !isSidebarVisible}]">
      <div class="row partLat"></div>
      <div class="col-12 perfiles">
        <select class="form-select">
          <option value="1">Negocio 1</option>
          <option value="2">Negocio 2</option>
        </select>
      </div>
      <div class="col-12 cerrar-sesion">
        <button class="btn btn-danger w-100" @click="logout">
          Cerrar sesión
        </button>
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
        <div class="gest-item"><h5>Gestiona tus contactos</h5></div>
        <div class="gest-item">
          <RouterLink to="/ClientesTreinta">Clientes</RouterLink>
        </div>
        <div class="gest-item">
          <RouterLink to="/ProvedoreProd">Proveedores</RouterLink>
        </div>
      </div>

      
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'ParteLateral',
  data() {
    return {
      isSidebarVisible: false
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    async logout() {
      try {
        await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });

        Swal.fire({
          icon: 'success',
          title: 'Sesión cerrada',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.$router.push('/');
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al cerrar sesión',
          text: 'No se pudo cerrar la sesión. Por favor, inténtalo de nuevo.',
        });
      }
    }
  }
}
</script>


<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background-color: #f8f9fa;
  padding: 20px;
  overflow-y: auto;
  z-index: 1000;
}

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
.partLat {
  margin: 1px;
}

.partLat a {
  text-decoration: none;
  color: black;
  margin-left: 5px;
  font-size: 17px;
}

.perfiles {
  margin-top: 40px;
  margin-bottom: 40px;
}

.config {
  margin-top: 40px;
  margin-bottom: 40px;
}

.product {
  margin-top: 40px;
  margin-bottom: 40px;
}

.gest {
  margin-top: 40px;
  margin-bottom: 40px;
}

.config-item {
  margin-bottom: 10px;
}

.produc-item {
  margin-bottom: 10px;
}

.gest-item {
  margin-bottom: 10px;
}

@media (max-width: 991.98px) {
  .sidebar {
    width: 100%;
  }
}
@media (min-width: 992px) {
  .sidebar {
    display: block !important;
  }
}
</style>

