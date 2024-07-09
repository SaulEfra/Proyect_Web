<template>
  <div>
    <h1>Datos de tu negocio</h1>
    <form>
      <div class="mb-3">
        <select class="form-select" aria-label="Default select example">
          <option selected>Tipo de negocio</option>
          <option value="1">Papeleria</option>
          <option value="2">Ferreteria</option>
          <option value="3">Farmacia</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="direccion" class="form-label">Direccion del negocio</label>
        <input type="text" class="form-control" id="direccion" aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre del negocio</label>
        <input type="text" class="form-control" id="nombre">
      </div>
  <div class="mb-3">
    <button type="submit" class="btn btn-primary">Guardar cambios</button>
  </div>
    </form>
  </div>
</template>
  
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
  </style>
  
  
  
  <script>
  export default {
    name: 'DatosNegocios',
  }
  
  </script>
  