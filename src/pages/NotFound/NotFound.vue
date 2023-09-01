<template>
  <main data-page="not-found">
    <p class="number">404</p>

    <h1 class="page-title text-center">Page not found</h1>
    <div class="d-flex justify-content-center">
      <router-link to="/" class="btn btn-primary mt-4">Go back to the home page</router-link>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

import { setPageTitle } from '@/shared/helpers';

// LIFECYCLE HOOKS
onMounted(() => {
  setPageTitle('Error 404');
});
</script>

<style lang="scss">
[data-page='not-found'] {
  color: #fff;
  @include size(100%, 100vh);
  padding: 100px 0;
  background-color: #2a2c2e;

  .number {
    font-size: 150px;
    font-weight: 700;
    text-align: center;
    line-height: 1;
    margin: 0;
  }

  .page-title {
    font-size: 28px;
    font-weight: 700;
    text-transform: uppercase;
    margin: 30px 0 0;
  }
}
</style>
