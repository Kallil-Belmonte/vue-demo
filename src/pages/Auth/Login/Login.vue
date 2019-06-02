<template>
  <main>
    <div class="container">
      <img class="logo d-block mx-auto" alt="Vue" src="@/assets/logo.svg">

      <div class="row">
        <div class="offset-md-3 col-md-6">
          <login-form></login-form>
        </div>
      </div>
    </div>
  </main>
</template>


<script>
import LoginForm from '@/pages/Auth/Login/LoginForm/LoginForm.vue'

export default {
  name: 'Login',
  components: {
    LoginForm
  },
}
</script>


<style lang="scss" scoped>
.logo {
  height: 100px;
  margin-top: 50px;
}
</style>
