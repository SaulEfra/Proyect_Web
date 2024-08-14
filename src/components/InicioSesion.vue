<template>
  <div class="login">
    <div class="login-container">
      <h1 class="title">Inicio de sesión</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="user" class="form-label">Usuario</label>
          <input class="form-control" id="user" v-model="email" type="text" placeholder="Ingresa tu usuario">
        </div>
        <div class="form-group">
          <label for="pass" class="form-label">Contraseña</label>
          <input class="form-control" id="pass" v-model="password" type="password" placeholder="Ingresa tu contraseña">
        </div>
        <button class="login-button" type="submit">Comenzar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'InicioSesion',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      if (!this.email || !this.password) {
        alert('Por favor, ingresa tu usuario y contraseña.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/login', {
          email: this.email,
          password: this.password
        }, { withCredentials: true });

        if (response.status === 200) {
          
          this.$router.push('/Movimientos'); // Redirige al componente Movimientos
        }
      } catch (error) {
        if (error.response) {
          alert('Error al iniciar sesión: ' + error.response.data);
        } else if (error.request) {
          alert('Error al iniciar sesión: No hay respuesta del servidor');
        } else {
          alert('Error al iniciar sesión: ' + error.message);
        }
      }
    }
  },
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f7f7f7;
}

.login-container {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.form-control:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25);
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.login-button:hover {
  background: #0056b3;
}
</style>