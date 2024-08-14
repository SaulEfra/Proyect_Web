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
              <div class="">
                <div class="row">
                  <div class="col-md-4 mb-4" v-for="product in filteredProducts" :key="product.IDProducto">
                    <div class="card product-card" @click="addProductToCart(product)">
                      <!-- Post-its de Agotado y Bajo Stock -->
                      <div class="post-it agotado" v-if="product.CantidadExistencia === 0">Agotado</div>
                      <div class="post-it bajo-stock" v-else-if="product.CantidadExistencia < 10">Bajo stock</div>

                      <img :src="`data:image/jpeg;base64,${product.Datos}`" class="card-img-top" alt="Product Image">
                      <div class="card-body">
                        <h5 class="card-title">{{ product.Nombre }}</h5>
                        <p class="card-text">{{ product.Descripcion }}</p>
                        <h6 class="card-price">{{ product.PrecioVenta }}</h6>
                      </div>
                    </div>
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
            class="btn btn-outline-secondary flex-fill">Credito<i class="bi bi-credit-card"></i></button>
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
import { jsPDF } from 'jspdf';
export default {
  name: 'NuevaVenta',
  data() {
    return {
      products: [],
      searchQuery: '',
      cart: [],
      currentSection: 'pagada',
      selectedPaymentMethod: 'Efectivo',
      IDNeg: 1,
      clientName: '',
      clientPhone: '',
      clientEmail: ''
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
    removeFromCart(product) {
      this.cart = this.cart.filter(item => item.IDProducto !== product.IDProducto);
    },
    clearCart() {
      this.cart = [];
    },
    prepareConfirmation() {
      // Esta función es para cualquier preparación necesaria antes de mostrar el offcanvas
    },
    showSection(section) {
      this.currentSection = section;
      if (section === 'credito') {
        this.selectPaymentMethod('Credito');
      } else {
        this.selectPaymentMethod('Efectivo');
      }
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

        // Obtener los datos del último registro
        const dataResponse = await axios.get('http://localhost:3000/ventaexit');
        const datosventaex = dataResponse.data;

        const confirmation = confirm('Venta exitosa. ¿Desea imprimir el ticket?');

        if (confirmation) {
          this.generatePDF({
            IDVenta: datosventaex.IDVenta,
            CostoTotal: datosventaex.CostoTotal,
            cart: this.cart,
            selectedPaymentMethod: this.selectedPaymentMethod
          });
        }

        this.clearCart();
      } catch (error) {
        console.error('Error al confirmar venta:', error);
      }
    },
    async generatePDF(ventaData) {
      const doc = new jsPDF();

      // Agregar el nombre de la empresa
      doc.setFontSize(16);
      doc.text('Business Inventory', 105, 10, { align: 'center' });

      // Agregar la fecha y hora actuales
      const currentDate = new Date();
      const dateStr = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
      doc.setFontSize(10);
      doc.text(`Fecha y Hora: ${dateStr}`, 105, 20, { align: 'center' });

      // Agregar una línea separadora
      doc.setLineWidth(0.5);
      doc.line(20, 25, 190, 25);

      // Agregar la información de la venta
      doc.setFontSize(12);
      doc.text(`ID Venta: ${ventaData.IDVenta}`, 20, 35);
      doc.text(`Método de Pago: ${ventaData.selectedPaymentMethod}`, 20, 45);

      // Crear la tabla de productos sin bordes
      doc.text('Productos:', 20, 60);
      const startY = 70;
      const rowHeight = 10;
      ventaData.cart.forEach((item, index) => {
        const yPosition = startY + (index * rowHeight);
        doc.text(`${index + 1}. ${item.Nombre}`, 20, yPosition);
        doc.text(`$${item.PrecioVenta}`, 150, yPosition, { align: 'right' });
        doc.text(`${item.Cantidad}x`, 100, yPosition, { align: 'center' });
        doc.text(`$${(item.PrecioVenta * item.Cantidad).toFixed(2)}`, 180, yPosition, { align: 'right' });
      });

      // Agregar una línea separadora antes del total
      const totalY = startY + (ventaData.cart.length * rowHeight) + 5;
      doc.line(20, totalY, 190, totalY);

      // Agregar el total de la venta
      doc.text(`Total: $${ventaData.CostoTotal}`, 180, totalY + 15, { align: 'right' });

      // Guardar el PDF con un nombre de archivo personalizado
      doc.save(`ticket_venta_${ventaData.IDVenta}.pdf`);
    }
  },

  mounted() {
    this.fetchProducts();
  }
};
</script>

<style scoped>
.card-producto {
  transition: transform 0.3s;
}

.card-producto:hover {
  transform: scale(1.05);
}

.post-it {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 60px;
  height: 60px;
  background-color: #ffeb3b;
  color: #000;
  font-weight: bold;
  text-align: center;
  line-height: 60px;
  transform: rotate(-15deg);
  z-index: 10;
}

.agotado {
  background-color: red;
  color: white;
}

.bajo-stock {
  background-color: orange;
  color: white;
}
</style>
