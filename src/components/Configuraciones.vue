<template>
    <div class="container">
      
      <div class="col-lg-12">
        <nav class="navbar bg-body-tertiary">
          <div class="header">
            <span class="navbar-brand">
              <h4>Datos del Negocio</h4>
            </span>
          </div>
        </nav>
      
        <div class="row">
          <div class="col-6">
            <p>Tipo de negocio</p>
            <div class="input-group mb-3 ">
              <select class="form-select" aria-label="Default select example">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
          <div class="offset-col-1 col-6">
            <p>Nombre del negocio</p>
            <input type="text" class="form-control" aria-label="Text input with dropdown button">
          </div>
          <div class="offset-col-1 col-6">
            <p>Dirección del negocio</p>
            <input type="text" class="form-control" aria-label="Text input with dropdown button">
          </div>
          <div class="offset-col-1 col-6">
            <p>Correo Electronico</p>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">@</span>
              <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                aria-describedby="addon-wrapping">
            </div>
          </div>
          <div class=" col-6">
            <p>Número de celular</p>
            <input type="text" class="form-control" aria-label="Text input with dropdown button">
          </div>
          <div class="d-grid col-6">
            <br>
            <button class="btn btn-primary" type="button">
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
export default {
  name: 'ConfiguracionesApp',
}

  </script>
  
  <style>
  h1 {
    font-size: 50px;
  }
  .container{
    padding: 15px;
  }
  .row{
    padding: 40px;
  }
  </style>