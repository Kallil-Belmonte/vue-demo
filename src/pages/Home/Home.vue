<template>
  <layout>
    <div class="home">
      <img alt="Vue logo" src="@/assets/logo.svg">

      <hello-world msg="Welcome to Your Vue.js App"></hello-world>
    </div>
  </layout>
</template>


<script>
import Layout from '@/layout/Layout.vue'
import HelloWorld from '@/pages/Home/HelloWorld/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    Layout,
    HelloWorld
  }
}
</script>
