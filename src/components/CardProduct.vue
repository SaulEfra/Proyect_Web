<template>
    <div class="card" style="width: 18rem;">
      <img src="" class="card-img-top" alt="">
      <div class="card-body">
        <p class="card-text d-none">{{ idprod }}</p>
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">Precio: {{ presioventa }} $</p>
        <p class="card-text">Cantidad: {{ Cantidadprod }}</p>
        <p class="card-text">Descripcion: {{ descrip }}</p>
        <div>
            <button class="btn-card-elim" @click="usarprop">Eliminar</button>
            <button class="btn-card" >Actualizar</button>
            
        </div>
        
      </div>
    </div>
</template>

<script>
//import { data } from 'jquery';

//import { type } from 'jquery';
//import ModalProducactinfo from './ModalProducactinfo.vue';

//import axios from 'axios';

export default {
    name:'CardProduct',
    components: {
       // ModalProducactinfo
    },
    props:{
        title:String,
        Cantidadprod:Number,
        descrip:String,
        presioventa:Number,
        presioprod:Number,
        idprod: Number
    },
    //emits:[elimin],
    data(props, ) {
      return {
        props
        };
    },
    
    methods:{
      async eliminarproducto (prop){
        this.$emit('elimin',this.idprod)
        console.log("el prop es :" , prop)
      },
      async usarprop(){
        this.eliminarproducto(this.idprod)
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