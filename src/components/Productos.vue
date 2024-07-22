<template>
  <div class="header">
    <h4 class="mb-4 text-center">Productos</h4>
  </div>
  <div class="shadow rounded contProduc">
    <div class="header-btn">
      <div class="row">
        <div class="col-lg-6">
          <input type="text" class="form-control inp-btn" placeholder="Buscar producto..." v-model="searchQuery">
        </div>
        <div class="col-lg-2">
          <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#agregarproducto">Agregar Producto</button>
        </div>
        <div class="col-lg-2">
          <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#crearcategoria">Crear Categoría</button>
        </div>
        <div class="col-lg-2">
          <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#crearcantidad">Crear cantidad</button>
        </div>
      </div>
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
            <AddProductForm @actuprod="Productos" />
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para actualizar Producto -->
    <div class="modal fade" id="actualizarproducto" tabindex="-1" aria-labelledby="actualizarproductoLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="agregarproductoLabel">Actualizar Producto</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ActProd :idparactuproduc="idparaact" />
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
            <form @submit.prevent="createCategoriaProd">
              <label for="Nuevcategoria" class="form-label">Nombre de la categoría</label>
              <input v-model="categoriaName" class="form-control mb-3" id="Nuevcategoria" type="text" placeholder="ejemplo: Artículos de escritura" required>
              <div class="text-end">
                <button class="btn btn-primary btn-lg " type="submit">Crear Categoría</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>


    <!-- Modal para Crear Cantidad -->
    <div class="modal fade" id="crearcantidad" tabindex="-1" aria-labelledby="crearcantidadlabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="crearcategoriaLabel">Crear Cantidad para los productos</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createCantidadProduct">
              <label for="Nuevcategoria" class="form-label">Nombre de la cantidad</label>
              <input v-model="CantidadProduc" class="form-control mb-3" id="Nuevcategoria" type="text" placeholder="ejemplo: Kilos" required>
              <div class="text-end">
                <button class="btn btn-primary btn-lg " type="submit">Crear Cantidad</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="movements">
      <div class="row">
        <div class="data-pro col-lg-6" v-for="dtsprodcoun in datosprodcount" :key="dtsprodcoun">
          Total de Productos: {{ dtsprodcoun.cantidadproduct }}
        </div>
        <div class="data-pro col-lg-6">Costo del Inventario: {{ inventoryCost }}</div>
      </div>
    </div>
  </div>
  <div class="karproducto">
    <CardProduct
      v-for="prod in datosprod"
      :key="prod.IDProducto"
      :title="prod.Nombre"
      :Cantidadprod="prod.CantidadExistencia"
      :descrip="prod.Descripcion"
      :imagen="prod.Datos"
      :presioventa="prod.PrecioVenta"
      :presioprod="prod.PrecioProduc"
      @elimin="eliminarProducto"
      :idprod="prod.IDProducto"
      @actu="actualiProductprueb"
    />
  </div>
</template>

<script>
import CardProduct from './CardProduct.vue';
import AddProductForm from './AddProductForm.vue';
import axios from 'axios';
import ActProd from './ActProducto.vue';

export default {
  name: 'ProductInventory',
  components: {
    AddProductForm,
    CardProduct,
    ActProd
  },
  data() {
    return {
      searchQuery: '',
      totalReferences: 0,
      inventoryCost: 50,
      categoriaName: '',
      CantidadProduc: '',
      datosprod: [],
      datosprodcount: [],
      datoselim: [],
      idparaact: [],
      categoriacreada: false
    };
  },
  mounted() {
    this.Productos();
    this.Productoscount();
    
  },
  
  methods: {
    async Productos() {
      try {
        const response = await axios.get('http://localhost:3000/Producto');
        this.datosprod = response.data.results;
        console.log(this.datosprod);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        alert('Error al obtener los productos');
      }
    },
    async createCategoriaProd() {
      const formData = {
        categoriaName: this.categoriaName
      };
      try {
        const response = await axios.post('http://localhost:3000/categorias', formData);
        console.log('Respuesta del servidor:', response.data); 
        alert('Categoría creada con éxito');
        this.categoriaName = "";
        this.categoriacreada = true;
      } catch (error) {
        console.error('Error al crear el producto:', error);
        //alert('Error al crear la categoría: ' + error.message);
      }
    },
    async createCantidadProduct() {
      const formData = {
        CantidadProduc: this.CantidadProduc
      };
      try {
        const response = await axios.post('http://localhost:3000/cantidadproduc', formData);
        console.log('Respuesta del servidor:', response.data); 
        alert('Cantidad creada con éxito');
        this.CantidadProduc = "";
        this.Cantidades();
      } catch (error) {
        console.error('Error al crear el producto:', error);
        //alert('Error al crear la cantidad: ' + error.message);
      }     
    },
    async Productoscount() {
      try {
        const response = await axios.get('http://localhost:3000/Productocont');
        this.datosprodcount = response.data.results; 
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        alert('Error al obtener los productos');
      }
    },
    async eliminarProducto(prop) {
      console.log(prop);
      try {
        axios.delete(`http://localhost:3000/productoselim/${prop}`)
          .then(response => {
            console.log(response.data);
            this.Productos();
          });
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        alert('Error al obtener los productos');
      }
    },
    async actualiProductprueb(prop) {
      console.log(prop);
      let datosprod = prop;
      this.idparaact = datosprod;
      alert(datosprod);
    },
   
  }
}
</script>

<style scoped>


.header {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  margin-top: 20px;
  
}
.movements{
  padding-bottom: 80px;

}
.data-pro{
  text-align: center;
  height: 50px;
  width: 500px;
  background-color: #D5E4FF;
  flex-direction: row;
  margin-left: 60px;
  padding: 10px;
  border-radius: 10px;
  
}

.btn{
  padding: 10px;
  font-size: 14px;
  border: 1px solid rgb(137, 149, 226);
  border-radius: 5px;
  background-color: #eff5ff;
  cursor: pointer;
  height: 50px;
  width: 150px;
  color: black;
  margin-left: 20px;
}


.btn:hover{
  background-color: #bdd6ff;
  color: white;
  border: 1px solid rgb(120, 134, 223);
}


/* aca empiezan mis estilos */ 
.btn-close{
  height: 50px;
  width: 50px;
}
.card{
  margin-top: 20px;
  margin-left: 50px;
}
.karproducto{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 20px
}
.header-btn{
  padding: 20px;
  padding-top: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.inp-btn{
  height: 50px;
}
</style>

