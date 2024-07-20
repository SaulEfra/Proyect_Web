<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Columna para ParteLateral -->
      <div class="col-lg-2 col-md-3 col-sm-12">
        <ParteLateral />

      </div>

      <!-- Columna para el contenido principal -->
      <div class="col-lg-10 col-md-9 col-sm-12">
        <div class="header">
          <h2>Movimientos</h2>

          <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#AbrirCajaModal">Abrir Caja</button>
          <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#CerrarCajaModal">Cerrar Caja</button>

          <div class="actions">
            <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#NuevaVenta">Nueva Venta</button>
            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#NuevoGastoOffcanvas" aria-controls="NuevoGastoOffcanvas">
              Nuevo Gasto
            </button>

            <div class="offcanvas offcanvas-end" tabindex="-1" id="NuevoGastoOffcanvas" aria-labelledby="NuevoGastoLabel">
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="NuevoGastoLabel">Nuevo Gasto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                <NuevoGasto />
              </div>
            </div>
          </div>

          <div class="modal fade" id="AbrirCajaModal" tabindex="-1" aria-labelledby="AbrirCajaLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="AbrirCajaLabel">Abrir Caja</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <AbrirCaja @caja-abierta="manejarCajaAbierta" />
                </div>
              </div>
            </div>
          </div>

          <div class="modal fade" id="CerrarCajaModal" tabindex="-1" aria-labelledby="CerrarCajaLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="CerrarCajaLabel">Cierre de Caja</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <CerrarCaja v-if="datosCajaAbierta" :datosCajaAbierta="datosCajaAbierta" />
                </div>
              </div>
            </div>
          </div>

          <div class="modal fade" id="NuevaVenta" tabindex="-1" aria-labelledby="NuevaVentaLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="NuevaVentaLabel">Nueva Venta</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <NuevaVenta />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="movements">
          <div class="tab-buttons">
            <button @click="showSection('transacciones')">Transacciones</button>
            <button @click="showSection('cierresCaja')">Cierres de caja</button>
          </div>

          <div class="transaction-section" v-if="currentSection === 'transacciones'">
            <div>
              <div class="filters">
                <select>
                  <option>Diario</option>
                  <option>Semanal</option>
                  <option>Mensual</option>
                </select>
                <input type="date" />
                <input type="text" placeholder="Buscar concepto..." />
                <button>Buscar</button>
              </div>
            </div>

            <div class="row">
              <button class="btn-tooltip" tabindex="0" data-bs-toggle="tooltip" title="Descripción del balance">
                <h3>Balance</h3>
                <p></p>
              </button>
              <button class="btn-tooltip" tabindex="0" data-bs-toggle="tooltip" title="Descripción de las ventas totales">
                <h3>Ventas Totales</h3>
                <p></p>
              </button>
              <button class="btn-tooltip" tabindex="0" data-bs-toggle="tooltip" title="Descripción de los gastos totales">
                <h3>Gastos Totales</h3>
                <p></p>
              </button>
            </div>

            <div class="row">
              <div class="col-12">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item col-3" role="presentation">
                    <button class="nav-link active" id="section1-tab" data-bs-toggle="tab" data-bs-target="#section1" type="button" role="tab" aria-controls="section1" aria-selected="true">Ingresos</button>
                  </li>
                  <li class="nav-item col-3" role="presentation">
                    <button class="nav-link" id="section2-tab" data-bs-toggle="tab" data-bs-target="#section2" type="button" role="tab" aria-controls="section2" aria-selected="false">Egresos</button>
                  </li>
                  <li class="nav-item col-3" role="presentation">
                    <button class="nav-link" id="section3-tab" data-bs-toggle="tab" data-bs-target="#section3" type="button" role="tab" aria-controls="section3" aria-selected="false">Por Cobrar</button>
                  </li>
                  <li class="nav-item col-3" role="presentation">
                    <button class="nav-link" id="section4-tab" data-bs-toggle="tab" data-bs-target="#section4" type="button" role="tab" aria-controls="section4" aria-selected="false">Por Pagar</button>
                  </li>
                </ul>
              </div>
            </div>

            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="section1" role="tabpanel" aria-labelledby="section1-tab">
                <div class="card card-body">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Concepto</th>
                        <th>Valor</th>
                        <th>Medio de pago</th>
                        <th>Fecha y hora</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <!-- Contenido de ingresos -->
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="tab-pane fade" id="section2" role="tabpanel" aria-labelledby="section2-tab">
                <div class="card card-body">
                  <table class="table">
                    <thead>
                      <!-- Encabezados de egresos -->
                    </thead>
                    <tbody>
                      <!-- Contenido de egresos -->
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="tab-pane fade" id="section3" role="tabpanel" aria-labelledby="section3-tab">
                <div class="card card-body">
                  <table class="table">
                    <thead>
                      <!-- Encabezados de por cobrar -->
                    </thead>
                    <tbody>
                      <!-- Contenido de por cobrar -->
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="tab-pane fade" id="section4" role="tabpanel" aria-labelledby="section4-tab">
                <div class="card card-body">
                  <table class="table">
                    <thead>
                      <!-- Encabezados de por pagar -->
                    </thead>
                    <tbody>
                      <!-- Contenido de por pagar -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="cierres-caja-section" v-if="currentSection === 'cierresCaja'">
            <div>
              <div class="filters">
                <select>
                  <option>Diario</option>
                  <option>Semanal</option>
                  <option>Mensual</option>
                </select>
                <input type="date" />
              </div>
            </div>
            <div class="cierres-caja-table">
              <div>
                <table class="cierres">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Hora de Apertura</th>
                      <th>Hora de Cierre</th>
                      <th>Ventas Totales</th>
                      <th>Gastos Totales</th>
                      <th>Balance Final</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Contenido de cierres de caja -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import NuevaVenta from './NuevaVenta.vue';
import AbrirCaja from './AbrirCaja.vue';
import CerrarCaja from './CerrarCaja.vue';
import NuevoGasto from './NuevoGasto.vue';
import ParteLateral from './ParteLateral.vue';
export default {
  name: 'MovimientosApp',
  components: {
    NuevaVenta,
    AbrirCaja,
    CerrarCaja,
    NuevoGasto,
    ParteLateral,

  },
  data() {
    return {
      currentSection: 'transacciones',
      datosCajaAbierta: null
    };

  },

  methods: {
    showSection(section) {
      this.currentSection = section;

    },
    manejarCajaAbierta(datos) {
      this.datosCajaAbierta = datos;
    }, 
    
  },

};
</script>

<style scoped>
.container-fluid {
  display: flex;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  border-bottom: 1px solid #ccc;
  font-family: 'Bodoni Moda SC';
}

.actions {
  display: flex;
  gap: 10px;
}

button,
select {
  padding: 10px 20px;
  font-size: 14px;
  border: 1px solid #e0c8c872;
  border-radius: 5px;
  background-color: rgba(210, 231, 243, 0.7);
  cursor: pointer;
  color: #030303;
  font-family: 'Bodoni Moda SC';
}

button:hover,
select:hover {
  background-color: rgba(243, 243, 243, 0.7);
  color: black;
}

.movements {
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  /* Asegura que el contenedor ocupe todo el ancho */
  margin: 0 auto;
  margin-top: 20px;
  /* Centra el contenido si es necesario */
}

.transaction-section {
  margin-top: 20px;
  width: 100%;
  padding: 45px;
  background-color: #fff;
  border-radius: 5px;
}

.cierres-caja-section {
  margin-top: 20px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
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

.filters {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
}

.filters select,
.filters input[type="date"],
.filters input[type="text"] {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.transactions,
.cierres {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0px;
}

.transactions th,
.transactions td,
.cierres th,
.cierres td {
  border: 1px solid #ddd;
}

.transactions th,
.cierres th {
  background-color: rgba(210, 231, 243, 0.7);
  text-align: left;
}

.cierres th {
  background-color: #f2f2f2;
}

@media (max-width: 768px) {
  .tab-buttons,
  .filters {
    flex-direction: column;
  }

  .tab-buttons button,
  .filters select,
  .filters input[type="date"],
  .filters input[type="text"] {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
  }

  .filters input[type="text"] {
    margin-bottom: 0;
  }
}

.nav-item button {
  width: 100%;
}

.btn-tooltip {
  width: calc(33.33% - 5px);
  /* Calcula el ancho para que sean 3 botones en una fila */
  text-align: center;
  padding: 20px;
  margin-bottom: 15px;
  border: 10px;
  border-radius: 10px;
  background-color: #eef2f6ad;
  color: rgb(13, 13, 13);
  cursor: pointer;
}

.btn-tooltip:hover {
  background-color: #afdbf962;
}

.btn-tooltip h3 {
  margin-bottom: 10px;
  font-size: 18px;
}

.btn-tooltip p {
  font-size: 16px;
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .tab-buttons,
  .filters {
    flex-direction: column;
  }

  .tab-buttons button,
  .filters select,
  .filters input[type="date"],
  .filters input[type="text"] {
    width: 100%;
    margin-bottom: 10px;
  }

  .filters input[type="text"] {
    margin-bottom: 0;
  }

  .btn-tooltip {
    width: 100%;
    /* En dispositivos móviles, ocupa todo el ancho */
  }
}

.balances {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.btn-group {
  text-align: center;
  padding: 10px;
  margin-bottom: 10px;
  border: 10px;
  border-radius: 10px;
  background-color: #eef2f6ad;
  color: rgb(13, 13, 13);
  cursor: pointer;
  width: 100%;
}

</style>
