<template>
  <main data-page="Account">
    <div class="container">
      <PageHeader icon="User">Account</PageHeader>

      <Form />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { PageHeader } from '@/shared/components';
import Form from '@/pages/Account/Form/Form.vue';
</script>

<style lang="scss">
@use '@/assets/scss/helpers' as *;

[data-page='Account'] {
  padding: 100px 0;
}
</style>
