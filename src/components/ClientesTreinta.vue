<template>
  <div class="row">
    <div class="col-lg-2 col-md-2 col-sm-2 partlt shadow">
      <ParteLateral></ParteLateral>
    </div>
    <div class="col-lg-10">
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
                <td class="d-none">{{ cliente.IDCli }}</td>
                <td>{{ cliente.NombreCli }}</td>
                <td>{{ cliente.Telefono }}</td>
                <td>${{ cliente.Monto }}</td>
                <td>
                  <div class="btn-group" role="group">
                    <button class="btn btn-secondary" title="Editar" @click="editarCliente(cliente)">
                      <i class="bi bi-pencil-square"></i> Editar
                    </button>
                    <button class="btn btn-danger" title="Eliminar" @click="borrarCliente(cliente.IDCli)">
                      <i class="bi bi-trash"></i> Eliminar
                    </button>
                    <!--
                <button class="btn btn-info" title="Añadir Adeudo" @click="mostrarModalAdeudo(cliente)">
                  <i class="bi bi-plus-circle"></i> Adeudo
                </button>
                <button class="btn btn-success" title="Añadir Abono" @click="mostrarModalAbono(cliente)">
                  <i class="bi bi-dash-circle"></i> Abono
                </button>
                -->

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
                  <td><input v-model="nuevoCliente.NombreCli" @input="validarNombre" type="text" required
                      class="form-control">
                  </td>
                  <td>
                    <input v-model="nuevoCliente.Telefono" type="text" required class="form-control"
                      @input="validarTelefono" pattern="\d{10}">
                  </td>
                  <td>
                    <input v-model.number="nuevoCliente.Monto" min="1" type="number" required class="form-control"
                      step="0.01">
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
                  <input type="number" class="form-control" id="cantidad" v-model.number="cantidadAdeudoAbono"
                    step="0.01" required>
                </div>
                <button type="submit" class="btn btn-primary">Confirmar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
import ParteLateral from '../components/ParteLateral.vue';

export default {
  name: 'ClientesApp',
  components: {
    ParteLateral
  },
  data() {
    return {
      datosempl: [],
      mostrarFormulario: false,
      clientes: [],
      nuevoCliente: {
        IDCli: null,
        NombreCli: '',
        Telefono: '',
        Adeudo: 0,
        activo: true,
        Monto: ''
      },
      modoEdicion: false,
      busqueda: '',
      clienteSeleccionado: null,
      modalTitulo: '',
      cantidadAdeudoAbono: 0,
      esAdeudo: true,
      mostrarModal: false,
      Estado: 'Pendiente'
    }
  },
  computed: {
    clientesFiltrados() {
      if (this.busqueda) {
        return this.clientes.filter(cliente => cliente.NombreCli.toLowerCase().includes(this.busqueda.toLowerCase()))
      }
      return this.clientes
    }
  },
  methods: {
    async agregarCliente() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });

      if (this.modoEdicion) {
        swalWithBootstrapButtons.fire({
          title: "¿Actualizar cliente?",
          text: "¿Está seguro de que desea actualizar este cliente?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sí, actualizar",
          cancelButtonText: "Cancelar",
          reverseButtons: true
        }).then(async (result) => {
          if (result.isConfirmed) {
            const index = this.clientes.findIndex(cli => cli.id === this.nuevoCliente.IDCli)
            await axios.put(`http://localhost:3000/Neg/ClientesAct`, {
              IDCli: this.nuevoCliente.IDCli,
              Nombrecli: this.nuevoCliente.NombreCli,
              NumeroDeTelefonocli: this.nuevoCliente.Telefono,
              Adeudo: this.nuevoCliente.Monto,
              activocli: this.nuevoCliente.activo,
              Estado:this.Estado
            })
            this.resetearFormulario()
            this.obtenerClientes()
            if (index !== -1) {
              this.datosempl[index] = { ...this.nuevoCliente };
              this.resetearFormulario()
              Swal.fire({
                title: "Cliente actualizado",
                icon: "success",
              });
            }
          }
        });
      } else {
        const nuevoId = Date.now().toString()
        this.clientes.push({ ...this.nuevoCliente, id: nuevoId })
        await axios.post(`http://localhost:3000/Neg/clientes`, {
          IDcliente: this.nuevoCliente.IDEmpleado,
          Nombrecli: this.nuevoCliente.NombreCli,
          NumeroDeTelefonocli: this.nuevoCliente.Telefono,
          Adeudo: this.nuevoCliente.Monto,
          activocli: this.nuevoCliente.activo,
          Estado:this.Estado
        })
        this.resetearFormulario()
        this.obtenerClientes()
        Swal.fire({
          title: "Cliente añadido",
          icon: "success",
        });
      }
    },
    editarCliente(cliente) {
      this.nuevoCliente = { ...cliente }
      this.validarNombre();
      this.modoEdicion = true
      this.mostrarFormulario = true
    },
    async borrarCliente(IDCli) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons.fire({
        title: "¿Está seguro?",
        text: "No podrá revertir esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          //this.clientes = this.clientes.filter(cli => cli.IDCli !== IDCli)
          try {
            this.datosempl = this.datosempl.filter(emp => emp.IDCli !== IDCli);
            await axios.delete(`http://localhost:3000/Neg/Clientes/${IDCli}`);
          } catch (error) {
            console.error("Error al eliminar el empleado:", error);
          }
          this.obtenerClientes()
          swalWithBootstrapButtons.fire({
            title: "Eliminado!",
            text: "El cliente ha sido eliminado.",
            icon: "success"
          });
        }
      });
    },
    resetearFormulario() {
      this.nuevoCliente = {
        IDCli: null,
        NombreCli: '',
        Telefono: '',
        Adeudo: 0,
        activo: true
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
      // La búsqueda se realiza automáticamente gracias al computed property
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
          this.clienteSeleccionado.Adeudo += this.cantidadAdeudoAbono
        } else {
          if (this.cantidadAdeudoAbono > this.clienteSeleccionado.Adeudo) {
            Swal.fire({
              title: "Error",
              text: "El abono no puede ser mayor que el adeudo actual.",
              icon: "error",
            });
            return
          }
          this.clienteSeleccionado.Adeudo -= this.cantidadAdeudoAbono
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
        this.$set(this.clientes, index, { ...cliente })
      }
    },
    cerrarModal() {
      this.mostrarModal = false
    },
    async obtenerClientes() {
      try {
        const response = await axios.get(`http://localhost:3000/Neg/clientesget`);
        this.datosempl = response.data.results;
        this.clientes = response.data.results;
      } catch (error) {
        console.error('Error al obtener los clientes:', error);
        alert('Error al obtener los clientes');
      }
    },
    validarNombre() {
      if (this.nuevoCliente.NombreCli) {
        this.nuevoCliente.NombreCli = this.nuevoCliente.NombreCli.trimStart();
      }
    }
  },
  mounted() {
    this.obtenerClientes()
  }
}
</script>