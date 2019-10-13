<template>
  <main>
    <p class="number">404</p>

    <h1 class="page-title text-center">Page not found</h1>
    <div class="d-flex justify-content-center">
      <router-link to="/" class="btn btn-primary mt-4">Go back to the home page</router-link>
    </div>
  </main>
</template>


<script>
import * as Helpers from '@/shared/Helpers';

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'NotFound',


  //==============================
  // LIFECYCLE HOOKS
  //==============================
  mounted() {
    Helpers.setPageTitle('Error 404');
  },
}
</script>


<style lang="scss" scoped>
@import "../../assets/scss/helpers/mixins";

main {
  color: #FFF;
  @include size(100%, 100vh);
  padding: 100px 0;
  background-color: #2A2C2E;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 30px 0 0;
}

.number {
  font-size: 150px;
  font-weight: 700;
  text-align: center;
  line-height: 1;
  margin: 0;
}
</style>
