<template>
    <div class="row text-bg-light p-3">

        <div class="col-lg-12">
            <div>
                <h1>Nueva venta</h1>
            </div>

            <div class="row">
                <div class="col-lg-8">
                    <div class="row nav">
                        <div class="col-lg-12">
                            <nav class="navbar navbar-expand-lg bg-body-tertiary nav2">
                                <div class="container-fluid">
                                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul class="navbar-nav me-auto mb-2 col-lg-12">
                                            <form class="d-flex" role="search">
                                                <input class="form-control me-2" type="search" placeholder="Buscar"
                                                    aria-label="Buscar">
                                                <button class="btn btn-outline-success" type="submit">Buscar</button>
                                            </form>

                                            <li class="nav-item dropdown">
                                                <a class="nav-link dropdown-toggle" href="#" role="button"
                                                    data-bs-toggle="dropdown" aria-expanded="false">
                                                    Categoria
                                                </a>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                    <li>
                                                        <hr class="dropdown-divider">
                                                    </li>
                                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <!-- Repita las tarjetas según sea necesario -->
                    </div>

                </div>

            </div>
            <div class="col-lg-4 col-md-12 canast">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="row canasta">
                            <div class="col-8">
                                <h3>Canasta</h3>
                            </div>
                            <div class="col-2">
                                <button class="btn btn-primary btn-circle icon" type="button"
                                    id="Agregar">Vaciar</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 mt-3">
                        <div class="row cant">
                            <div class="col-3">
                            </div>
                            <div class="col-9">
                                <input type="text" class="form-control mb-2 text-center" placeholder="Producto">
                                <input type="number" class="form-control mb-2 text-center" placeholder="Cantidad">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-10 mt-4 mar">
                    <label for="total" class="texto">Total</label>
                    <input class="form-control mb-3 text-center" id="total" type="text">
                    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Confirmar Producto</button>
                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight"
                        aria-labelledby="offcanvasRightLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasRightLabel">Confirmacion de la venta</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <div class="movements">
                                <div class="tab-buttons">
                                    <button @click="showSection('transacciones')"
                                        :class="{ active: currentSection === 'transacciones' }">Pagada</button>
                                    <button @click="showSection('cierresCaja')"
                                        :class="{ active: currentSection === 'cierresCaja' }">A credito</button>
                                </div>
                                <div class="transaction-section" v-if="currentSection === 'transacciones'">
                                    <div>
                                        <label for="text">Fecha de la venta</label>
                                        <input type="date" />
                                    </div>
                                    <div class="transaction-table">
                                        <div class="opciones">
                                            <button type="button" class="btn btn-outline-secondary">Efectivo<i
                                                    class="bi bi-cash"></i></button>
                                            <button type="button" class="btn btn-outline-secondary">Tarjeta<i
                                                    class="bi bi-credit-card"></i></button>
                                            <button type="button" class="btn btn-outline-secondary">Transferencia
                                                bancaria<i class="bi bi-bank2"></i></button>
                                            <button type="button" class="btn btn-outline-secondary">Otro<i
                                                    class="bi bi-columns-gap"></i></button>
                                        </div>
                                        <div>
                                            <label for="buscar">Agrega un cliente a la venta (opcional)</label>
                                            <input type="text">
                                        </div>
                                        <div>
                                            <button type="button" class="btn btn-primary">Confirmar venta</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="cierres-caja-section" v-if="currentSection === 'cierresCaja'">
                                    <!-- Sin contenido para Cierres de caja aún -->
                                    <div>
                                        <div>
                                            <label for="text">Fecha de la venta</label>
                                            <input type="date" />
                                        </div>
                                        <div>
                                            <label for="buscar">Agrega un cliente a la venta (opcional)</label>
                                            <input type="text">
                                        </div>
                                        <div>
                                            <button type="submit" class="btn btn-primary">Confirmar venta</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NuevaVenta',
    data() {
        return {
            currentSection: 'transacciones' // Define la sección inicial
        };
    },
    methods: {
        printReceipt() {
            console.log('Imprimiendo comprobante...');
        },
        downloadReceipt() {
            console.log('Descargando comprobante...');
        },
        showSection(section) {
            this.currentSection = section;
        }
    }
}
</script>

<style>
/* Updated CSS for the 'Pagada' section */
.offcanvas-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
}

.offcanvas-body label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
}

.offcanvas-body input[type="date"],
.offcanvas-body .btn-outline-secondary,
.offcanvas-body input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.offcanvas-body .opciones {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.offcanvas-body .opciones button {
    flex: 1 1 calc(50% - 10px);
}

.offcanvas-body .btn-primary {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
}

.tab-buttons button {
    background-color: transparent;
    border: none;
    font-size: 16px;
    margin-right: 20px;
    cursor: pointer;
}

.tab-buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.tab-buttons button {
    flex: 1;
    margin-right: 10px;
}

.tab-buttons button:last-child {
    margin-right: 0;
}

.tab-buttons button.active {
    font-weight: bold;
    border-bottom: 2px solid #000;
}

/* Existing Styles */
.mar {
    margin-top: 50px;
}

.icon {
    font-size: 20px;
}

.icon2 {
    font-size: 20px;
    background-color: aqua;
}

.d-flex {
    display: flex;
}

.align-items-center {
    align-items: center;
}

.me-2 {
    margin-right: 0.5rem;
}

.me-3 {
    margin-right: 1rem;
}

.btn-circle {
    width: 70px;
    height: 40px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(106, 82, 173);
}

.btn-circle i {
    font-size: 16px;
}

.card1 {
    margin: 10px;
    flex: 0 0 calc(50% - 20px);
    max-width: calc(50% - 20px);
}

@media (max-width: 767.98px) {
    .card1 {
        flex: 0 0 calc(100% - 20px);
        max-width: calc(100% - 20px);
    }
}

.canast {
    border-left: 1px solid black;
    border-top: 1px solid black;
}

.canasta {
    border-bottom: 1px solid black;
}

.cant {
    border-bottom: 1px solid black;
}

.nav {
    border-top: 1px solid black;
}

.nav2 {
    border-bottom: 1px solid black;
}

/* Media Queries for Responsive Design */
@media (max-width: 768px) {
    .icon {
        font-size: 18px;
    }

    .icon2 {
        font-size: 18px;
    }

    .btn-circle {
        width: 60px;
        height: 35px;
    }

    .btn-circle i {
        font-size: 14px;
    }

    .card1 {
        width: 180px;
        height: 130px;
    }
}
</style>
