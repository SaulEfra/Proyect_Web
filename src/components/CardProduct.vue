<template>
    <div class="card" style="width: 18rem;">
      
      <div class="card-body">
        <img :src="imageUrl" class="card-img-top" alt="Product Image">
        <p class="card-text d-none">{{ idprod }}</p>
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">Precio: {{ presioventa }} $</p>
        <p class="card-text">Cantidad: {{ Cantidadprod }}</p>
        <p class="card-text">Descripcion: {{ descrip }}</p>
        <div>
            <button class="btn-card-elim" @click="usarprop">Eliminar</button>
            <button type="button" class="btn-card " data-bs-toggle="modal" data-bs-target="#actualizarproducto" @click="usarpropdos">Actualizar Producto</button> 
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CardProduct',
    props: {
        title: String,
        Cantidadprod: Number,
        descrip: String,
        presioventa: Number,
        presioprod: Number,
        idprod: Number,
        imagen: String 
    },
    emits: ["elimin", "actu"],
    computed: {
        imageUrl() {
            return `data:image/jpeg;base64,${this.imagen}`; 
        }
    },
    methods: {
      async usarprop() {
        this.$emit("elimin", this.idprod);
      },
      async usarpropdos() {
        this.$emit("actu", this.idprod);
      }
    }
  }
  </script>
  
  
  
  <style scoped>
      .btn-card{
          border: 0px solid ;
          height: 40px;
          border-radius: 5px;
          margin: 5px;
          background-color: #d5e4ff;
      }
     
      .btn-card:hover{
          background-color: #85a6ff;
          color: white;
      }
  
      .btn-card-elim{
          border: 0px solid ;
          height: 40px;
          border-radius: 5px;
          margin: 5px;
          background-color: #ffdddd;
      }
     
      .btn-card-elim:hover{
          background-color:#ff9494;
          color: white;
      }
      .card-body{
          text-align: center;
          border: 1px solid  rgba(232, 186, 207, 0.7);
          border-radius: 5px;
      }
  
  </style>