<template>
     <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">

            <div class="mb-3">
              <label for="fileUpload" class="form-label">Selecciona una imagen para subir</label>
              <input  type="file" class="form-control" id="fileUpload" accept="image/*" @change="onFileChange">
            </div>
            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="NameProduct" class="form-label">Nombre de producto</label>
                  <input v-model="productNam" id="NameProduct" type="text" class="form-control">
                </div>
                <div class="mb-3">
                  <label for="categ" class="form-label">Cantidad de venta</label>
                  <select v-model="cantVen" id="categ" class="form-select" aria-label="Default select example">
                    <option v-for="cant in datoscant" :key="cant.IDCantidad">{{ cant.NombreCantidad }}</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="CostUni" class="form-label">Costo Unitario</label>
                  <input v-model.number="Costunit" id="CostUni" type="number" class="form-control">
                </div>
                <div class="mb-3">
                  <label for="preci" class="form-label">Precio</label>
                  <input v-model.number="pric" id="preci" type="number" class="form-control">
                </div>
                
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="cantidad" class="form-label">Cantidad</label>
                  <input v-model.number="canti" type="number" id="cantidad" name="cantidad" min="1" max="100" step="1" class="form-control">
                </div>
                <div class="mb-3">
                  <label for="categ" class="form-label">Categoría</label>
                  <select v-model="category" id="categ" class="form-select" aria-label="Default select example">
                    <option v-for="cat in datoscat" :key="cat.IDCatProd">{{ cat.NombreCategoria }}</option>
                  </select>
                </div>
                <div class="form-check">
                  <input class="form-check-input" v-model="Factura" type="radio" name="exampleRadios" id="exampleRadios2" value="Factura">
                  <label class="form-check-label" for="exampleRadios2">
                    Factura
                  </label>
                </div>
                <div class="mb-3">
                  <label for="Textarea1" class="form-label">Descripción</label>
                  <textarea v-model="descriptio" class="form-control" id="Textarea1" rows="3"></textarea>
                </div>
              </div>
            </div>
            <div class="text-center mt-4">
              <button @click="actualiProduct" class="btn btn-primary">Actualizar producto</button>
              <p class=" d-none">{{ idparactuproduc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'ActProd',
    data(props) {
    return {
        
        productNam:'',
        cantVen:'',
        Costunit:0,
        pric:0,
        canti:0,
        Factura:'',
        descriptio:'',


        datoscant: [],
        datoscat: [],


        idNeg: 1,
        idimg: 1,

        props
        };
    },
    mounted() {
    this.Cantidades();
    this.Categorias();
    },
    props:{
      idparactuproduc:Number
    },
    methods:{
        async Cantidades() {
      try {
        const response = await axios.get('http://localhost:3000/cantidadproducDos');
        this.datoscant = response.data.results; 
      } catch (error) {
        console.error('Error al obtener las cantidades:', error);
        alert('Error al obtener las cantidades');
      }
    },

    async Categorias() {
      try {
        const response = await axios.get('http://localhost:3000/categoriaproducto');
        this.datoscat = response.data.results; 
      } catch (error) {
        console.error('Error al obtener las categorias:', error);
        alert('Error al obtener las categorias');
      }
    },

    async actualiProduct() {
        const formDatos = {
            productNam:this.productNam,
            //cantVen:this.cantVen,
            Costunit:this.Costunit,
            pric:this.pric,
            canti:this.canti,
            Factura:this.Factura,
            descriptio:this. descriptio,

            idneg: this.idNeg,
            idimg: this.idimg,

            identificadorprod: this.idparactuproduc

        };
        try {
            const response = await axios.put('http://localhost:3000/productosactualizacion', formDatos);
            console.log('Respuesta del servidor:', response.data); 
            alert('producto actualizado con éxito');
            this.productNam = "",
            this.Costunit = 0,
            this.pric = 0,
            this.canti = 0,
            this.Factura = "",
            this.descriptio = ""

        }catch (error) {
            console.error('Error al actualizar el producto:', error);
            alert('Error al actualizar el producto: ' + error.message);
        }  
    },
    async btnalert (){
      alert()
    }
    
    }

}
</script>

<style scoped>
  
</style>