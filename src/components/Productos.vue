<template>

<div class="header">
      <h4 class="mb-4 text-center">Productos</h4>
    </div>
  <div class="shadow rounded bg-white contProduc">
        
    <div class=" mb-4 d-flex justify-content-between align-items-center">
      <input type="text" class="form-control me-2" placeholder="Buscar producto..." v-model="searchQuery">
      
      <br>
        <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#agregarproducto">Agregar Producto</button>
        
        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#crearcategoria">Crear Categoría</button>
      
    </div>

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
        </div>
      </div>
    </div>

    <!-- Modal para Crear Categoría -->
    <div class="modal fade" id="crearcategoria" tabindex="-1" aria-labelledby="crearcategoriaLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="crearcategoriaLabel">Crear Categoría</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <label for="Nuevcategoria" class="form-label">Nombre de la categoría</label>
            <input v-model="categoriaName" class="form-control mb-3" id="Nuevcategoria" type="text">
            <div class="text-end">
              <button class="btn btn-primary btn-lg " @click="createCategoriaProd">Crear Categoría</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="movements mt-4">
      <div class="balances d-flex justify-content-between mb-4">
        <div class="balance p-3 bg-light rounded shadow-sm">Total de Productos: {{ totalReferences }}</div>
        <div class="inventory-cost p-3 bg-light rounded shadow-sm">Costo del Inventario: {{ inventoryCost }}</div>
      </div>
      <div class="text-center no-products" v-if="totalReferences === 0">
        <p>No tienes productos en tu inventario</p>
      </div>
      <div class="product-table" v-else>
        <table class="table table-striped table-hover">
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
    
  </div>
</template>

<script>
import AddProductForm from './AddProductForm.vue';
import axios from 'axios';

export default {
  name: 'ProductInventory',
  components: {
    AddProductForm,
  },
  data() {
    return {
      searchQuery: '',
      totalReferences: 0,
      inventoryCost: 50,
      categoriaName: '',

    };
  },
  methods: {
    async createCategoriaProd() {
      const formData = {
        categoriaName: this.categoriaName,
        
      };
      try {
            const response = await axios.post('http://localhost:3000/categorias', formData);
            console.log('Respuesta del servidor:', response.data); 
            alert('Producto creado con éxito');
        } catch (error) {
            console.error('Error al crear el producto:', error);
            alert('Error al crear la categoria: ' + error.message);
        }
    }
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  
}

.header {
  display: flex;
  
  align-items: center;
  padding: 4px;
  border-bottom: 1px solid #ccc;
  
}



button,
select {
  padding: 10px 10px;
  font-size: 14px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: rgba(166, 210, 235, 0.7);
  cursor: pointer;
  height: 40px;
  width: 200px;
  color: black;
}


button:hover,
select:hover {
  background-color: rgba(110, 183, 226, 0.7);
  color: black;
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

.text-end {
  text-align: end;
}
.contProduc{
  padding: 80px
}
</style>

