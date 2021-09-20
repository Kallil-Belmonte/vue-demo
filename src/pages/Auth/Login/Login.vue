<template>
  <main>
    <div class="container">
      <img class="logo d-block mx-auto" alt="Vue" src="@/assets/logo.svg" />

      <div class="row">
        <div class="col-md-6 offset-md-3">
          <Form />
          <p class="disclaimer text-center mt-2 mb-0">Use any e-mail and password</p>
          <p class="disclaimer text-center mb-0">
            To see the error alerts use the e-mail: demo@demo.com
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

import { useRouter } from 'vue-router';

import { EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import { getAuthToken } from '@/shared/helpers';
import Form from './Form/Form.vue';

const router = useRouter();

const redirectLoggedUser = () => {
  const expiredSession: boolean =
    new Date().getTime() > Date.parse(localStorage.getItem(EXPIRATION_DATE_KEY) || '');

  if (getAuthToken() && !expiredSession) {
    console.log('DESCOMENTAR ESSA LINHA DE BAIXO');
    // router.push('/');
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  redirectLoggedUser();
});
</script>

<style lang="scss" scoped>
.logo {
  height: 100px;
  margin-top: 50px;
}

.disclaimer {
  font-size: 12px;
}
</style>
