<template>
    <div class="container">
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
            <div >
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
                                    <input v-model.number="nuevoCliente.Adeudos" type="number" required
                                        class="form-control" step="0.01">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="submit" class="btn btn-primary">{{ modoEdicion ? 'Actualizar' : 'Añadir' }}
                        Cliente</button>
                    <button @click="cancelarEdicion" type="button" class="btn btn-secondary ml-2">Cancelar</button>
                </form>
            </div>
        </div>

        <!-- Modal para Adeudos y Abonos -->
        <div class="modal fade" id="adeudoAbonoModal" tabindex="-1" aria-labelledby="adeudoAbonoModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="adeudoAbonoModalLabel">{{ modalTitulo }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="procesarAdeudoAbono">
                            <div class="mb-3">
                                <label for="cantidad" class="form-label">Cantidad</label>
                                <input type="number" class="form-control" id="cantidad"
                                    v-model.number="cantidadAdeudoAbono" step="0.01" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Confirmar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
            esAdeudo: true
        }
    },
    computed: {
        clientesFiltrados() {
            if (this.busqueda) {
                return this.clientes.filter(cliente =>
                    cliente.Nombre.toLowerCase().includes(this.busqueda.toLowerCase())
                );
            }
            return this.clientes;
        }
    },
    methods: {
        agregarCliente() {
            if (this.modoEdicion) {
                const index = this.clientes.findIndex(cli => cli.id === this.nuevoCliente.id);
                if (index !== -1) {
                    this.clientes[index] = { ...this.nuevoCliente };
                }
            } else {
                const nuevoId = Date.now().toString();
                this.clientes.push({ ...this.nuevoCliente, id: nuevoId });
            }
            this.resetearFormulario();
        },
        editarCliente(cliente) {
            this.nuevoCliente = { ...cliente };
            this.modoEdicion = true;
            this.mostrarFormulario = true;
        },
        borrarCliente(id) {
            if (confirm('¿Está seguro de que desea eliminar este cliente?')) {
                this.clientes = this.clientes.filter(cli => cli.id !== id);
            }
        },
        resetearFormulario() {
            this.nuevoCliente = {
                Nombre: '',
                Telefono: '',
                Adeudos: 0
            };
            this.mostrarFormulario = false;
            this.modoEdicion = false;
        },
        cancelarEdicion() {
            this.resetearFormulario();
        },
        validarTelefono(event) {
            this.nuevoCliente.Telefono = event.target.value.replace(/[^0-9]/g, '');
        },
        buscarCliente() {
            // La búsqueda se realiza automáticamente gracias al computed property
        },
        mostrarModalAdeudo(cliente) {
            this.clienteSeleccionado = cliente;
            this.modalTitulo = 'Añadir Adeudo';
            this.esAdeudo = true;
            this.cantidadAdeudoAbono = 0;
            // Aquí deberías abrir el modal usando Bootstrap
        },
        mostrarModalAbono(cliente) {
            this.clienteSeleccionado = cliente;
            this.modalTitulo = 'Añadir Abono';
            this.esAdeudo = false;
            this.cantidadAdeudoAbono = 0;
            // Aquí deberías abrir el modal usando Bootstrap
        },
        procesarAdeudoAbono() {
            if (this.clienteSeleccionado) {
                if (this.esAdeudo) {
                    this.clienteSeleccionado.Adeudos += this.cantidadAdeudoAbono;
                } else {
                    this.clienteSeleccionado.Adeudos -= this.cantidadAdeudoAbono;
                    if (this.clienteSeleccionado.Adeudos < 0) {
                        this.clienteSeleccionado.Adeudos = 0;
                    }
                }
            }
            // Aquí deberías cerrar el modal usando Bootstrap
        }
    }
}
</script>