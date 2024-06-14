<template>
    <div class="row">
        <div class="col-lg-10 contenid">
            <div class="row">
                <div class="col-lg-12 titul">
                    <h1>Agregar Producto</h1>
                </div>
                <div class="col-lg-6 imgCarg">
                    <label for="fileUpload">Selecciona una imagen para subir</label>
                    <input type="file" class="form-control-file" id="fileUpload" accept="image/*"
                        @change="onFileChange">
                </div>
                <div class="col-lg-6 btmcrear">
                    <button @click="createProduct">Crear producto</button>
                </div>
                <div class="col-lg-12 tituldos">
                    <p>Tipo de negocio</p>
                </div>
                <div class="col-lg-6">
                    <label for="NameProduct">Nombre de producto</label>
                    <br>
                    <input v-model="productName" id="NameProduct" type="text" class="form-control">
                    <br>
                    <label for="CostUni">Costo Unitario</label>
                    <br>
                    <input v-model.number="unitCost" id="CostUni" type="number" class="form-control">
                    <br>
                    <label for="cantidad">Cantidad:</label>
                    <br>
                    <input v-model.number="quantity" type="number" id="cantidad" name="cantidad" min="1" max="100"
                        step="1">
                </div>
                <div class="col-lg-6">
                    <label for="preci">Precio</label>
                    <br>
                    <input v-model.number="price" id="preci" type="number" class="form-control">
                    <br>
                    <label for="categ">Categoria</label>
                    <br>
                    <select v-model="category" id="categ" class="form-select" aria-label="Default select example">
                        <option disabled selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <br>
                    <label for="Textarea1" class="form-label">Descripción</label>
                    <br>
                    <textarea v-model="description" class="form-control" id="Textarea1" rows="3"></textarea>
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
