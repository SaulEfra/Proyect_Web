<template>
  <div class="row">
    <div class="col-lg-2 col-md-2 col-sm-2 partlt shadow">
      <ParteLateral></ParteLateral>
    </div>
    <div class="col-lg-10">
      <div class="row">
        <div></div>
        <nav class="navbar bg-body-tertiary">
          <div class="container-fluid">
            <span class="navbar-brand">
              <h1>Empleados</h1>
            </span>
            <button v-if="!mostrarFormulario" @click="mostrarFormulario = true" class="btn btn-primary">Añadir Empleado</button>
          </div>
        </nav>
        <div class="row mt-4">
          <div class="col-lg-12">
            <div class="table-responsive">
              <table v-if="!mostrarFormulario" class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Nombre del empleado</th>
                    <th scope="col">Núm. de Teléfono</th>
                    <th scope="col">Cargo</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  <tr v-for="(empleado, indice) in datosempl" :key="indice">
                    <td class="d-none">{{ empleado.IDEmpleado }}</td>
                    <td>{{ empleado.Nombre }}</td>
                    <td>{{ empleado.NumeroDeTelefono }}</td>
                    <td>{{ empleado.Cargo }}</td>
                    <td>
                      <div class="btn-group" role="group">
                        <button class="btn btn-secondary" title="Editar" @click="editarEmpleado(empleado)">
                          <i class="bi bi-pencil-square"></i> Editar
                        </button>
                        <button class="btn btn-danger" title="Eliminar" @click="borrarEmpleado(empleado.IDEmpleado)">
                          <i class="bi bi-trash"></i> Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <form v-if="mostrarFormulario" @submit.prevent="agregarEmpleado">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Nombre del empleado</th>
                    <th scope="col">Núm. de Teléfono</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Estado</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  <tr>
                    <td>
                      <input v-model="nuevoEmpleado.Nombre" type="text" required class="form-control" @input="validarNombre">
                    </td>
                    <td>
                      <input v-model="nuevoEmpleado.NumeroDeTelefono" type="text" required class="form-control" @input="validarTelefono" pattern="\d{10}">
                    </td>
                    <td>
                      <select v-model="nuevoEmpleado.Rol" required class="form-select">
                        <option value="">Seleccione un Rol</option>
                        <option v-for="Rol in opcionesCargo" :key="Rol" :value="Rol">{{ Rol }}</option>
                      </select>
                    </td>
                    <td>
                      <div class="form-check">
                        <input v-model="nuevoEmpleado.activo" class="form-check-input" type="checkbox" id="empleadoActivo">
                        <label class="form-check-label" for="empleadoActivo">Activo</label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button type="submit" class="btn btn-primary">{{ modoEdicion ? 'Actualizar' : 'Añadir' }} Empleado</button>
              <button @click="cancelarEdicion" type="button" class="btn btn-secondary ml-2">Cancelar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import ParteLateral from '../components/ParteLateral.vue';

export default {
  name: 'EmpleadosApp',
  components: {
    ParteLateral
  },
  data() {
    return {
      mostrarFormulario: false,
      datosempl: [],
      nuevoEmpleado: {
        IDEmpleado: null,
        Nombre: '',
        NumeroDeTelefono: '',
        Rol: '',
        activo: true
      },
      modoEdicion: false,
      opcionesCargo: ['Encargado', 'Empleado']
    }
  },
  mounted() {
    this.obtenerEmpleados();
  },
  methods: {
    async agregarEmpleado() {
      try {
        if (this.modoEdicion) {
          await axios.put('http://localhost:3000/Neg/empleadosAct', {
            IDEmpleado: this.nuevoEmpleado.IDEmpleado,
            Nombre: this.nuevoEmpleado.Nombre,
            NumeroDeTelefono: this.nuevoEmpleado.NumeroDeTelefono,
            Rol: this.nuevoEmpleado.Rol,
            activo: this.nuevoEmpleado.activo
          });
          alert("datos enviados");
          this.obtenerEmpleados();
          const index = this.datosempl.findIndex(emp => emp.IDEmpleado === this.nuevoEmpleado.IDEmpleado);
          if (index !== -1) {
            this.datosempl[index] = { ...this.nuevoEmpleado };
          }
        } else {
          this.nuevoEmpleado.IDEmpleado = Date.now();
          await axios.post('http://localhost:3000/Neg/empleados', {
            IDEmpleado: this.nuevoEmpleado.IDEmpleado,
            Nombre: this.nuevoEmpleado.Nombre,
            NumeroDeTelefono: this.nuevoEmpleado.NumeroDeTelefono,
            Rol: this.nuevoEmpleado.Rol,
            activo: this.nuevoEmpleado.activo
          });
          this.datosempl.push({ ...this.nuevoEmpleado });
          alert("datos enviados");
          this.obtenerEmpleados();
        }
        this.resetearFormulario();
      } catch (error) {
        console.error("Error al enviar los datos del empleado:", error);
      }
    },
    editarEmpleado(empleado) {
      this.nuevoEmpleado = { ...empleado };
      this.validarNombre();  
      this.modoEdicion = true;
      this.mostrarFormulario = true;
    },
    async borrarEmpleado(IDEmpleado) {
      if (confirm('¿Está seguro de que desea eliminar este empleado?')) {
        try {
          this.datosempl = this.datosempl.filter(emp => emp.IDEmpleado !== IDEmpleado);
          await axios.delete(`http://localhost:3000/Neg/empleados/${IDEmpleado}`);
        } catch (error) {
          console.error("Error al eliminar el empleado:", error);
        }
      }
    },
    resetearFormulario() {
      this.nuevoEmpleado = {
        IDEmpleado: null,
        Nombre: '',
        NumeroDeTelefono: '',
        Rol: '',
        activo: true
      };
      this.mostrarFormulario = false;
      this.modoEdicion = false;
    },
    cancelarEdicion() {
      this.resetearFormulario();
    },
    async obtenerEmpleados() {
      try {
        const response = await axios.get('http://localhost:3000/Neg/empleadosget');
        this.datosempl = response.data.results;
      } catch (error) {
        console.error('Error al obtener los empleados:', error);
        alert('Error al obtener los empleados');
      }
    },
    validarTelefono(event) {
      const input = event.target;
      if (!/^\d*$/.test(input.value)) {
        input.value = input.value.replace(/[^\d]/g, '');
      }
    },
    validarNombre() {
      this.nuevoEmpleado.Nombre = this.nuevoEmpleado.Nombre.trimStart();
    }
  }
}
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}

.table th,
.table td {
  padding: 12px;
  text-align: left;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .table thead {
    display: none;
  }
  
  .table tbody, .table tr, .table td {
    display: block;
    width: 100%;
  }

  .table td {
    text-align: right;
    position: relative;
    padding-left: 50%;
  }

  .table td::before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 50%;
    padding-left: 10px;
    font-weight: bold;
    white-space: nowrap;
  }
}
</style>
