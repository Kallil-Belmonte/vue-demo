<template>
  <main>
    <div class="container">
      <AppPageHeader icon="User">Account</AppPageHeader>

      <Form />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { AppPageHeader } from '@/shared/components';
import Form from '@/pages/Account/Form/Form.vue';
</script>

<style lang="scss" scoped>
main {
  padding: 100px 0;
}
</style>
