<template>
    <div class="row partLat">
                <div class="col-12 perfiles">
                    <img src="" alt="Perfil foto">

                    <select>
                        <option value="1">Negocio 1</option>
                        <option value="2">Negocio 2</option>
                    </select>
                   
                    
                </div>
                <div class="config">
                    
                    <i class="bi bi-gear-fill"></i>
                    <RouterLink to="/Configuracion">Configuraciones</RouterLink>
                    <br>
                    <i class="bi bi-plus-circle-fill"></i>
                    <RouterLink to="/AgregarNegocio">Agregar negocio</RouterLink>
                    
                </div>
                
                
                <div class="produc">
                    <i class="bi bi-file-earmark-minus-fill"></i>
                    <RouterLink to="/Movimientos">Movimientos</RouterLink>
                    <br>
                    <i class="bi bi-box-seam-fill"></i>
                    <RouterLink to="/Productos">Productos</RouterLink>
                    <br>
                    <i class="bi bi-people-fill"></i>
                    <RouterLink to="/Empleados">Empleados</RouterLink>
    
                </div>
                
                <div class="gest">
                    <h5>Gestiona tus contactos</h5>
                    <RouterLink to="/Clientes">Clientes</RouterLink>
                    <br>
                    <RouterLink to="/Proveedores">Proveedores</RouterLink>
                
                </div>
            </div>
</template>

<script>
export default {
    name: 'ParteLateral',
}
</script>

<style>
.partLat RouterLink{
    margin-left: 10px;
}

</style>