<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-12">
        <div class="card">
          
          <div class="card-body">
            <div class="mb-3">
              <label for="fileUpload" class="form-label">Selecciona una imagen para subir</label>
              <input type="file" class="form-control" id="fileUpload" accept="image/*" @change="onFileChange">
            </div>
            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="NameProduct" class="form-label">Nombre de producto</label>
                  <input v-model="productName" id="NameProduct" type="text" class="form-control">
                </div>
                <div class="mb-3">
                  <label for="CostUni" class="form-label">Costo Unitario</label>
                  <input v-model.number="unitCost" id="CostUni" type="number" class="form-control">
                </div>
                <div class="mb-3">
                  <label for="cantidad" class="form-label">Cantidad</label>
                  <input v-model.number="quantity" type="number" id="cantidad" name="cantidad" min="1" max="100" step="1" class="form-control">
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="preci" class="form-label">Precio</label>
                  <input v-model.number="price" id="preci" type="number" class="form-control">
                </div>
                <div class="mb-3">
                  <label for="categ" class="form-label">Categoría</label>
                  <select v-model="category" id="categ" class="form-select" aria-label="Default select example">
                    <option disabled selected>Selecciona una categoría</option>
                    <option value="1">Categoría 1</option>
                    <option value="2">Categoría 2</option>
                    <option value="3">Categoría 3</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="Textarea1" class="form-label">Descripción</label>
                  <textarea v-model="description" class="form-control" id="Textarea1" rows="3"></textarea>
                </div>
              </div>
            </div>
            <div class="text-center mt-4">
              <button @click="createProduct" class="btn btn-primary">Crear producto</button>
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
  name: 'AddProductForm',
  data() {
      return {
          productName: '',
          unitCost: null,
          quantity: 1,
          price: null,
          category: '',
          description: '',
          selectedFile: null
      };
  },
  methods: {
  async createProduct() {
      const formData = {
          productName: this.productName,
          unitCost: this.unitCost,
          quantity: this.quantity,
          price: this.price,
          category: this.category,
          description: this.description
      };

      try {
          const response = await axios.post('http://localhost:3000/items', formData);
          console.log('Respuesta del servidor:', response.data); // Usar la respuesta
          alert('Producto creado con éxito');
          // Puedes agregar lógica adicional aquí, como limpiar el formulario
      } catch (error) {
          console.error('Error al crear el producto:', error);
          alert('Error al crear el producto: ' + error.message);
      }
  }
}

}
</script>

<style>
.contenid {
  padding-left: 40px;
  padding-right: 60px;

  border-left: 1px solid black;

}

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

label {
  margin-top: 5px;
  margin-bottom: 5px;
}

.btmcrear {
  text-align: end;
}


.perfiles {
  margin-top: 50px;
  margin-left: 10px;

}

.config {
  margin-top: 30px;
  margin-bottom: 50px;


}



.produc {
  margin-top: 100px;
  margin-bottom: 100px;
}

a {
  text-decoration: none;
  color: black;
  font-size: 18px;
  margin-left: 5px;
  margin-right: 5px;
}

i {
  margin-left: 10px;
}

h5 {
  margin-left: 5px;
}

.gest a {
  margin-left: 20px;
}
</style>
