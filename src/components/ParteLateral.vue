<template>
  <div>
    <!-- Botón para mostrar/ocultar la barra lateral en pantallas pequeñas -->
    <button @click="toggleSidebar" class="btn btn-primary sidebar-toggle d-md-none">
      <i :class="['bi', isOpen ? 'bi-x' : 'bi-list']"></i>
    </button>

    <!-- Barra lateral -->
    <nav :class="['sidebar', isOpen || isMdAndUp ? 'sidebar-open' : '', 'd-md-block']">
      <div class="container-fluid">
        <!-- Botón de cerrar la barra lateral en pantallas pequeñas -->
        <button @click="closeSidebar" class="btn btn-close d-md-none" aria-label="Close">
          <i class="bi bi-x"></i>
        </button>

        <!-- Selección de negocios -->
        <div class="col-12 perfiles">
          <select v-model="selectedNegocio" class="form-select" @change="cambiarNegocio">
            <option value="" disabled>Selecciona un negocio</option>
            <option v-for="negocio in negocios" :key="negocio.id" :value="negocio.id">
              {{ negocio.nameneg || negocio.nombre }}
            </option>
          </select>
        </div>

        <!-- Configuración y gestión de productos -->
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

        <!-- Gestión de contactos -->
        <div class="gest">
          <h5>Gestiona tus contactos</h5>
          <RouterLink to="/ClientesTreinta" @click="closeSidebar">Clientes</RouterLink>
          <br>
          <RouterLink to="/Proveedores" @click="closeSidebar">Proveedores</RouterLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ParteLateral',
  data() {
    return {
      isOpen: false,
      isMdAndUp: window.innerWidth >= 768,
      negocios: [],
      selectedNegocio: null
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize(); // Ajustar el estado de la barra lateral al cargar
    this.cargarNegocios(); // Cargar la lista de negocios al montar el componente
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    // Mostrar/ocultar la barra lateral
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
    // Cerrar la barra lateral
    closeSidebar() {
      this.isOpen = false;
    },
    // Ajustar el estado de la barra lateral según el tamaño de la ventana
    handleResize() {
      this.isMdAndUp = window.innerWidth >= 768;
    },
    // Cargar la lista de negocios desde el servidor
    async cargarNegocios() {
      try {
        const response = await axios.get('http://localhost:3000/Neg/getnegocios');
        this.negocios = response.data;
        if (this.negocios.length > 0 && !this.selectedNegocio) {
          this.selectedNegocio = this.negocios[0].id;
          this.cambiarNegocio();
        }
      } catch (error) {
        console.error('Error al cargar negocios:', error.response ? error.response.data : error.message);
        alert('Error al cargar los negocios. Por favor, intenta de nuevo.');
      }
    },

    // Cambiar el negocio seleccionado
    async cambiarNegocio() {
      if (!this.selectedNegocio) return;

      try {
        const response = await axios.get(`http://localhost:3000/Neg/getNegocio/${this.selectedNegocio}`);
        // Emitir el evento de cambio de negocio y redirigir al dashboard del negocio
        this.$emit('negocio-cambiado', response.data);
        this.$router.push({ name: 'DashboardNegocio', params: { id: this.selectedNegocio } });
      } catch (error) {
        console.error('Error al cargar los datos del negocio:', error.response ? error.response.data : error.message);
        alert('Error al cargar los datos del negocio. Por favor, intenta de nuevo.');
      }
    }
  }
};
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

.gest a {
  display: block;
  margin-bottom: 5px;
  text-decoration: none;
  color: #007bff;
}

.gest a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .sidebar {
    transform: none;
    opacity: 1;
    position: static;
    border-right: none;
    width: 100%;
  }
}
</style>
