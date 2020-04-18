<template>
  <main>
    <b-container>
      <img class="logo d-block mx-auto" alt="Vue" src="@/assets/logo.svg">

      <b-row>
        <b-col offset-md="3" md="6">
          <register-form />
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>


<script>
import * as Helpers from '@/shared/Helpers';
import RegisterForm from '@/pages/Auth/Register/RegisterForm/RegisterForm';

const { setPageTitle } = Helpers;

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'Register',
  components: {
    RegisterForm,
  },


  //==============================
  // LIFECYCLE HOOKS
  //==============================
  mounted() {
    console.log('Utilize o e-mail: demo@demo.com para ver os alertas de erro.');
    setPageTitle('Register');
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
