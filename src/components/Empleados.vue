<template>
  <div class="row">
    <div class=" col-lg-10">
      <header>
        <h1>Empleados</h1>
      </header>

      <table class="table">
        <thead>
          <tr>
            <th scope="col"><img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ8AAACUCAMAAAC6AgsRAAAAMFBMVEXk5ueutLe1u77p6+uqsbSxt7rKztDc3+Dh4+TT19jY29zHy826v8LQ09WnrrK+w8Y4co4RAAADm0lEQVR4nO2b23LjIAxADeKOMf//t8VOtk03tgPCCM8uZ6aZPp4RFggQ0zQYDAaDwWAwGAwGg8HgXwN6C5yhbQjBOt3b4w2YdIhyWRYhxPrLfdD3CSVMgUsh2AtCyDncxFDH5Zfbj6Myvd0mMJ7t2m2GUvXWs/LQ7mHYNVmMX87sNsOOITTzafCegrFXmugMu22M+6SJk1l6SZD30MuM3kOQPoI6N3qb4Ezul5MaL4KeNknAF+klwUDq58rsEqRJbHixn5jpRrh4dFcWR+Y3IfQYI8thiCg/RpUiRVNfhwAqXPjIvkBk+KgqGf2x5juEoljFZscKRYYAdnjXASbw02g9xijqrFDhR/EBYta2Pwjb3q8iPSjKQDPj9RhrPwMafPom+M39WHO/gm3bDmL4Db86vxo9Ar+6/JXt/cq3li+032Sam69vdetv+wIVsLujlYWgvio/evmB5BCmor6n2AEDvsCiOcu3+P0lzQYdnSDtZ+cN7A5EBBo/i40fiV0ClyHCU/k5VIbQXRUCR3yBlFcMqCKQ8gakvEggvgApHWGSo6sXSkeY/I41lAWQ/JofVMkkQ3Bu9Ub+MrfYHlf8+ZU00br7Rt4QC9etj+hD98tmxzt2wMDH3abwnXucrDgxFLJH4v4CJn80yIKrO3SwgVbsvYNNLDz0b197AjpyyURi+xFMcm/uELtvYNJW+Tgnolf2Rt2T3wC8/3cLIPkYrZ2zD5zTWhuAG2gmB+1UGlbOpWTPj49JKTlP42x1V0ejredrz+7R7CeWhcXgDP3HmMIWImdnc/O3pOBROVpFozg7bot9d0x/nqo9J03H835D8bnjwj1BFMFGmTGqB2HkbStBMEHiD9c2ReGblVswKV5ntxlKr9sEMRRkxDktYmgxZy4HCHbxQS/U3ervGPJLNyWFm/Esw3hVAQZZbezlgvKiEF6XF38bXnGgWnWf9YFlrt8B1FwHfqT6eYi5cFbZN6wqG5rrJSrOjkyrzHgFf7hFEb0VpCCVHvYbbDIr74PJ4po+xFLKHwBBgyX3GERnNKUe4uq16bKxQ+FCQjq6K4X3S3VNkhhKHg+g3sfUUpDDlT2mOAouOHuEryCAXcK3FgqZfrZL+LKbA6GqA7ECkVftm07hYyLrugRUJ73cB17US9sPWYtcXQNsFVmFKvb13RV+OcdGrtvw5pWBDc8LPpLzPKRferCcHiiIvB8y4/tb76y6keM3GAwG/wVf6dYvDagXDgkAAAAASUVORK5CYII="
              alt="" style="height: 30px;">Nombre del empleado</th>
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
              </label></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
name: 'EmpleadosApp',
}
</script>