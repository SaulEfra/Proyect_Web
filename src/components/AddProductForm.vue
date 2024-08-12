<template>
  <div class="container mt-7">
    <div class="row justify-content-center">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="createProduct">
              <div class="mb-3">
                <label for="fileUpload" class="form-label">Selecciona una imagen para subir</label>
                <input type="file" required class="form-control" id="fileUpload" accept="image/*"
                  @change="onFileChange">
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <div class="mb-3">
                    <label for="NameProduct" class="form-label">Nombre de producto</label>
                    <input v-model="productName" id="NameProduct" type="text" required class="form-control">
                  </div>
                  <div class="mb-3">
                    <label for="categ" class="form-label">Cantidad de venta</label>
                    <select v-model="cantVent" id="categ" required class="form-select"
                      aria-label="Default select example">
                      <option v-for="cant in datoscant" :key="cant.IDCantidad">{{ cant.NombreCantidad }}</option>
                    </select>

                    <a class="btn btn-outline-dark" data-bs-toggle="collapse" href="#collapseExample" role="button"
                      aria-expanded="false" aria-controls="collapseExample">
                      Agregar cantidad +
                    </a>

                    <div class="collapse forcant" id="collapseExample">
                      <div class="card card-body">
                        <form @submit.prevent="createCantidadProduct">
                          <label for="Nuevcategoria" class="form-label">Nombre de la cantidad</label>
                          <input v-model="CantidadProduc" class="form-control mb-1" id="Nuevcategoria" type="text"
                            placeholder="ejemplo: Kilos" required>
                          <div class="text-fist">
                            <button class="btn btn-outline-primary btn-sm " type="submit">Crear Cantidad</button>
                          </div>
                        </form>
                      </div>
                    </div>

                  </div>
                  <div class="mb-3">
                    <label for="CostUni" class="form-label">Precio original</label>
                    <input v-model.number="Costunit" id="CostUni" type="number" min="0" max="50000" step="any" required
                      class="form-control">
                  </div>
                  <div class="mb-3">
                    <label for="preci" class="form-label">Precio por unidad</label>
                    <input v-model.number="price" id="preci" type="number" min="0" max="50000" step="any" required
                      class="form-control">
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="mb-3">
                    <label for="cantidad" class="form-label">Cantidad Disponible</label>
                    <input v-model.number="cantid" type="number" id="cantidad" name="cantidad" min="1" max="100000"
                      step="1" required class="form-control">
                  </div>
                  <div class="mb-3">
                    <label for="categ" class="form-label">Categoría</label>
                    <select v-model="category" id="categ" required class="form-select"
                      aria-label="Default select example">
                      <option v-for="cat in datoscat" :key="cat.IDCatProd">{{ cat.NombreCategoria }}</option>
                    </select>
                    <button class="btn btn-outline-dark" type="button" data-bs-toggle="collapse"
                      data-bs-target="#multiCollapseExample2" aria-expanded="false"
                      aria-controls="multiCollapseExample2">Agregar categoria +</button>
                    <div class="">
                      <div class="collapse multi-collapse" id="multiCollapseExample2">
                        <div class="card card-body">

                          <form @submit.prevent="createCategoriaProd">
                            <label for="Nuevcategoria" class="form-label">Nombre de la categoría</label>
                            <input v-model="categoriaName" class="form-control mb-1" id="Nuevcategoria" type="text"
                              placeholder="ejemplo: Artículos de escritura" required>
                            <div class="text-first">
                              <button class="btn btn-outline-primary btn-sm" type="submit">Crear Categoría</button>
                            </div>
                          </form>

                        </div>
                      </div>
                    </div>


                  </div>
                  <div class="form-check">
                    <input class="form-check-input" v-model="Facturas" type="radio" name="exampleRadios"
                      id="exampleRadios1" :value="true">
                    <label class="form-check-label" for="exampleRadios1">
                      Factura
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" v-model="Facturas" type="radio" name="exampleRadios"
                      id="exampleRadios2" :value="false">
                    <label class="form-check-label" for="exampleRadios2">
                      No Factura
                    </label>
                  </div>

                  <div class="mb-3">
                    <label for="Textarea1" class="form-label">Descripción</label>
                    <textarea v-model="description" required class="form-control" id="Textarea1" rows="3"></textarea>
                  </div>
                </div>
              </div>
              <div class="text-center mt-4">
                <button type="submit" class="btn btn-primary">Crear producto</button>
              </div>
            </form>
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
  name: 'AddProductForm',

  data() {
    return {
      productName: '',
      cantVent: '',
      Costunit: 0,
      cantid: 0,
      price: 0,
      category: '',
      description: '',
      selectfile: null,
      Facturas: false,

      datoscant: [],
      datoscat: [],

      idNeg: 1,

      categoriaName: '',
      CantidadProduc: '',
    };
  },
  mounted() {
    this.Cantidades();
    this.Categorias();
  },

  methods: {
    async createCategoriaProd() {
      const formData = {
        categoriaName: this.categoriaName
      };
      try {
        const response = await axios.post('http://localhost:3000/categorias', formData);
        console.log('Respuesta del servidor:', response.data);
        //alert('Categoría creada con éxito');
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Categoria creada con exito",
          showConfirmButton: false,
          timer: 1500
        });
        this.categoriaName = "";
        this.categoriacreada = true;
        this.Categorias()
      } catch (error) {
        console.error('Error al crear el producto:', error);
        //alert('Error al crear la categoría: ' + error.message);
      }
    },
    async createCantidadProduct() {
      const formData = {
        CantidadProduc: this.CantidadProduc
      };
      try {
        const response = await axios.post('http://localhost:3000/cantidadproduc', formData);
        console.log('Respuesta del servidor:', response.data);
        //alert('Cantidad creada con éxito');
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Cantidad creada con exito",
          showConfirmButton: false,
          timer: 1500
        });
        this.CantidadProduc = "";
        this.Cantidades();
      } catch (error) {
        console.error('Error al crear el producto:', error);
        //alert('Error al crear la cantidad: ' + error.message);
      }
    },
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

    async createProduct() {
      const formData = new FormData();
      formData.append('Datos', this.selectfile);
      formData.append('productName', this.productName);
      formData.append('cantVent', this.cantVent);
      formData.append('Costunit', this.Costunit);
      formData.append('price', this.price);
      formData.append('cantid', this.cantid);
      formData.append('category', this.category);
      formData.append('Facturas', this.Facturas);
      formData.append('description', this.description);
      formData.append('idneg', this.idNeg);

      try {
        const response = await axios.post('http://localhost:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Respuesta del servidor:', response.data);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Producto creado con exito",
          showConfirmButton: false,
          timer: 1500
        });
        //alert('Producto creado con éxito');

        this.productName = "";
        this.cantVent = "";
        this.Costunit = 0;
        this.price = 0;
        this.cantid = 0;
        this.category = "";
        this.Facturas = false;
        this.description = "";
        this.selectfile = null;

        this.$emit("actuprod")
        this.$emit("actuprecio")
        this.$emit("actutotalprod")
      } catch (error) {
        console.error('Error al crear el producto:', error);
        alert('Error al crear el producto: ' + error.message);
      }
    }
  }
}
</script>

<style scoped>
.titul {
  margin-top: 40px;
  border-bottom: 1px solid black;
  margin-bottom: 40px;
}

.tituldos {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 50px;
  font-size: 30px;
}

input {
  border: 1px solid rgba(0, 0, 0, 0.378);
}

select {
  border: 1px solid rgba(0, 0, 0, 0.378);
}

option {
  border: 1px solid rgba(0, 0, 0, 0.378);
}

textarea {
  border: 1px solid rgba(0, 0, 0, 0.378);
}
</style>