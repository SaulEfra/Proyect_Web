<template>
  <div class="row">
    <nav class="navbar bg-body-tertiary">
      <div class="container-fluid">
        <span class="navbar-brand">
          <h1>Empleados</h1>
        </span>
        <button v-if="!empleado" @click.prevent="empleado = true">Añadir Empleado</button>
      </div>
    </nav>

    <table v-if="!empleado" class="table">
      <thead>
        <tr>
          <th scope="col">Nombre del empleado</th>
          <th scope="col">Num. de Telefono</th>
          <th scope="col">Cargo</th>
          <th scope="col">Estado</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr>
          <td>Usuario Ejemplo</td>
          <td>7777777777</td>
          <td>Propietario</td>
          <td><input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
            <label class="form-check-label" for="defaultCheck1">
              Activo
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <form v-if="empleado">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">>Nombre del empleado</th>
          <th scope="col">Num. de Telefono</th>
          <th scope="col">Cargo</th>
          <th scope="col">Estado</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
            <label class="form-check-label" for="defaultCheck1">
              Activo
            </label>
          </td>
        </tr>
      </tbody>
    </table>
    <input @click.prevent="empleado = false" type="button" class="btn btn-primary" value="Añadir Empleado">

  </form>
</template>
<script>
export default {
  name: 'EmpleadosApp',
  data() {
    return {
      empleado: false
    }
  }
}
</script>