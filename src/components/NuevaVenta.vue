<template>
    <div class="row text-bg-light p-3">
        
        <div class="col-lg-12">
            <div>
                <h1>Nueva venta</h1>
            </div>

            <div class="row">
                <div class="col-lg-8">
                    <div class="row nav">
                        <div class="col-lg-12">
                            <nav class="navbar navbar-expand-lg bg-body-tertiary nav2">
                                <div class="container-fluid">
                                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul class="navbar-nav me-auto mb-2 col-lg-12">
                                            <form class="d-flex" role="search">
                                                <input class="form-control me-2" type="search" placeholder="Buscar"
                                                    aria-label="Buscar">
                                                <button class="btn btn-outline-success" type="submit">Buscar</button>
                                            </form>

                                            <li class="nav-item dropdown">
                                                <a class="nav-link dropdown-toggle" href="#" role="button"
                                                    data-bs-toggle="dropdown" aria-expanded="false">
                                                    Categoria
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
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <div class="col-lg-12 ">
                            <br>
                            <div class=" card card1" style="width: 10rem; ">
                                <img src="" class="card-img-top" alt="">
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    
                                    <h5>Producto</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="col-lg-4 canast">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="row canasta">
                                <div class="col-lg-6 canas">
                                    <h3>Canasta </h3>
                                </div>
                                <div class="col-lg-3">
                                    <button class="btn btn-primary btn-circle me-md-2 icon" type="button"><i
                                            class="bi bi-dash"></i></button>
                                </div>
                                <div class="col-lg-3">
                                    <button class="btn btn-primary btn-circle me-md-2 icon" type="button"><i
                                            class="bi bi-plus"></i></button>
                                </div>
                            </div>



                        </div>
                        <div class="col-lg-12">
                            <div class="row cant">
                                <div class="col-lg-3">
                                    <i class="bi bi-cash icon2"></i>
                                    <h6>Cantidad</h6>
                                </div>
                                <div class="col-lg-6">
                                    <input type="text" placeholder="Producto">
                                    <br>
                                    <input type="number" placeholder="$0.000000">
                                    <input type="number">

                                </div>
                                
                            </div>




                        </div>

                    </div>
                    <div class="col-lg-10 mar">
                        <label for="total" class="texto">Total</label>
                        <input class="nombre" id="total" type="number" placeholder="$0.00">
                        <button class="btninic">Confirmar</button>
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
<style>
.mar{
    margin-top: 200px;
}
.icon {
    font-size: 50px;
    margin-right: 30%;
}
.icon2{
    font-size:50px;
    margin-right: 35%;
    background-color: aqua;
}

.d-flex {
    display: flex;
}

.align-items-center {
    align-items: center;
}

.me-2 {
    margin-right: 0.5rem;
    /* Ajusta según sea necesario */
}

.me-3 {
    margin-right: 1rem;
    /* Ajusta según sea necesario */
}

.btn-circle {
    width: 40px;
    /* Ajusta el tamaño según tus necesidades */
    height: 40px;
    /* Ajusta el tamaño según tus necesidades */
    padding: 0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: red;
}

.btn-circle i {
    font-size: 16px;
    /* Ajusta el tamaño del icono según tus necesidades */
}
.card1{
    width: 50px;
    height: 50px;
    background-color: aquamarine;
}
.canast{
    border-left: 1px solid black;
    border-top: 1px solid black;
}
.canasta{
    border-bottom: 1px solid black;
}
.cant{
    border-bottom: 1px solid black;
}
.nav{
    border-top: 1px solid black;
}
.nav2{
    border-bottom: 1px solid black;
}
</style>