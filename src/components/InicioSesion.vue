<template>
  <div class="">
    <div class="hello col-lg-6 offset-lg-3">
      <h1>Inicio de sesión</h1>
      <label for="user" class="texto form-label"> Usuario</label>
      <input class="user form-control" id="user" type="text">
      <br>
      <label for="Pass" class="texto form-label">Password</label>
      <input class="passw form-control" type="password">
      <br>
      <button class="btninic">Comenzar</button>
    </div>


  </div>
</template>


<script>
export default {
  name: 'HelloWorld',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  background: #0F2027;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2C5364, #203A43, #0F2027);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  padding: 70px;
  border-radius: 30px;
  color: white;
  text-align: center;
  
}
h1{
  margin-bottom: 60px;
}
label{
  font-size: 30px;
}


.btninic {
  margin-top: 60px;
  height: 50px;
  width: 150px;
  font-size: 20px;
  background-color: rgba(92, 92, 180, 0.732);
  border-radius: 10px;
  color: white;
  border: 5px;
}
</style>
