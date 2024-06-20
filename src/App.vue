<template>
  <div class="">
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <MainView></MainView>
  </div>
  
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue';
import MainView from './views/MainView'

export default {
  name: 'App',
  components: {
    //HelloWorld,
    MainView
  }
}
</script>

<style>

</style>