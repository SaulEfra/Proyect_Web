<template>
  <div class="container">
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
                <td><input v-model="nuevoEmpleado.Nombre" type="text" required class="form-control"></td>
                <td>
                  <input v-model="nuevoEmpleado.NumeroDeTelefono" type="text" required class="form-control" @input="validarTelefono"  pattern="\d{10}">
                </td>
                <td>
                  <select v-model="nuevoEmpleado.Rol" required class="form-select">
                    <option value="">Seleccione un Rol</option>
                    <option v-for="Rol in opcionesCargo" :key="Rol" :value="Rol" >
                      {{ Rol}}
                    </option>
                  </select>
                </td>
                <td>
                  <div class="form-check">
                    <input v-model="nuevoEmpleado.activo" class="form-check-input" type="checkbox" id="empleadoActivo">
                    <label class="form-check-label" for="empleadoActivo">
                      Activo
                    </label>
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
</template>

<script>
import axios from 'axios';

export default {
  name: 'EmpleadosApp',
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
          const index = this.datosempl.findIndex(emp => emp.IDEmpleado === this.nuevoEmpleado.IDEmpleado);
          if (index !== -1) {
            this.datosempl[index] = { ...this.nuevoEmpleado };
          }
          alert("datos enviados");
          this.obtenerEmpleados();
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
        }
        this.resetearFormulario();
      } catch (error) {
        console.error("Error al enviar los datos del empleado:", error);
      }
    },
    editarEmpleado(empleado) {
      this.nuevoEmpleado = { ...empleado };
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
    }
  }
}
</script>


<style scoped>
.movements {
  padding: 80px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.employee-table {
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Asegura que el contenido no desborde */
}

.table {
  width: 100%;
}

.table th,
.table td {
  padding: 12px;
  text-align: left;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.form-check-input {
  margin-top: 0.3rem;
}

.form-check-label {
  margin-left: 1rem;
}
</style>
