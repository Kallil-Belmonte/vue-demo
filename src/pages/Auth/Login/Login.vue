<template>
  <main>
    <b-container>
      <img class="logo d-block mx-auto" alt="Vue" src="@/assets/logo.svg">

      <b-row>
        <b-col offset-md="3" md="6">
          <login-form></login-form>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>


<script>
import * as Helpers from '@/shared/Helpers';
import LoginForm from '@/pages/Auth/Login/LoginForm/LoginForm';

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'Login',
  components: {
    LoginForm,
  },


  //==============================
  // LIFECYCLE HOOKS
  //==============================
  mounted() {
    console.log('Utilize o e-mail: demo@demo.com para ver os alertas de erro.');
    Helpers.setPageTitle('Login');
  },
}
</script>


<style lang="scss" scoped>
.logo {
  height: 100px;
  margin-top: 50px;
}
</style>
