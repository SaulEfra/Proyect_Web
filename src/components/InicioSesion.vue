<template>
  <div class="login">
    <div class="hello col-lg-6 offset-lg-3">
      <h1>Inicio de sesión</h1>
      <label for="user" class="texto form-label">Usuario</label>
      <input class="user form-control" id="user" v-model="email" type="text">
      <br>
      <label for="pass" class="texto form-label">Contraseña</label>
      <input class="passw form-control" id="pass" v-model="password" type="password">
      <br>
      <button class="btninic" @click="login">Comenzar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          email: this.email,
          password: this.password,
        }, { withCredentials: true });

        if (response.status === 200) {
          alert('Inicio de sesión exitoso');
          // Aquí puedes redirigir al usuario a otra página si el inicio de sesión fue exitoso
        }
      } catch (error) {
        if (error.response) {
          // El servidor respondió con un estado fuera del rango 2xx
          alert('Error al iniciar sesión: ' + error.response.data);
        } else if (error.request) {
          // La solicitud se hizo pero no hubo respuesta
          alert('Error al iniciar sesión: No hay respuesta del servidor');
        } else {
          // Algo pasó al configurar la solicitud
          alert('Error al iniciar sesión: ' + error.message);
        }
      }
    }


  },
};
</script>

<style scoped>
.hello {
  background: #0F2027;
  background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027);
  background: linear-gradient(to right, #2C5364, #203A43, #0F2027);
  padding: 70px;
  border-radius: 30px;
  color: white;
  text-align: center;
}

h1 {
  margin-bottom: 60px;
}

label {
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
