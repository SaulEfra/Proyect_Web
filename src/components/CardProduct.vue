<template>
  <div class="card" style="width: 18rem;">
    
    <div class="card-body">
      <img :src="imageUrl" class="card-img-top" alt="Product Image" height="200px" width="100px" style="border-radius: 10px;">
      
      <p class="card-text d-none">{{ idprod }}</p>
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">Precio: ${{ presioventa }}</p>
      <p class="card-text">Cantidad: {{ Cantidadprod }}</p>
      <p class="card-text">Descripcion: {{ descrip }}</p>
      <p class="card-text">Categoria: {{ categoriatipo }}</p>
      <p class="card-text">Cantidad: {{ cantidtipo }} </p>
      
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
      imagen: String,
      factu: String,
      cantidtipo: String,
      categoriatipo:String
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
      this.$emit("actu",{id: this.idprod, Categoria:this.categoriatipo, CantidadVenta: this.cantidtipo, Facturas : this.factu , nombre: this.title, cantid : this.Cantidadprod, Desc : this.descrip, Presiovent : this.presioventa, presioprod :  this.presioprod, imagen: this.imagen}  );
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