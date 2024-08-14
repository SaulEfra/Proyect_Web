<template>
  <div class="row">
    <div class="col-lg-2 col-md-2 col-sm-2 partlt shadow">
      <ParteLateral></ParteLateral>
    </div>
    <div class="col-lg-10">
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <span class="navbar-brand">
            <h1>Proveedores</h1>
          </span>
          <form class="d-flex" @submit.prevent="buscarCliente">
            <input class="form-control me-2" type="search" v-model="busqueda" placeholder="Buscar Proveedor"
              aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Buscar</button>
          </form>
          <button v-if="!mostrarFormulario" @click="mostrarFormulario = true" class="btn btn-primary">Añadir
            Proveedor</button>
        </div>
      </nav>
      <div class="row mt-4">
        <div>
          <table v-if="!mostrarFormulario" class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Nombre del Proveedor</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Deudas</th>
                <th scope="col">Estado</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="(cliente, indice) in clientesFiltrados" :key="indice">
                <td class="d-none">{{ cliente.IDProveedor }}</td>
                <td>{{ cliente.ProveedorNombre }}</td>
                <td>{{ cliente.Telefono }}</td>
                <td>${{ cliente.ValorGasto }}</td>
                <td>{{ cliente.Estado }}</td>
                <td>
                  <div class="btn-group" role="group">
                    <button class="btn btn-secondary" title="Editar" @click="editarCliente(cliente)">
                      <i class="bi bi-pencil-square"></i> Editar
                    </button>
                    <button class="btn btn-info" title="DeudaPagada" @click="saldarDeuda(cliente.IDProveedor)">
                      <i class="bi bi-check-circle"></i> DeudaPagada
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
                  <th scope="col">Nombre del Proveedor</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Deuda</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr>
                  <td><input v-model="nuevoCliente.ProveedorNombre" type="text" required class="form-control"
                      @input="validarNombre"></td>
                  <td>
                    <input v-model="nuevoCliente.Telefono" type="text" required class="form-control"
                      @input="validarTelefono" pattern="\d{10}">
                  </td>
                  <td>
                    <input v-model.number="nuevoCliente.ValorGasto" min="1" type="number" required class="form-control"
                      step="0.01">
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit" class="btn btn-primary">{{ modoEdicion ? 'Actualizar' : 'Añadir' }} Proveedor</button>
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
  name: 'ProvedoreProd',
  components: {
    ParteLateral
  },
  data() {
    return {
      datosempl: [],
      mostrarFormulario: false,
      clientes: [],
      nuevoCliente: {
        IDProveedor: null,
        ProveedorNombre: '',
        Telefono: '',
        Adeudo: 0,
        activo: true
      },
      modoEdicion: false,
      busqueda: '',
      clienteSeleccionado: null,
      modalTitulo: '',
      cantidadAdeudoAbono: 0,
      esAdeudo: true,
      mostrarModal: false,
      Estadodeuda: 'Pagada'
    }
  },
  computed: {
  clientesFiltrados() {
    return this.clientes.filter(cliente => {
      // Filtrar clientes por el estado y búsqueda
      const coincideConBusqueda = this.busqueda ? cliente.ProveedorNombre.toLowerCase().includes(this.busqueda.toLowerCase()) : true;
      const noEsPagada = cliente.Estado !== 'Pagada';
      return coincideConBusqueda && noEsPagada;
    });
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
          title: "¿Actualizar Proveedor?",
          text: "¿Está seguro de que desea actualizar este Proveedor?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sí, actualizar",
          cancelButtonText: "Cancelar",
          reverseButtons: true
        }).then(async (result) => {
          if (result.isConfirmed) {
            const index = this.clientes.findIndex(cli => cli.IDProveedor === this.nuevoCliente.IDProveedor)
            await axios.put('http://localhost:3000/Neg/provedoresAct', {
              IDProveedor: this.nuevoCliente.IDProveedor,
              Nombrecli: this.nuevoCliente.ProveedorNombre,
              NumeroDeTelefonocli: this.nuevoCliente.Telefono,
              Adeudo: this.nuevoCliente.ValorGasto,
              activocli: this.nuevoCliente.activo
            })
            this.resetearFormulario()
            this.obtenerClientes()
            if (index !== -1) {
              this.datosempl[index] = { ...this.nuevoCliente };
              this.resetearFormulario()
              Swal.fire({
                title: "Proveedor actualizado",
                icon: "success",
              });
            }
          }
        });
      } else {
        const nuevoId = Date.now().toString()
        this.clientes.push({ ...this.nuevoCliente, id: nuevoId })
        await axios.post('http://localhost:3000/Neg/provedores', {
          IDcliente: this.nuevoCliente.IDEmpleado,
          Nombreprov: this.nuevoCliente.ProveedorNombre,
          NumeroDeTelefono: this.nuevoCliente.Telefono,
          Adeudo: this.nuevoCliente.ValorGasto,
          activocli: this.nuevoCliente.activo
        })
        this.resetearFormulario()
        this.obtenerClientes()
        Swal.fire({
          title: "Proveedor añadido",
          icon: "success",
        });
      }
    },
    editarCliente(cliente) {
      this.nuevoCliente = { ...cliente }
      if (typeof this.nuevoCliente.ProveedorNombre === 'string') {
        this.validarNombre();
      }
      this.modoEdicion = true
      this.mostrarFormulario = true
    },

    async saldarDeuda(IDProveedor) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons.fire({
        title: "¿Está seguro?",
        text: "¿Desea saldar la deuda de este proveedor?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, saldar deuda!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            // Enviar datos al nuevo endpoint para actualizar
            await axios.put('http://localhost:3000/Neg/gastoAct', {
              IDProveedor,
              Estado: this.Estadodeuda
            });
            this.obtenerClientes()
          } catch (error) {
            console.error("Error al saldar la deuda del proveedor:", error);
          }
          Swal.fire({
            title: "Pagada",
            text: "El proveedor ha saldado la deuda.",
            icon: "success"
          });
        }
      });
    },


    resetearFormulario() {
      this.nuevoCliente = {
        IDProveedor: null,
        ProveedorNombre: '',
        Telefono: '',
        ValorGasto: 0,
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
    validarNombre() {
      if (typeof this.nuevoCliente.ProveedorNombre === 'string') {
        this.nuevoCliente.ProveedorNombre = this.nuevoCliente.ProveedorNombre.trimStart();
      } else {
        console.error('El nombre del proveedor no es una cadena');
      }
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
        const response = await axios.get('http://localhost:3000/Neg/provedoresget');
        this.datosempl = response.data.results;
        this.clientes = response.data.results.map(cliente => ({
          ...cliente,
          ProveedorNombre: cliente.ProveedorNombre || '' // Asegúrate de que ProveedorNombre esté definido
        }));
      } catch (error) {
        console.error('Error al obtener los proveedores:', error);
        alert('Error al obtener los proveedores');
      }
    },


  },
  mounted() {
    this.obtenerClientes()
  }
}
</script>
