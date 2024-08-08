<template>
  <div class="row partLat">
    <!-- Botón para mostrar/ocultar la barra lateral en pantallas pequeñas -->
    <button @click="toggleSidebar" class="btn btn-primary sidebar-toggle d-md-none">
      <i :class="['bi', isOpen ? 'bi-x' : 'bi-list']"></i>
    </button>

    <!-- Barra lateral -->
    <nav :class="['sidebar', isOpen ? 'sidebar-open' : 'sidebar-closed']">
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

        <!-- Configuración y agregar negocio -->
        <div class="col-12 config">
          <div class="config-item">
            <i class="bi bi-gear-fill"></i>
            <RouterLink to="/InfoNeg" @click="closeSidebar">Configuraciones</RouterLink>
          </div>
          <div class="config-item">
            <i class="bi bi-plus-circle-fill"></i>
            <RouterLink to="/AgregarNegocio" @click="closeSidebar">Agregar negocio</RouterLink>
          </div>
        </div>

        <!-- Productos y movimientos -->
        <div class="col-12 produc">
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
        <div class="col-12 gest">
          <div class="gest-item">
            <h5>Gestiona tus contactos</h5>
          </div>
          <div class="gest-item">
            <RouterLink to="/ClientesTreinta" @click="closeSidebar">Clientes</RouterLink>
          </div>
          <div class="gest-item">
            <RouterLink to="/Proveedores" @click="closeSidebar">Proveedores</RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenido principal -->
    <div class="Contenid col-md-9 col-lg-10">
      <RouterView @negocio-creado="actualizarNegocios"></RouterView>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router';

export default {
  name: 'ParteLateral',
  components: {
    RouterLink,
    RouterView,
  },
  data() {
    return {
      isOpen: false,
      isMdAndUp: window.innerWidth >= 768,
      negocios: [],
      selectedNegocio: null,
      defaultNegocioId: null,
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
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
    closeSidebar() {
      this.isOpen = false;
    },
    handleResize() {
      this.isMdAndUp = window.innerWidth >= 768;
      if (this.isMdAndUp) {
        this.isOpen = false; // Asegurar que la barra lateral esté cerrada en pantallas grandes
      }
    },
    async cargarNegocios() {
      try {
        const response = await axios.get('http://localhost:3000/Neg/getnegocios');
        this.negocios = response.data;
        if (this.negocios.length > 0) {
          if (!this.defaultNegocioId) {
            this.defaultNegocioId = this.negocios[0].id;
          }
          this.selectedNegocio = this.defaultNegocioId;
          this.cambiarNegocio();
        }
      } catch (error) {
        console.error('Error al cargar negocios:', error.response ? error.response.data : error.message);
        alert('Error al cargar los negocios. Por favor, intenta de nuevo.');
      }
    },
    async cambiarNegocio() {
      if (!this.selectedNegocio) return;

      try {
        const response = await axios.get(`http://localhost:3000/Neg/getNegocio/${this.selectedNegocio}`);
        this.$emit('negocio-cambiado', response.data);
      } catch (error) {
        console.error('Error al cargar los datos del negocio:', error.response ? error.response.data : error.message);
        alert('Error al cargar los datos del negocio. Por favor, intenta de nuevo.');
      }
    },
    actualizarNegocios() {
      this.cargarNegocios();
    }
  }
};
</script>

<style scoped>
.partLat {
  display: flex;
}

.sidebar-toggle {
  display: none;
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

.sidebar-closed {
  transform: translateX(-100%);
  opacity: 0;
}

.container-fluid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.perfiles, .config, .produc, .gest {
  margin-top: 20px;
  margin-bottom: 20px;
}

.config-item, .produc-item, .gest-item {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.config-item:hover, .produc-item:hover {
  background-color: #e9ecef;
}

.gest h5 {
  margin-bottom: 10px;
  font-weight: bold;
  color: #495057;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  color: #333;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }

  .sidebar-toggle {
    display: flex;
    margin-bottom: 20px;
  }

  .Contenid {
    margin-left: 0; /* Ajuste para cuando la barra lateral está activa */
    width: 100%;
  }

  .sidebar-open + .Contenid {
    margin-left: 250px; /* Ancho de la barra lateral */
  }
}

.Contenid {
  flex: 1;
  padding: 20px;
}
</style>
