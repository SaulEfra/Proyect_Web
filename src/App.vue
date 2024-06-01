<template>
  <div class="">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <PaintallaSiet></PaintallaSiet>
  </div>
  
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import PaintallaSiet from './components/PaintallaSiet.vue';


export default {
  name: 'App',
  components: {
    HelloWorld,
    PaintallaSiet
  }
}
</script>

<style>

</style>
