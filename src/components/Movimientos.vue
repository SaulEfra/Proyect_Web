<template>
  <div class="container-fluid">

    <div class="header ">
      <h2 >Movimientos</h2>
      <button>Abrir Caja</button>
      <div class="actions">
        <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#NuevaVenta">Nueva
          Venta</button>

        <button>Nuevo gasto</button>
      </div>
      <!-- Modal para Nueva Venta -->
      <div class="modal fade" id="NuevaVenta" tabindex="-1" aria-labelledby="NuevaVentaLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="agregarproductoLabel">Nueva Venta</h5>
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

        <!-- Tabla de Transacciones -->
        <div class="transaction-table">
          <div>
            <div class="balances">
              <div class="balance">Balance: $500</div>
              <div class="sales">Ventas totales: $500</div>
              <div class="expenses">Gastos totales: $0</div>
            </div>

            <table class="transactions">
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
                <tr>
                  <td>Producto1</td>
                  <td>$500</td>
                  <td>Efectivo</td>
                  <td>24/05/2024 | 6:16 pm</td>
                  <td>Pagada</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="cierres-caja-section" v-if="currentSection === 'cierresCaja'">
        <!-- Sin contenido para Cierres de caja aún -->
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
                <tr>
                  <td>24/05/2024</td>
                  <td>8:00 am</td>
                  <td>6:00 pm</td>
                  <td>$1500</td>
                  <td>$500</td>
                  <td>$1000</td>
                </tr>
                <tr>
                  <td>25/05/2024</td>
                  <td>8:00 am</td>
                  <td>6:00 pm</td>
                  <td>$2000</td>
                  <td>$300</td>
                  <td>$1700</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>




      </div>
    </div>
  </div>
  <div></div>

</template>

<script>
import NuevaVenta from './NuevaVenta.vue';
export default {
  name: 'MovimientosApp',
  components: {
    NuevaVenta
  },
  data() {
    return {
      currentSection: 'transacciones',
    };
  },
  methods: {
    showSection(section) {
      this.currentSection = section;
      
    },
  },
};
</script>

<style scoped>
.container-fluid{
  width: 100%;
  height: 100%;
}

.modal {
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  border-bottom: 1px solid #ccc;
  
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
}

button:hover,
select:hover {
  background-color: rgba(110, 183, 226, 0.7);
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
  /* Centra el contenido si es necesario */
  max-width: 1200px;
  /* Establece un ancho máximo opcional */
}

.transaction-section,
.cierres-caja-section {
  margin-top: 20px;
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

.balances {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.balance,
.sales,
.expenses {
  flex: 1;
  text-align: center;
  padding: 10px;
  background-color: #e0f7fa;
  border-radius: 5px;
  margin: 0 10px;
}

.transactions,
.cierres {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.transactions th,
.transactions td,
.cierres th,
.cierres td {
  border: 1px solid #ddd;
  padding: 8px;
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

</style>
