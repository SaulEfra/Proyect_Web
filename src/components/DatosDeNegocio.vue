<template>
  <div class="row">
    <div class="col-lg-2">
      <ParteLateral></ParteLateral>
    </div>
    <div class="col-lg-10">
    <h1>Datos de tu negocio</h1>
    <form>
      <div class="mb-3">
        <select v-model="tiponeg" class="form-select" aria-label="Default select example">
          <option selected>Tipo de negocio</option>
          <option value="1">Papeleria</option>
          <option value="2">Ferreteria</option>
          <option value="3">Farmacia</option>
          <option value="4">Panaderia</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="direccion" class="form-label">Direccion del negocio</label>
        <input v-model="direccc" type="text" class="form-control" id="direccion" aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre del negocio</label>
        <input v-model="nameneg" type="text" class="form-control" id="nombre">
      </div>
      <div class="mb-3">
        <button type="submit" class="btn btn-primary" @click="createNegocio" >Guardar cambios</button>
      </div>
    </form>
  </div>
  </div>
  
</template>

<script>
import ParteLateral from './ParteLateral.vue';
import axios from 'axios';

export default {
  name: 'DatosNegocios',
  components:{
    ParteLateral
  },
  data(){
    return{
      direccc:'',
      nameneg:'',
      tiponeg:''
    }

  },
  methods:{
    async createNegocio() {
      const formData = {
        direccc : this.direccc,
        nameneg :this.nameneg,
        tiponeg : this.tiponeg
      };
      try {
        const response = await axios.post('http://localhost:3000/Neg/createnegocios', formData);
        console.log('Respuesta del servidor:', response.data); 
        alert('Negocio creado con exito');
        this.direccc = "";
        this.nameneg = "";
        this.tiponeg = ""
      } catch (error) {
        console.error('Error al crear Negocio:', error);
        alert('Error al crear Negocio: ' + error.message);
      }     
    },
  }
}

</script>
  
  <style scoped>
  .hola{
    text-align: center;
  }
  .form-group{
    text-align: center;
  }
  .texto{
    text-align: center;
  }
  .com{
    text-align: center;
  }
  .btn{
  padding: 10px;
  font-size: 14px;
  border: 1px solid rgb(137, 149, 226);
  border-radius: 5px;
  background-color: #eff5ff;
  cursor: pointer;
  height: 50px;
  width: 150px;
  color: black;
  }


.btn:hover{
  background-color: #bdd6ff;
  color: white;
  border: 1px solid rgb(120, 134, 223);
}
  </style>
  
  
  

  