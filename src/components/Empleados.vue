<template>
  <div class="movements">
    <div class="header">
      <h2>Empleados</h2>
    </div>

    <!-- Contenido de la tabla de empleados -->
    <div class="employee-table">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre del empleado</th>
            <th scope="col">Num. de Telefono</th>
            <th scope="col">Cargo</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Usuario Ejemplo</td>
            <td>7777777777</td>
            <td>Propietario</td>
            <td>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="defaultCheck1">
                <label class="form-check-label" for="defaultCheck1">
                  Activo
                </label>
              </div>
            </td>
          </tr>
          <!-- Puedes añadir más filas aquí según tus datos -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmpleadosApp',
};
</script>

<style scoped>
.movements {
  padding: 80px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.employee-table {
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Asegura que el contenido no desborde */
}

.table {
  width: 100%;
}

.table th,
.table td {
  padding: 12px;
  text-align: left;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.form-check-input {
  margin-top: 0.3rem;
}

.form-check-label {
  margin-left: 1rem;
}
</style>
