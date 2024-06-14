<template>
  <div class="container mt-5">
    <h1>Productos</h1>
    <div class="header">
      <input type="text" class="form-control" placeholder="Buscar producto..." v-model="searchQuery">

      

      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#agregarproducto">Agregar Producto</button>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#crearproducto">Crear Producto</button>

      <!-- Modal para Agregar Producto -->
      <div class="modal fade" id="agregarproducto" tabindex="-1" aria-labelledby="agregarproductoLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="agregarproductoLabel">Agregar Producto</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <AddProductForm />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" @click="createProduct">Guardar cambios</button>
            </div>
          </div>
        </div>
      </div>
    </div>











      

    </div>
    <div class="movements">
      <div class="balances">
        <div class="balance">Total de referencias: {{ totalReferences }}</div>
        <div class="inventory-cost">Costo del Inventario: {{ inventoryCost }}</div>
      </div>
      <div class="text-center no-products" v-if="totalReferences === 0">
        <p>No tienes productos en tu inventario</p>
        <button class="btn btn-outline-primary">Agregar manualmente</button>
      </div>
      <div class="product-table" v-else>
        <table>
          <thead>
            <tr>
              <th>Nombre del Producto</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <!-- Aquí se agregarían las filas de productos dinámicamente -->
            <tr>
              <td>Producto 1</td>
              <td>$10.00</td>
              <td>Categoría 1</td>
              <td>5</td>
              <td>
                <button class="btn btn-warning btn-sm">Editar</button>
                <button class="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  
</template>

<script>
import AddProductForm from './AddProductForm.vue';

export default {
  name: 'ProductInventory',
  components: {
    AddProductForm
  },
  data() {
    return {
      searchQuery: '',
      totalReferences: 0,
      inventoryCost: 50
    };
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}

.container {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #c2eff5b5;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}

button,
select {
  padding: 10px 20px;
  font-size: 14px;
  border: 1px solid #e0c8c872;
  border-radius: 5px;
  background-color: #eaeff9c1;
  cursor: pointer;
}

button:hover,
select:hover {
  background-color: #e6e6e6;
}

.movements {
  padding: 20px;
}

.balances {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.balance,
.inventory-cost {
  flex: 1;
  text-align: center;
  padding: 10px;
  background-color: #e0f7fa;
  border-radius: 5px;
  margin: 0 10px;
}

.no-products p {
  margin-top: 2rem;
  font-size: 1.2rem;
}

.no-products button {
  margin-top: 1rem;
}

.product-table table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.product-table th,
.product-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.product-table th {
  background-color: #f2f2f2;
}

.product-table tbody tr:hover {
  background-color: #f1f1f1;
}

@media (max-width: 768px) {

  .header,
  .balances {
    flex-direction: column;
    align-items: flex-start;
  }

  .header input,
  .header button,
  .balances .balance,
  .balances .inventory-cost {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
