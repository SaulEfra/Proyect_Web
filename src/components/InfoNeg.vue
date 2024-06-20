<template>
    <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
            <span class="navbar-brand">
                <h1>Datos del negocio</h1>
            </span>
            <button v-if="!venta" @click.prevent="venta = true">Modificar</button>
        </div>
    </nav>

    <div v-if="!venta" class="row">
        <div class="col-5">
            <p>Tipo de negocio</p>
            <div class="input-group mb-3">
                <p>Papeleria</p>
            </div>
        </div>
        <div class="offset-col-1 col-5">
            <p>Nombre del negocio</p>
            <p>Papeleria Ejemplo</p>
        </div>
        <div class="offset-col-1 col-5">
            <p>Dirección del negocio</p>
            <p>Calle 7,Col Centro, Zacualtipan de Angeles Hidalgo</p>
        </div>
    </div>

    <form v-if="venta">
        <div class="row">
            <div class="offset-1 col-lg-10">
                <nav class="navbar bg-body-tertiary">
                    <div class="container-fluid mx-5">
                        <span class="navbar-brand">
                            <h1>Modificar</h1>
                        </span>
                    </div>
                </nav>
                <div class="col-12">
                </div>
                <div class="row">
                    <div class="col-5">
                        <p>Tipo de negocio</p>
                        <div class="input-group mb-3">
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>
                    <div class="offset-col-1 col-5">
                        <p>Nombre del negocio</p>
                        <input type="text" class="form-control" aria-label="Text input with dropdown button">
                    </div>
                    <div class="offset-col-1 col-5">
                        <p>Dirección del negocio</p>
                        <input type="text" class="form-control" aria-label="Text input with dropdown button">
                    </div>
                    <div class="d-grid col-5">
                        <p>.</p>
        <input @click.prevent="venta = false" type="button" class="btn btn-primary" value="Guardar Cambios">
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>
<script>
export default {
    name: 'InfoNeg',
    data() {
        return {
            venta: false
        }
    }
}
</script>
<style>
body {
    background-color: aquamarine
}
</style>