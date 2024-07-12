<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Cerrar Caja</h2>
      <div>
        <h3>Registros realizados</h3>
        <div>
          <button :class="{'active': tab === 'efectivo'}" @click="tab = 'efectivo'">Efectivo</button>
        </div>
        <div v-if="tab === 'efectivo'">
          <h4>Resumen de caja</h4>
          <p>Fecha y Hora: {{ fechaHora }}</p>
          <p>Monto Inicial: $ {{ montoInicial }}</p>
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
import axios from 'axios';

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    fechaHora: {
      type: String,
      default: ''
    },
    montoInicial: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tab: 'efectivo',
      efectivo: 0
    };
  },
  computed: {
    descuadre() {
      return this.montoInicial - this.efectivo;
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    confirmarCierre() {
      this.closeModal();
    },
    fetchData() {
      axios.get('http://localhost:3000/AbrirCaja')
        .then(response => {
          this.MontoInicial = response.data.montoInicial;
          this.Fecha = response.data.fechaHora;
        })
        .catch(error => {
          console.error('Error al obtener datos de caja:', error);
        });
    }
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        this.fetchData();
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
