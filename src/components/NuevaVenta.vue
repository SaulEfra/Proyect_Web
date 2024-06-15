<template>
  <div class="container mt-5 p-3 bg-light rounded">
    <div class="row">
      <div class="col-lg-12 mb-4">
        <h1>Nueva venta</h1>
      </div>
      <div class="col-lg-8 mb-4">
        <div class="row">
          <div class="col-lg-12">
            <nav class="navbar navbar-expand-lg navbar-light bg-light p-3 rounded mb-4">
              <div class="container-fluid">
                <form class="d-flex me-auto" role="search">
                  <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar">
                  <button class="btn btn-outline-success" type="submit">Buscar</button>
                </form>
                <li class="nav-item dropdown list-unstyled ms-3">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Categoría
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li>
                      <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
              </div>
            </nav>
          </div>
          <div class="col-lg-12">
            <div class="card mb-4" style="width: 18rem;">
              <img src="" class="card-img-top" alt="">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <h5>Producto</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="border p-3 rounded">
          <div class="row mb-3">
            <div class="col-lg-6">
              <h3>Canasta</h3>
            </div>
            <div class="col-lg-6 text-end">
              <button class="btn btn-primary btn-circle me-2" type="button"><i class="bi bi-dash"></i></button>
              <button class="btn btn-primary btn-circle" type="button"><i class="bi bi-plus"></i></button>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-lg-3">
              <i class="bi bi-cash icon"></i>
              <h6>Cantidad</h6>
            </div>
            <div class="col-lg-9">
              <input type="text" class="form-control mb-2" placeholder="Producto">
              <input type="number" class="form-control mb-2" placeholder="$0.000000">
              <input type="number" class="form-control">
            </div>
          </div>
          <div class="mt-5">
            <label for="total" class="form-label">Total</label>
            <input class="form-control mb-3" id="total" type="number" placeholder="$0.00">
            <button class="btn btn-primary w-100">Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuevaVenta',
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}

.icon {
  font-size: 24px;
  color: #000;
}

.btn-circle {
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  background-color: #f8f9fa;
}

.border {
  border: 1px solid #ccc;
  background-color: #fff;
}

h1, h3, h5, h6 {
  color: #333;
}

input, select, button {
  font-size: 14px;
  border-radius: 4px;
}

button:hover {
  background-color: #e6e6e6;
}

.navbar-light .navbar-nav .nav-link {
  color: #555;
}

.navbar-light .navbar-nav .nav-link:hover {
  color: #000;
}
</style>
