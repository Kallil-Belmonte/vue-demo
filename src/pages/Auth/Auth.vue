<template>
  <main>
    <div class="container">
      <img class="logo d-block mx-auto" alt="Vue" src="@/assets/logo.svg" />

      <div class="row">
        <div class="col-md-6 offset-md-3">
          <slot></slot>

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

import { redirectLoggedUser } from '@/shared/helpers';

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
