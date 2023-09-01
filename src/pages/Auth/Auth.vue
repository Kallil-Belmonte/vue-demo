<template>
  <main data-page="auth">
    <div class="container">
      <Icon class="logo mx-auto" category="Brand" name="Logo" />

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
import { Icon } from '@/shared/components';

// LIFECYCLE HOOKS
onMounted(() => {
  redirectLoggedUser();
});
</script>

<style lang="scss">
[data-page='auth'] {
  .logo {
    @include square(100px);
    margin-top: 50px;
  }

  .disclaimer {
    font-size: 12px;
  }
}
</style>
