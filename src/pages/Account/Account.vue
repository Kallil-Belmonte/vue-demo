<template>
  <main data-page="account">
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
[data-page='account'] {
  padding: 100px 0;
}
</style>
