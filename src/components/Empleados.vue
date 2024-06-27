<template>
  <div class="container">
    <nav class="navbar bg-body-tertiary">
      <div class="container-fluid">
        <span class="navbar-brand">
          <h1>Empleados</h1>
        </span>
        <button v-if="!mostrarFormulario" @click="mostrarFormulario = true" class="btn btn-primary">Añadir
          Empleado</button>
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
            <tr v-for="(empleado, indice) in empleados" :key="indice">
              <td>{{ empleado.Nombre }}</td>
              <td>{{ empleado.NumeroDeTelefono }}</td>
              <td>{{ empleado.Rol }}</td>
              <td>
                <div class="btn-group" role="group">
                  <button class="btn btn-secondary" title="Editar" @click="editarEmpleado(empleado)">
                    <i class="fas fa-pencil-alt"></i>
                  </button>
                  <button class="btn btn-danger" title="Eliminar" @click="borrarEmpleado(empleado.id)">
                    <i class="fas fa-trash-alt"></i>
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
                  <input v-model="nuevoEmpleado.NumeroDeTelefono" type="text" required class="form-control"
                    @input="validarTelefono" pattern="[0-9]*">
                </td>
                <td>
                  <select v-model="nuevoEmpleado.Rol" required class="form-select">
                    <option value="">Seleccione un Rol</option>
                    <option v-for="Rol in opcionesCargo" :key="Rol" :value="Rol">
                      {{ Rol }}
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
export default {
  name: 'EmpleadosApp',
  data() {
    return {
      mostrarFormulario: false,
      empleados: [],
      nuevoEmpleado: {
        id: null,
        Nombre: '',
        NumeroDeTelefono: '',
        Rol: '',
        activo: true
      },
      modoEdicion: false,
      opcionesCargo: ['Encargado', 'Empleado']
    }
  },
  methods: {
    agregarEmpleado() {
      if (this.modoEdicion) {
        const index = this.empleados.findIndex(emp => emp.id === this.nuevoEmpleado.id);
        if (index !== -1) {
          this.empleados[index] = { ...this.nuevoEmpleado };
        }
      } else {
        this.nuevoEmpleado.id = Date.now();
        this.empleados.push({ ...this.nuevoEmpleado });
      }
      this.resetearFormulario();
    },
    editarEmpleado(empleado) {
      this.nuevoEmpleado = { ...empleado };
      this.modoEdicion = true;
      this.mostrarFormulario = true;
    },
    borrarEmpleado(id) {
      if (confirm('¿Está seguro de que desea eliminar este empleado?')) {
        this.empleados = this.empleados.filter(emp => emp.id !== id);
      }
    },
    resetearFormulario() {
      this.nuevoEmpleado = {
        id: null,
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
    }
  }
}
</script>