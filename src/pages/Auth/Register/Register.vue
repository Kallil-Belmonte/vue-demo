<template>
  <main>
    <b-container>
      <img class="logo d-block mx-auto" alt="Vue" src="@/assets/logo.svg">

      <b-row>
        <b-col offset-md="3" md="6">
          <register-form></register-form>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>


<script>
import * as Helpers from '@/shared/Helpers';
import RegisterForm from '@/pages/Auth/Register/RegisterForm/RegisterForm';

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
    Helpers.setPageTitle('Register');
  },
}
</script>


<style lang="scss" scoped>
.logo {
  height: 100px;
  margin-top: 50px;
}
</style>
