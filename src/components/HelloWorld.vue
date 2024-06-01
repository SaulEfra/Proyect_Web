<template>
  <div class="hello " >
    <h1>Inicio de sesión</h1>
    <label for="user" class="texto"> Usuario</label>
    <input class="user" id="user" type="text">
    <br>
    <label for="Pass" class="texto">Password</label>
    <input class="passw" type="password">
    <br>
    <button class="btninic">Comenzar</button>
    
  </div>
</template>


<script>
export default{
  name: 'HelloWorld',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  
  text-align: center;
  padding: 1px;

  background: #0F2027;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2C5364, #203A43, #0F2027);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

h1 {
  font-size: 70px;
  margin-bottom: 150px;
  margin-top: 150px;
  color: white;
}

.texto {
  font-size: 40px;
  color: white;
}

.user {
  height: 30px;
  margin-bottom: 50px;
  margin-left: 50px;
  width: 300px;
  color: black;
}

.passw {
  height: 30px;
  margin-left: 20px;
  width: 300px;
  color: black;
}

.btninic {
  margin-top: 60px;
  height: 50px;
  width: 150px;
  font-size: 20px;
  background-color: rgba(92, 92, 180, 0.732);
  border-radius: 10px;
  color: white;
  margin-bottom: 300px;
  border: 5px;
}
</style>
