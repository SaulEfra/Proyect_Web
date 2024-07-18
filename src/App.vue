<template>
  <div class="">
    <MainView></MainView>
    <LoginAdmin></LoginAdmin>
  </div>
  
</template>

<script>
import MainView from './views/MainView'
import LoginAdmin from './components/LoginAdmin.vue';
export default {
  name: 'App',
  components: {
    LoginAdmin,
    MainView
  }
}
</script>

<style>

</style>