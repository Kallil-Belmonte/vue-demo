<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png">

    <hello-world msg="Welcome to Your Vue.js App"></hello-world>
  </div>
</template>


<script>
import HelloWorld from '@/pages/Home/HelloWorld/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
