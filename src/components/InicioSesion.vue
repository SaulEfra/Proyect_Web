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
          <div class="password-input">
            <input class="form-control" id="pass" v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Ingresa tu contraseña">
            <button type="button" class="toggle-password" @click="togglePassword">
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
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
      showPassword: false
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
          this.$router.push('/Movimientos');
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
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
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
  background: linear-gradient(135deg, #1A365D, #2C5282);
  animation: gradientBG 15s ease infinite;
  background-size: 400% 400%;
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.login-container {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.title {
  color: #1A365D;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2C5282;
  font-weight: bold;
  transition: color 0.3s ease;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #CBD5E0;
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: #4299E1;
  box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #4299E1;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.toggle-password:hover {
  color: #2B6CB0;
}

.toggle-password i {
  transition: transform 0.3s ease;
}

.toggle-password:focus {
  outline: none;
}

.toggle-password:active i {
  transform: scale(0.9);
}

@keyframes rotateEye {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.toggle-password i {
  animation: rotateEye 0.5s ease;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4299E1;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.login-button:hover {
  background-color: #3182CE;
}

.login-button:active {
  background-color: #2B6CB0;
}

.login-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.login-button:focus:not(:active)::after {
  animation: ripple 1s ease-out;
}

@keyframes ripple {
  0% { transform: scale(0, 0); opacity: 1; }
  20% { transform: scale(25, 25); opacity: 1; }
  100% { opacity: 0; transform: scale(40, 40); }
}

/* Asegúrate de incluir Font Awesome en tu proyecto para los iconos */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
</style>