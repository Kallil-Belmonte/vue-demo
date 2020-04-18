<template>
  <main>
    <b-container>
      <img class="logo d-block mx-auto" alt="Vue" src="@/assets/logo.svg">

      <b-row>
        <b-col offset-md="3" md="6">
          <login-form />
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>


<script>
import * as Helpers from '@/shared/Helpers';
import LoginForm from '@/pages/Auth/Login/LoginForm/LoginForm';

const { setPageTitle } = Helpers;

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
    setPageTitle('Login');
    this.redirectLoggedUser();
  },


  //==============================
  // METHODS
  //==============================
  methods: {
    // REDIRECT LOGGED USER
    redirectLoggedUser() {
      const authToken = sessionStorage.getItem('authTokenVueDemo') || localStorage.getItem('authTokenVueDemo');
      const expiredSession = new Date().getTime() > Date.parse(localStorage.getItem('expirationDateVueDemo'));

      if (authToken && !expiredSession) {
        this.$router.push('/');
      }
    },
  },
}
</script>


<style lang="scss" scoped>
.logo {
  height: 100px;
  margin-top: 50px;
}
</style>
