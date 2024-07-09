<template>
  <div>
    <button @click="toggleSidebar" class="btn btn-primary sidebar-toggle d-md-none">
      <i :class="['bi', isOpen ? 'bi-x' : 'bi-list']"></i>
    </button>

    <nav :class="['sidebar', { 'sidebar-open': isOpen }, 'd-md-block']">
      <div class="container-fluid">
        <button @click="closeSidebar" class="btn btn-close d-md-none" aria-label="Close">
          <i class="bi bi-x"></i>
        </button>

        <div class="col-12 perfiles">
          <select class="form-select">
            <option value="1">Negocio 1</option>
            <option value="2">Negocio 2</option>
          </select>
        </div>
        <div class="config">
          <div class="config-item">
            <i class="bi bi-gear-fill"></i>
            <RouterLink to="/InfoNeg" @click="closeSidebar">Configuraciones</RouterLink>
          </div>
          <div class="config-item">
            <i class="bi bi-plus-circle-fill"></i>
            <RouterLink to="/AgregarNegocio" @click="closeSidebar">Agregar negocio</RouterLink>
          </div>
        </div>
        <div class="produc">
          <div class="produc-item">
            <i class="bi bi-file-earmark-minus-fill"></i>
            <RouterLink to="/Movimientos" @click="closeSidebar">Movimientos</RouterLink>
          </div>
          <div class="produc-item">
            <i class="bi bi-box-seam-fill"></i>
            <RouterLink to="/Productos" @click="closeSidebar">Productos</RouterLink>
          </div>
          <div class="produc-item">
            <i class="bi bi-people-fill"></i>
            <RouterLink to="/Empleados" @click="closeSidebar">Empleados</RouterLink>
          </div>
        </div>
        <div class="gest">
          <h5>Gestiona tus contactos</h5>
          <RouterLink to="/Clientes" @click="closeSidebar">Clientes</RouterLink>
          <br>
          <RouterLink to="/Proveedores" @click="closeSidebar">Proveedores</RouterLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'ParteLateral',
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
    closeSidebar() {
      this.isOpen = false;
    }
  }
}
</script>

<style scoped>
.sidebar-toggle {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.sidebar {
  background-color: #f8f9fa;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow-y: auto;
  padding: 20px;
  border-right: 1px solid #ddd;
  width: 250px;
  transform: translateX(-100%);
  opacity: 0;
}

.sidebar-open {
  transform: translateX(0);
  opacity: 1;
}

.container-fluid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.config-item,
.produc-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.config-item:hover,
.produc-item:hover {
  background-color: #e9ecef;
}

.gest h5 {
  margin-bottom: 10px;
  font-weight: bold;
  color: #495057;
}

.gest RouterLink {
  display: block;
  margin-bottom: 5px;
  text-decoration: none;
  color: #007bff;
}

.gest RouterLink:hover {
  text-decoration: underline;
}

@media (min-width: 768px) {
  .sidebar {
    transform: translateX(0);
    opacity: 1;
    position: static;
    border-right: none;
    width: 100%;
  }
}
</style>
