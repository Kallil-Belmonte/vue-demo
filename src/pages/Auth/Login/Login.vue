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

import { AUTH_TOKEN_KEY, EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import Form from '@/pages/Auth/Login/Form/Form.vue';

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
    console.log('Para logar utilize qualquer e-mail e senha.');
    console.log('Para ver os alertas de erro utilize o e-mail: demo@demo.com');
    this.redirectLoggedUser();
  },

  //==============================
  // METHODS
  //==============================
  methods: {
    redirectLoggedUser(): void {
      const { getItem: getSessionItem } = sessionStorage;
      const { getItem: getLocalItem } = localStorage;

      const authToken: string | null =
        getSessionItem(AUTH_TOKEN_KEY) || getLocalItem(AUTH_TOKEN_KEY);
      const expiredSession: boolean =
        new Date().getTime() > Date.parse(localStorage.getItem(EXPIRATION_DATE_KEY) || '');

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
