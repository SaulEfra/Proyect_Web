<template>
  <div class="container mt-7">
    <div class="row justify-content-center">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="d-none">
              {{ props.idparactuproduc.id }}
            </div>
            <div class="mb-3">
              <label for="fileUpload" class="form-label">Selecciona una imagen para subir</label>
              <input type="file" class="form-control" id="fileUpload" accept="image/*" @change="onFileChange">
            </div>
            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="NameProduct" class="form-label">Nombre de producto</label>
                  <input v-model="props.idparactuproduc.nombre" id="NameProduct" type="text" class="form-control">
                </div>
                <div class="mb-3">
                  <label for="categ" class="form-label">Cantidad de venta</label>
                  <select v-model="cantVen" id="categ" class="form-select" aria-label="Default select example">
                    <option v-for="cant in datoscant" :key="cant.IDCantidad" :value="cant.IDCantidad">{{ cant.NombreCantidad }}</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="CostUni" class="form-label">Precio original</label>
                  <input v-model.number="props.idparactuproduc.presioprod" id="CostUni" type="number" min="0"
                    max="50000" step="any" class="form-control">
                </div>
                <div class="mb-3">
                  <label for="preci" class="form-label">Precio por unidad</label>
                  <input v-model.number="props.idparactuproduc.Presiovent" id="preci" type="number" min="0" max="50000"
                    step="any" class="form-control">
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="cantidad" class="form-label">Cantidad disponible</label>
                  <input v-model.number="props.idparactuproduc.cantid" type="number" id="cantidad" name="cantidad"
                    min="1" max="100000" step="1" class="form-control">
                </div>
                <div class="mb-3">
                  <label for="categ" class="form-label">Categoría</label>
                  <select v-model="category" id="categ" class="form-select" aria-label="Default select example">
                    <option v-for="cat in datoscat" :key="cat.IDCatProd" :value="cat.IDCatProd">{{ cat.NombreCategoria }}</option>
                  </select>
                </div>
                
                <div class="form-check">
                    <input class="form-check-input" v-model="props.idparactuproduc.Facturas" type="radio" name="exampleRadios"
                      id="exampleRadios1" :value="true">
                    <label class="form-check-label" for="exampleRadios1">
                      Factura
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" v-model="props.idparactuproduc.Facturas" type="radio" name="exampleRadios"
                      id="exampleRadios2" :value="false">
                    <label class="form-check-label" for="exampleRadios2">
                      No Factura
                    </label>
                  </div>
                
                <div class="mb-3">
                  <label for="Textarea1" class="form-label">Descripción</label>
                  <textarea v-model="props.idparactuproduc.Desc" class="form-control" id="Textarea1"
                    rows="3"></textarea>
                </div>
              </div>
            </div>
            <div class="text-center mt-4">
              <button @click="actualiProduct" class="btn btn-primary">Actualizar producto</button>
              <p class="d-none">{{ idparactuproduc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import Swal from 'sweetalert2'

export default {
  name: 'ActProd',
  data() {
    return {
      cantVen: '',
      Costunit: 0,
      pric: 0,
      canti: 0,
      Facturas: false,
      descriptio: '',
      datoscant: [],
      datoscat: [],
      idNeg: 1,
      selectfile: null,
      props: this.$props
    };
  },
  mounted() {
    this.Cantidades();
    this.Categorias();
  },
  props: {
    idparactuproduc: Object
  },
  methods: {
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
    onFileChange(event) {
      this.selectfile = event.target.files[0];
    },
    async actualiProduct() {
      const formData = new FormData();
      formData.append('Datos', this.selectfile);
      formData.append('productName', this.props.idparactuproduc.nombre);
      formData.append('Costunit', this.props.idparactuproduc.presioprod);
      formData.append('price', this.props.idparactuproduc.Presiovent);
      formData.append('cantid', this.props.idparactuproduc.cantid);
      formData.append('Factura', this.props.idparactuproduc.Facturas);
      formData.append('description', this.props.idparactuproduc.Desc);
      formData.append('idneg', this.idNeg);
      formData.append('idimg', this.props.idparactuproduc.id);  // Suponiendo que el id de la imagen es el id del producto

      try {
        const response = await axios.put(`http://localhost:3000/actualizarproducto/${this.props.idparactuproduc.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Respuesta del servidor:', response.data);
        //alert('Producto actualizado con éxito');
        this.$emit("mostrarprod");
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Producto actualizado con exito",
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        console.error('Error al actualizar el producto:', error);
        alert('Error al actualizar el producto: ' + error.message);
      }
    },
    resetForm() {
      this.selectfile = null;
      this.props.idparactuproduc.nombre = '';
      this.props.idparactuproduc.presioprod = 0;
      this.props.idparactuproduc.Presiovent = 0;
      this.props.idparactuproduc.cantid = 0;
      this.Factura = '';
      this.props.idparactuproduc.Desc = '';
    }
  }
}
</script>


<style scoped>

input{
  border: 1px solid rgba(0, 0, 0, 0.378);
}
select{
  border: 1px solid rgba(0, 0, 0, 0.378);
}
option{
  border: 1px solid rgba(0, 0, 0, 0.378);
}
textarea{
  border: 1px solid rgba(0, 0, 0, 0.378);
}
</style>