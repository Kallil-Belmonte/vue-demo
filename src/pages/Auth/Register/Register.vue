<template>
  <main>
    <b-container>
      <img class="logo d-block mx-auto" alt="Vue" src="@/assets/logo.svg" />

      <b-row>
        <b-col offset-md="3" md="6">
          <Form />
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { AUTH_TOKEN, EXPIRATION_DATE } from '@/shared/files/consts';
import * as Helpers from '@/shared/helpers';
import Form from '@/pages/Auth/Register/Form/Form.vue';

const { setPageTitle } = Helpers;

export default defineComponent({
  //==============================
  // GENERAL
  //==============================
  name: 'Register',
  components: {
    Form,
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
      const authToken = sessionStorage.getItem(AUTH_TOKEN) || localStorage.getItem(AUTH_TOKEN);
      const expiredSession =
        new Date().getTime() > Date.parse(localStorage.getItem(EXPIRATION_DATE) || '');

      if (authToken && !expiredSession) {
        this.$router.push('/');
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.logo {
  height: 100px;
  margin-top: 50px;
}
</style>
