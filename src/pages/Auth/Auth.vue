<template>
  <main data-page="Auth">
    <div class="container">
      <Icon class="logo mx-auto" category="Brand" name="Logo" />

      <div class="row">
        <div class="col-md-6 offset-md-3">
          <slot></slot>

          <p class="disclaimer text-center mt-2 mb-0">Use any e-mail and password</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { Icon } from '@/shared/components';
</script>

<style lang="scss">
@use '@/assets/scss/helpers' as *;

body:has([data-page='Auth']) {
  background-color: $grey-1;
}

[data-page='Auth'] {
  .logo {
    @include square(100px);
    margin-top: 50px;
  }

  .disclaimer {
    font-size: 12px;
  }

  .auth-form {
    padding: 40px 40px 15px 40px;
    border-radius: 10px;
    background-color: #fff;
    margin-top: 50px;

    .page-title {
      font-size: 24px;
      font-weight: 700;
      text-align: center;
    }
  }
}
</style>
