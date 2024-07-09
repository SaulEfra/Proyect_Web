<template>
    <div v-if="isVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Cerrar Caja</h2>
        <div>
          <h3>Registros realizados</h3>
          <div>
            <button :class="{'active': tab === 'efectivo'}" @click="tab = 'efectivo'">Efectivo</button>
            <button :class="{'active': tab === 'digitales'}" @click="tab = 'digitales'">Digitales</button>
          </div>
          <div v-if="tab === 'efectivo'">
            <h4>Resumen de caja</h4>
            <p>Dinero base: $ {{ dineroBase }}</p>
            <p>Ventas: $ {{ ventas }}</p>
            <p>Abonos: $ {{ abonos }}</p>
            <p>Gastos: $ {{ gastos }}</p>
            <h4>Balance total: $ {{ balanceTotal }}</h4>
          </div>
        </div>
        <div>
          <label for="cash">Cuánto dinero tienes en efectivo?</label>
          <input type="number" v-model="efectivo" />
        </div>
        <div v-if="descuadre !== 0" class="alert">
          Tienes un descuadre. Te faltan $ {{ descuadre }}
        </div>
        <button @click="confirmarCierre">Confirmar cierre</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true
      },
      dineroBase: {
        type: Number,
        required: true
      },
      fechaHora: {
        type: String,
        default: ''
      },
      ventas: {
        type: Number,
        default: 6000
      },
      abonos: {
        type: Number,
        default: 0
      },
      gastos: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        tab: 'efectivo',
        efectivo: 100000,
        descuadre: 0
      };
    },
    computed: {
      balanceTotal() {
        return this.dineroBase + this.ventas - this.abonos - this.gastos;
      },
      Descuadre() {
        return this.balanceTotal - this.efectivo;
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      confirmarCierre() {
        if (this.descuadre === 0) {
          alert("Cierre confirmado correctamente");
          this.closeModal();
        } else {
          alert("Hay un descuadre, no se puede confirmar el cierre");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
  }
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  button.active {
    background-color: #ccc;
  }
  .alert {
    color: red;
  }
  </style>
  