<template>
  <main data-page="Account">
    <div class="container">
      <PageHeader icon="User">Account</PageHeader>

      <Form />
    </div>
  </main>
</template>

<script lang="ts" setup>
import Form from '@/pages/Account/Form/Form.vue';
import { PageHeader } from '@/shared/components';
</script>

<style lang="scss">
[data-page='Account'] {
  padding: 100px 0;
}
</style>
