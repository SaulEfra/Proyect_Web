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
                <button v-if="!mostrarFormulario" @click="mostrarFormularioAgregar" class="btn btn-primary">Añadir
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
                                    <button class="btn btn-info" title="Añadir Adeudo"
                                        @click="mostrarModalAdeudo(cliente)">
                                        <i class="bi bi-plus-circle"></i> Adeudo
                                    </button>
                                    <button class="btn btn-success" title="Añadir Abono"
                                        @click="mostrarModalAbono(cliente)">
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
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'

export default {
    name: 'ClientesApp',
    setup() {
        const mostrarFormulario = ref(false)
        const clientes = ref([])
        const nuevoCliente = ref({
            Nombre: '',
            Telefono: '',
            Adeudos: 0
        })
        const modoEdicion = ref(false)
        const busqueda = ref('')
        const clienteSeleccionado = ref(null)
        const modalTitulo = ref('')
        const cantidadAdeudoAbono = ref(0)
        const esAdeudo = ref(true)
        const mostrarModal = ref(false)

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        const clientesFiltrados = computed(() => {
            if (busqueda.value) {
                return clientes.value.filter(cliente => cliente.Nombre.toLowerCase().includes(busqueda.value.toLowerCase()))
            }
            return clientes.value
        })

        function mostrarFormularioAgregar() {
            swalWithBootstrapButtons.fire({
                title: "¿Añadir nuevo cliente?",
                text: "¿Desea proceder a añadir un nuevo cliente?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Sí, añadir",
                cancelButtonText: "Cancelar",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    mostrarFormulario.value = true
                }
            });
        }

        function agregarCliente() {
            swalWithBootstrapButtons.fire({
                title: modoEdicion.value ? "¿Actualizar cliente?" : "¿Añadir nuevo cliente?",
                text: modoEdicion.value ? "¿Está seguro de que desea actualizar este cliente?" : "¿Está seguro de que desea añadir este nuevo cliente?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: modoEdicion.value ? "Sí, actualizar" : "Sí, añadir",
                cancelButtonText: "Cancelar",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    if (modoEdicion.value) {
                        const index = clientes.value.findIndex(cli => cli.id === nuevoCliente.value.id)
                        if (index !== -1) {
                            clientes.value[index] = { ...nuevoCliente.value }
                        }
                    } else {
                        const nuevoId = Date.now().toString()
                        clientes.value.push({ ...nuevoCliente.value, id: nuevoId })
                    }
                    resetearFormulario()
                    Swal.fire({
                        title: modoEdicion.value ? "Cliente actualizado" : "Cliente añadido",
                        icon: "success",
                    });
                }
            });
        }

        function editarCliente(cliente) {
            swalWithBootstrapButtons.fire({
                title: "¿Editar cliente?",
                text: "¿Desea proceder a editar este cliente?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Sí, editar",
                cancelButtonText: "Cancelar",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    nuevoCliente.value = { ...cliente }
                    modoEdicion.value = true
                    mostrarFormulario.value = true
                }
            });
        }

        function borrarCliente(id) {
            swalWithBootstrapButtons.fire({
                title: "¿Está seguro?",
                text: "No podrá revertir esta acción!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar!",
                cancelButtonText: "No, cancelar!",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    clientes.value = clientes.value.filter(cli => cli.id !== id)
                    swalWithBootstrapButtons.fire({
                        title: "Eliminado!",
                        text: "El cliente ha sido eliminado.",
                        icon: "success"
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelado",
                        text: "El cliente está a salvo :)",
                        icon: "error"
                    });
                }
            });
        }

        function resetearFormulario() {
            nuevoCliente.value = {
                Nombre: '',
                Telefono: '',
                Adeudos: 0
            }
            mostrarFormulario.value = false
            modoEdicion.value = false
        }

        function cancelarEdicion() {
            swalWithBootstrapButtons.fire({
                title: "¿Cancelar edición?",
                text: "Se perderán los cambios no guardados",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, cancelar",
                cancelButtonText: "No, continuar editando",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    resetearFormulario()
                }
            });
        }

        function validarTelefono(event) {
            nuevoCliente.value.Telefono = event.target.value.replace(/[^0-9]/g, '')
        }

        function buscarCliente() {
            // La búsqueda se realiza automáticamente gracias al computed property
        }

        function mostrarModalAdeudo(cliente) {
            swalWithBootstrapButtons.fire({
                title: "¿Añadir adeudo?",
                text: "¿Desea añadir un adeudo a este cliente?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Sí, añadir",
                cancelButtonText: "Cancelar",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    clienteSeleccionado.value = cliente
                    modalTitulo.value = 'Añadir Adeudo'
                    esAdeudo.value = true
                    cantidadAdeudoAbono.value = 0
                    mostrarModal.value = true
                }
            });
        }

        function mostrarModalAbono(cliente) {
            swalWithBootstrapButtons.fire({
                title: "¿Añadir abono?",
                text: "¿Desea añadir un abono a este cliente?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Sí, añadir",
                cancelButtonText: "Cancelar",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    clienteSeleccionado.value = cliente
                    modalTitulo.value = 'Añadir Abono'
                    esAdeudo.value = false
                    cantidadAdeudoAbono.value = 0
                    mostrarModal.value = true
                }
            });
        }

        function procesarAdeudoAbono() {
            swalWithBootstrapButtons.fire({
                title: esAdeudo.value ? "¿Confirmar adeudo?" : "¿Confirmar abono?",
                text: `¿Está seguro de que desea ${esAdeudo.value ? 'añadir este adeudo' : 'realizar este abono'}?`,
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Sí, confirmar",
                cancelButtonText: "Cancelar",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    if (clienteSeleccionado.value) {
                        if (esAdeudo.value) {
                            clienteSeleccionado.value.Adeudos += cantidadAdeudoAbono.value
                        } else {
                            if (cantidadAdeudoAbono.value > clienteSeleccionado.value.Adeudos) {
                                Swal.fire({
                                    title: "Error",
                                    text: "El abono no puede ser mayor que el adeudo actual.",
                                    icon: "error",
                                });
                                return
                            }
                            clienteSeleccionado.value.Adeudos -= cantidadAdeudoAbono.value
                        }
                        actualizarCliente(clienteSeleccionado.value)
                        cerrarModal()
                        Swal.fire({
                            title: esAdeudo.value ? "Adeudo añadido" : "Abono realizado",
                            icon: "success",
                        });
                    }
                }
            });
        }

        function actualizarCliente(cliente) {
            const index = clientes.value.findIndex(c => c.id === cliente.id)
            if (index !== -1) {
                clientes.value[index] = { ...cliente }
            }
        }

        function cerrarModal() {
            mostrarModal.value = false
        }

        return {
            mostrarFormulario,
            clientes,
            nuevoCliente,
            modoEdicion,
            busqueda,
            clienteSeleccionado,
            modalTitulo,
            cantidadAdeudoAbono,
            esAdeudo,
            mostrarModal,
            clientesFiltrados,
            mostrarFormularioAgregar,
            agregarCliente,
            editarCliente,
            borrarCliente,
            resetearFormulario,
            cancelarEdicion,
            validarTelefono,
            buscarCliente,
            mostrarModalAdeudo,
            mostrarModalAbono,
            procesarAdeudoAbono,
            cerrarModal
        }
    }
}
</script>
