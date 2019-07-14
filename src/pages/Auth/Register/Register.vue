<template>
  <main>
    <div class="container">
      <img class="logo d-block mx-auto" alt="Vue" src="@/assets/logo.svg">

      <div class="row">
        <div class="offset-md-3 col-md-6">
          <register-form></register-form>
        </div>
      </div>
    </div>
  </main>
</template>


<script>
import Utils from '@/shared/General/Utils';
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
    Utils.setPageTitle('Register');
  },
}
</script>


<style lang="scss" scoped>
.logo {
  height: 100px;
  margin-top: 50px;
}
</style>
