<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <span class="navbar-brand">
        <h1>Clientes</h1>
      </span>
      <form class="d-flex" @submit.prevent="buscarCliente">
        <input class="form-control me-2" type="search" v-model="busqueda" placeholder="Buscar cliente"
          aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Buscar</button>
      </form>
      <button v-if="!mostrarFormulario" @click="mostrarFormulario = true" class="btn btn-primary">Añadir
        Cliente</button>
    </div>
  </nav>
  <div class="row mt-4">
    <div>
      <table v-if="!mostrarFormulario" class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre del cliente</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Adeudos</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(cliente, indice) in clientesFiltrados" :key="indice">
            <td>{{ cliente.Nombre }}</td>
            <td>{{ cliente.Telefono }}</td>
            <td>{{ cliente.Adeudos }}</td>
            <td>
              <div class="btn-group" role="group">
                <button class="btn btn-secondary" title="Editar" @click="editarCliente(cliente)">
                  <i class="bi bi-pencil-square"></i> Editar
                </button>
                <button class="btn btn-danger" title="Eliminar" @click="borrarCliente(cliente.id)">
                  <i class="bi bi-trash"></i> Eliminar
                </button>
                <button class="btn btn-info" title="Añadir Adeudo" @click="mostrarModalAdeudo(cliente)">
                  <i class="bi bi-plus-circle"></i> Adeudo
                </button>
                <button class="btn btn-success" title="Añadir Abono" @click="mostrarModalAbono(cliente)">
                  <i class="bi bi-dash-circle"></i> Abono
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <form v-if="mostrarFormulario" @submit.prevent="agregarCliente">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Nombre del cliente</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Adeudos</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr>
              <td><input v-model="nuevoCliente.Nombre" type="text" required class="form-control"></td>
              <td>
                <input v-model="nuevoCliente.Telefono" type="text" required class="form-control"
                  @input="validarTelefono" pattern="[0-9]*">
              </td>
              <td>
                <input v-model.number="nuevoCliente.Adeudos" type="number" required class="form-control" step="0.01">
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" class="btn btn-primary">{{ modoEdicion ? 'Actualizar' : 'Añadir' }} Cliente</button>
        <button @click="cancelarEdicion" type="button" class="btn btn-secondary ml-2">Cancelar</button>
      </form>
    </div>
  </div>

  <!-- Modal para Adeudos y Abonos -->
  <div v-if="mostrarModal" class="modal-backdrop fade show"></div>
  <div v-if="mostrarModal" class="modal fade show" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ modalTitulo }}</h5>
          <button type="button" class="btn-close" @click="cerrarModal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="procesarAdeudoAbono">
            <div class="mb-3">
              <label for="cantidad" class="form-label">Cantidad</label>
              <input type="number" class="form-control" id="cantidad" v-model.number="cantidadAdeudoAbono" step="0.01"
                required>
            </div>
            <button type="submit" class="btn btn-primary">Confirmar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'ClientesApp',
  data() {
    return {
      mostrarFormulario: false,
      clientes: [],
      nuevoCliente: {
        Nombre: '',
        Telefono: '',
        Adeudos: 0
      },
      modoEdicion: false,
      busqueda: '',
      clienteSeleccionado: null,
      modalTitulo: '',
      cantidadAdeudoAbono: 0,
      esAdeudo: true,
      mostrarModal: false,
      swalWithBootstrapButtons: Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      })
    }
  },
  computed: {
    clientesFiltrados() {
      if (this.busqueda) {
        return this.clientes.filter(cliente => cliente.Nombre.toLowerCase().includes(this.busqueda.toLowerCase()))
      }
      return this.clientes
    }
  },
  methods: {
    agregarCliente() {
      if (this.modoEdicion) {
        this.swalWithBootstrapButtons.fire({
          title: "¿Actualizar cliente?",
          text: "¿Está seguro de que desea actualizar este cliente?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sí, actualizar",
          cancelButtonText: "Cancelar",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            const index = this.clientes.findIndex(cli => cli.id === this.nuevoCliente.id)
            if (index !== -1) {
              this.clientes[index] = { ...this.nuevoCliente }
            }
            this.resetearFormulario()
            Swal.fire({
              title: "Cliente actualizado",
              icon: "success",
            });
          }
        });
      } else {
        const nuevoId = Date.now().toString()
        this.clientes.push({ ...this.nuevoCliente, id: nuevoId })
        this.resetearFormulario()
        Swal.fire({
          title: "Cliente añadido",
          icon: "success",
        });
      }
    },
    editarCliente(cliente) {
      this.nuevoCliente = { ...cliente }
      this.modoEdicion = true
      this.mostrarFormulario = true
    },
    borrarCliente(id) {
      this.swalWithBootstrapButtons.fire({
        title: "¿Está seguro?",
        text: "No podrá revertir esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.clientes = this.clientes.filter(cli => cli.id !== id)
          this.swalWithBootstrapButtons.fire({
            title: "Eliminado!",
            text: "El cliente ha sido eliminado.",
            icon: "success"
          });
        }
      });
    },
    resetearFormulario() {
      this.nuevoCliente = {
        Nombre: '',
        Telefono: '',
        Adeudos: 0
      }
      this.mostrarFormulario = false
      this.modoEdicion = false
    },
    cancelarEdicion() {
      this.resetearFormulario()
    },
    validarTelefono(event) {
      this.nuevoCliente.Telefono = event.target.value.replace(/[^0-9]/g, '')
    },
    buscarCliente() {
      // La búsqueda se realiza automáticamente gracias a la propiedad computada
    },
    mostrarModalAdeudo(cliente) {
      this.clienteSeleccionado = cliente
      this.modalTitulo = 'Añadir Adeudo'
      this.esAdeudo = true
      this.cantidadAdeudoAbono = 0
      this.mostrarModal = true
    },
    mostrarModalAbono(cliente) {
      this.clienteSeleccionado = cliente
      this.modalTitulo = 'Añadir Abono'
      this.esAdeudo = false
      this.cantidadAdeudoAbono = 0
      this.mostrarModal = true
    },
    procesarAdeudoAbono() {
      if (this.clienteSeleccionado) {
        if (this.esAdeudo) {
          this.clienteSeleccionado.Adeudos += this.cantidadAdeudoAbono
        } else {
          if (this.cantidadAdeudoAbono > this.clienteSeleccionado.Adeudos) {
            Swal.fire({
              title: "Error",
              text: "El abono no puede ser mayor que el adeudo actual.",
              icon: "error",
            });
            return
          }
          this.clienteSeleccionado.Adeudos -= this.cantidadAdeudoAbono
        }
        this.actualizarCliente(this.clienteSeleccionado)
        this.cerrarModal()
        Swal.fire({
          title: this.esAdeudo ? "Adeudo añadido" : "Abono realizado",
          icon: "success",
        });
      }
    },
    actualizarCliente(cliente) {
      const index = this.clientes.findIndex(c => c.id === cliente.id)
      if (index !== -1) {
        this.clientes[index] = { ...cliente }
      }
    },
    cerrarModal() {
      this.mostrarModal = false
    }
  }
}
</script>