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
import Form from '@/pages/Auth/Login/Form/Form.vue';

const { setPageTitle } = Helpers;

export default defineComponent({
  //==============================
  // GENERAL
  //==============================
  name: 'Login',
  components: {
    Form,
  },

  //==============================
  // LIFECYCLE HOOKS
  //==============================
  mounted() {
    console.log('Para logar, utilize qualquer e-mail e senha.');
    console.log('Para ver os alertas de erro, utilize o e-mail: demo@demo.com');
    setPageTitle('Login');
    this.redirectLoggedUser();
  },

  //==============================
  // METHODS
  //==============================
  methods: {
    // REDIRECT LOGGED USER
    redirectLoggedUser(): void {
      const { getItem: getSessionItem } = sessionStorage;
      const { getItem: getLocalItem } = localStorage;

      const authToken: string | null = getSessionItem(AUTH_TOKEN) || getLocalItem(AUTH_TOKEN);
      const expiredSession: boolean =
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
