<template>
    <div class="row partLat" >
        <button @click="toggleSidebar" class="btn btn-primary sidebar-toggle d-md-none">
            <i :class="['bi', isOpen ? 'bi-x' : 'bi-list']"></i>
        </button>
        <nav :class="['navbar', 'bg-body-tertiary', 'fixed-top', { 'd-none d-md-block col-md-2': !isOpen, 'col-8 col-md-2': isOpen }]">
            <div class="container-fluid">
                <button @click="toggleSidebar" class="btn btn-close d-md-none" aria-label="Close"></button>
                <div class="col-12 perfiles">
                    <button>Negocio</button>
                </div>
                <div class="config">
                    <i class="bi bi-gear-fill"></i>
                    <RouterLink to="/InfoNeg">Configuraciones</RouterLink>
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
        </nav>
    </div>
</template>

<script>
export default {
    name: 'ParteLateral',
    data() {
        return {
            isOpen: false
        }
    },
    methods: {
        toggleSidebar() {
            this.isOpen = !this.isOpen;
        }
    }
}
</script>

<style scoped>
.partLat RouterLink {
    margin-left: 10px;
}

</style>