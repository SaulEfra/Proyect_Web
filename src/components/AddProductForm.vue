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
                  <input v-model="productName" id="NameProduct" type="text" class="form-control">
                </div>
                <div class="mb-3">
                  <label for="categ" class="form-label">Cantidad de venta</label>
                  <select v-model="cantVent" id="categ" class="form-select" aria-label="Default select example">
                    <option v-for="cant in datoscant" :key="cant.IDCantidad">{{ cant.NombreCantidad }}</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="CostUni" class="form-label">Costo Unitario</label>
                  <input v-model.number="Costunit" id="CostUni" type="number" class="form-control">
                </div>
                <div class="mb-3">
                  <label for="preci" class="form-label">Precio</label>
                  <input v-model.number="price" id="preci" type="number" class="form-control">
                </div>
                
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="cantidad" class="form-label">Cantidad</label>
                  <input v-model.number="cantid" type="number" id="cantidad" name="cantidad" min="1" max="100" step="1" class="form-control">
                </div>
                <div class="mb-3">
                  <label for="categ" class="form-label">Categoría</label>
                  <select v-model="category" id="categ" class="form-select" aria-label="Default select example">
                    <option v-for="cat in datoscat" :key="cat.IDCatProd">{{ cat.NombreCategoria }}</option>
                  </select>
                </div>
                <div class="form-check">
                  <input class="form-check-input" v-model="Facturas" type="radio" name="exampleRadios" id="exampleRadios2" value="Factura">
                  <label class="form-check-label" for="exampleRadios2">
                    Factura
                  </label>
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

//se esta utilisando option api 
import axios from 'axios';

export default {
  name: 'AddProductForm',
  data() {
    return {
      productName: '',
      cantVent:'',
      Costunit: 0,
      cantid: 0,
      price: 0,
      category: '',
      description: '',
      selectfile: null,
      Facturas: '',

      datoscant: [],
      datoscat: [],

      idNeg: 1,
      idimg: 1
    };
  },
  mounted() {
    this.Cantidades();
    this.Categorias();
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
    /*
    async createProduct() {
      const formData = {
        selectfile:this.selectfile,
        productName:this.productName,
        //cantVent :this.cantVent,
        Costunit:this.Costunit,
        price:this.price,
        cantid:this.cantid,
        //category:this.category,
        Facturas:this.Facturas,
        description:this.description,
        idneg: this.idNeg,
        idimg: this.idimg

      };
      try {
            const response = await axios.post('http://localhost:3000/imagenes/single', formData);
            console.log('Respuesta del servidor:', response.data); 
            alert('producto creado con éxito');
            // como borrar los datos this.CantidadProduc = ""
            this.productName = "",
            this.Costunit = 0,
            this.unitCost = 0,
            this.price = 0,
            this.cantid = 0,
            this.Factura = "",
            this.description = ""
            
        } catch (error) {
            console.error('Error al crear el producto:', error);
            alert('Error al crear el producto: ' + error.message);
        }  
    }*/
    async createProduct() {
    const formData = new FormData();
    formData.append('Datos', this.selectfile);
    formData.append('productName', this.productName);
    formData.append('Costunit', this.Costunit);
    formData.append('price', this.price);
    formData.append('cantid', this.cantid);
    formData.append('Facturas', this.Facturas);
    formData.append('description', this.description);
    formData.append('idneg', this.idNeg);

    try {
        const response = await axios.post('http://localhost:3000/productosadd', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Respuesta del servidor:', response.data);
        alert('Producto creado con éxito');

        this.productName = "";
        this.Costunit = 0;
        this.price = 0;
        this.cantid = 0;
        this.Facturas = "";
        this.description = "";
        this.selectfile = null;
    } catch (error) {
        console.error('Error al crear el producto:', error);
        alert('Error al crear el producto: ' + error.message);
    }
}

  }
}
</script>
<style scoped>
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
