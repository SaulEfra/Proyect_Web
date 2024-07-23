<template>
  <div class="container-fluid text-bg-light p-3">
      <div class="row">
          <div class="col-lg-12">
              <div class="row">
                  <!-- Navbar para búsqueda -->
                  <div class="col-lg-8 col-md-12 mb-4">
                      <div class="row nav">
                          <div class="col-lg-12">
                              <nav class="navbar navbar-expand-lg bg-body-tertiary nav2">
                                  <div class="container-fluid">
                                      <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                          <ul class="navbar-nav me-auto mb-2 col-lg-12">
                                              <form class="d-flex" @submit.prevent="searchProduct">
                                                  <input class="form-control me-2" v-model="searchQuery" type="search" placeholder="Buscar Producto" aria-label="Buscar">
                                                  <button class="btn btn-outline-success" type="submit" style="color: blue; border-color: blue;">Buscar</button>
                                              </form>
                                          </ul>
                                      </div>
                                  </div>
                              </nav>
                          </div>
                          <!-- Tarjetas de productos -->
                          <div class="col-lg-12 mt-3">
                              <div class="card card1" v-for="product in filteredProducts" :key="product.IDProducto" style="width: 100%;">
                                  <img :src="`data:image/jpeg;base64,${product.Datos}`" class="card-img-top" alt="Product Image" height="200px" width="100px" style="border-radius: 10px;">
                                  <div class="card-body">
                                      <h5 class="card-title">{{ product.Nombre }}</h5>
                                      <p class="card-text">{{ product.Descripcion }}</p>
                                      <h5>{{ product.PrecioVenta }}</h5>
                                      <button class="btn btn-primary" type="button" @click="addProductToCart(product)">Agregar Producto</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  <!-- Sección de Canasta -->
                  <div class="col-lg-4 col-md-12">
                      <div class="card canasta-card">
                          <div class="card-header d-flex justify-content-between align-items-center">
                              <h5 class="mb-0">Canasta</h5>
                              <button class="btn btn-secondary btn-sm" @click="clearCart">Vaciar</button>
                          </div>
                          <div class="card-body">
                              <div v-for="item in cart" :key="item.IDProducto" class="mb-3">
                                  <div class="d-flex justify-content-between align-items-center">
                                      <div>
                                          <h6>{{ item.Nombre }}</h6>
                                          <small>{{ item.Cantidad }} x {{ item.PrecioVenta }}</small>
                                      </div>
                                      <button class="btn btn-danger btn-sm" @click="removeFromCart(item)">Eliminar</button>
                                  </div>
                              </div>
                              <div class="form-group">
                                  <label for="total">Total</label>
                                  <input type="text" class="form-control" id="total" :value="totalPrice" readonly>
                              </div>
                              <button class="btn btn-primary mt-3" data-bs-toggle="offcanvas" href="#offcanvasRight" role="button" aria-controls="offcanvasRight">Confirmar Producto</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <!-- Offcanvas -->
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div class="offcanvas-header">
              <h5 id="offcanvasRightLabel">Confirmar Producto</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
              <h6>Productos en la canasta:</h6>
              <div v-for="item in cart" :key="item.IDProducto">
                  <p>{{ item.Nombre }} - {{ item.Cantidad }} x {{ item.PrecioVenta }}</p>
              </div>
              <p>Total: {{ totalPrice }}</p>
              <button class="btn btn-success" @click="confirmProduct">Confirmar</button>
          </div>
      </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'NuevaVenta',
  data() {
      return {
          products: [], // Array para almacenar los productos
          searchQuery: '', // Variable para almacenar la consulta de búsqueda
          cart: [] // Array para almacenar los productos en el carrito
      };
  },
  computed: {
      filteredProducts() {
          if (this.searchQuery.trim() === '') {
              return this.products;
          }
          return this.products.filter(product =>
              product.Nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
      },
      totalPrice() {
          return this.cart.reduce((total, item) => total + (item.PrecioVenta * item.Cantidad), 0).toFixed(2);
      }
  },
  methods: {
      async fetchProducts() {
          try {
              const response = await axios.get('http://localhost:3000/Producto'); // URL del endpoint
              this.products = response.data.results;
          } catch (error) {
              console.error('Error al obtener productos:', error);
          }
      },
      searchProduct() {
          // La búsqueda ya se maneja a través de la propiedad computada
      },
      addProductToCart(product) {
          const cartItem = this.cart.find(item => item.IDProducto === product.IDProducto);
          if (cartItem) {
              cartItem.Cantidad++;
          } else {
              this.cart.push({ ...product, Cantidad: 1 });
          }
      },
      removeFromCart(product) {
          this.cart = this.cart.filter(item => item.IDProducto !== product.IDProducto);
      },
      clearCart() {
          this.cart = [];
      },
      async confirmProduct() {
          try {
              // Aquí se llama al endpoint para confirmar la venta
              const response = await axios.post('http://localhost:3000/confirmarVenta', this.cart);
              console.log('Venta confirmada:', response.data);
              this.clearCart(); // Vaciar el carrito después de confirmar la venta
          } catch (error) {
              console.error('Error al confirmar la venta:', error);
          }
      }
  },
  created() {
      this.fetchProducts(); // Obtener productos cuando el componente se crea
  }
};
</script>
<style scoped>
.nav2 {
  margin-bottom: 20px;
}
.card1 {
  margin-bottom: 20px;
}
.card-img-top {
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}
.canasta-card {
  width: 100%;
}
</style>
