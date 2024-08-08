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
                          <input class="form-control me-2" v-model="searchQuery" type="search"
                            placeholder="Buscar Producto" aria-label="Buscar">
                          <button class="btn btn-outline-success" type="submit"
                            style="color: blue; border-color: blue;">Buscar</button>
                        </form>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
              <!-- Tarjetas de productos -->
              <div class="col-lg-12 mt-3">
                <div class="card card1" v-for="product in filteredProducts" :key="product.IDProducto"
                  style="width: 100%;">
                  <img :src="`data:image/jpeg;base64,${product.Datos}`" class="card-img-top" alt="Product Image"
                    height="200px" width="100px" style="border-radius: 10px;">
                  <div class="card-body">
                    <h5 class="card-title">{{ product.Nombre }}</h5>
                    <p class="card-text">{{ product.Descripcion }}</p>
                    <h5>{{ product.PrecioVenta }}</h5>
                    <button class="btn btn-primary" type="button" @click="addProductToCart(product)">Agregar
                      Producto</button>
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
                      <div>
                        <button class="btn btn-sm btn-secondary" @click="updateQuantity(item, -1)"
                          :disabled="item.Cantidad <= 1">-</button>
                        <button class="btn btn-sm btn-secondary" @click="updateQuantity(item, 1)">+</button>
                      </div>
                    </div>
                    <button class="btn btn-danger btn-sm" @click="removeFromCart(item)">Eliminar</button>
                  </div>
                </div>
                <div class="form-group">
                  <label for="total">Total</label>
                  <input type="text" class="form-control" id="total" :value="totalPrice" readonly>
                </div>
                <button class="btn btn-primary mt-3" data-bs-toggle="offcanvas" href="#offcanvasRight" role="button"
                  aria-controls="offcanvasRight" @click="prepareConfirmation" :disabled="isCartEmpty">Confirmar
                  Producto</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Offcanvas -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">Confirmación de la venta</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">


        <div class="d-flex mb-3">
          <button @click="showSection('pagada')" :class="{ active: currentSection === 'pagada' }"
            class="btn btn-outline-secondary flex-fill me-2">Efectivo<i class="bi bi-cash"></i></button>
          <button @click="showSection('credito')" :class="{ active: currentSection === 'credito' }"
            class="btn btn-outline-secondary flex-fill">Tarjeta<i class="bi bi-credit-card"></i></button>
        </div>
        <div v-if="currentSection === 'credito'" class="mb-3">
          <label for="clienteNombre">Nombre del Cliente</label>
          <input type="text" id="clienteNombre" v-model="clientName" class="form-control" />
          <label for="clienteTelefono">Teléfono del Cliente</label>
          <input type="text" id="clienteTelefono" v-model="clientPhone" class="form-control" />

        </div>
        <div class="mb-3">
          <button type="button" class="btn btn-primary" @click="confirmProduct">Confirmar venta</button>
        </div>
        <div class="total-section mt-3">
          <h5>Total de la venta: {{ totalPrice }}</h5>
        </div>
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
      cart: [], // Array para almacenar los productos en el carrito
      currentSection: 'transacciones', // Define la sección inicial
      selectedPaymentMethod: '', // Variable para almacenar el método de pago seleccionado
      ventaNombre: '', // Variable para almacenar el nombre de la venta
      ventaFecha: '', // Variable para almacenar la fecha de la venta
      clienteNombre: '' // Variable para almacenar el nombre del cliente
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
    },
    isCartEmpty() {
      return this.cart.length === 0;
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
    /*addProductToCart(product) {
      const cartItem = this.cart.find(item => item.IDProducto === product.IDProducto);
      if (cartItem) {
        cartItem.Cantidad++;
      } else {
        this.cart.push({ ...product, Cantidad: 1 });
      }
    },*/
    removeFromCart(product) {
      this.cart = this.cart.filter(item => item.IDProducto !== product.IDProducto);
    },
    clearCart() {
      this.cart = [];
    },
    prepareConfirmation() {
      // Esta función es para cualquier preparación necesaria antes de mostrar el offcanvas
    },
    /*
    async confirmProduct() {
      try {
        // Aquí se llama al endpoint para confirmar la venta
        const response = await axios.post('http://localhost:3000/confirmarVenta', {
          cart: this.cart,
          total: this.totalPrice,
          paymentMethod: this.selectedPaymentMethod,
          ventaNombre: this.ventaNombre,
          ventaFecha: this.ventaFecha,
          clienteNombre: this.clienteNombre
        });
        console.log('Venta confirmada:', response.data);
        this.clearCart(); // Vaciar la canasta después de confirmar la venta
      } catch (error) {
        console.error('Error al confirmar venta:', error);
      }
    },
    /*
    updateQuantity(product, amount) {
      const cartItem = this.cart.find(item => item.IDProducto === product.IDProducto);
      if (cartItem) {
        cartItem.Cantidad += amount;
        if (cartItem.Cantidad <= 0) {
          this.removeFromCart(cartItem);
        }
      }
    },*/
    showSection(section) {
      this.currentSection = section;
    },
    selectPaymentMethod(method) {
      this.selectedPaymentMethod = method;
    },
    addProductToCart(product) {
      if (product.CantidadExistencia <= 0) {
        alert('No se puede agregar el producto. La cantidad es 0.');
        return;
      }

      const cartItem = this.cart.find(item => item.IDProducto === product.IDProducto);
      if (cartItem) {
        if (cartItem.Cantidad < product.CantidadExistencia) {
          cartItem.Cantidad++;
        } else {
          alert('No se puede agregar más cantidad del producto. Cantidad máxima alcanzada.');
        }
      } else {
        this.cart.push({ ...product, Cantidad: 1 });
      }
    },
    updateQuantity(product, amount) {
      const cartItem = this.cart.find(item => item.IDProducto === product.IDProducto);
      if (cartItem) {
        cartItem.Cantidad += amount;
        if (cartItem.Cantidad <= 0) {
          this.removeFromCart(cartItem);
        } else if (cartItem.Cantidad > product.CantidadExistencia) {
          alert('No se puede agregar más cantidad del producto. Cantidad máxima alcanzada.');
          cartItem.Cantidad = product.CantidadExistencia;
        }
      }
    },
    async confirmProduct() {
      try {
        const saleData = {
          total: this.totalPrice,
          cart: this.cart,
          clientName: this.clientName,
          clientPhone: this.clientPhone,
          selectedPaymentMethod: this.selectedPaymentMethod,
          IDNeg: this.IDNeg
        };
        const response = await axios.post('http://localhost:3000/confirmventa', saleData);

        console.log('Venta confirmada:', response.data);

        const dataResponse = await axios.get('http://localhost:3000/ventaexit');
        const datosventaex = dataResponse.data;
        alert(`Venta Exitosa:
        ID Venta: ${datosventaex.IDVenta}
        Total: ${datosventaex.CostoTotal}
        ID Negocio: ${datosventaex.IDNegocio}`);
        this.clearCart();

      } catch (error) {
        console.error('Error al confirmar venta:', error);
      }
    }
  },
  mounted() {
    this.fetchProducts(); // Obtener los productos cuando se monta el componente
  }
};
</script>


<style scoped>
.card1 {
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.card1 img {
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.canasta-card {
  width: 100%;
}

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

button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
</style>