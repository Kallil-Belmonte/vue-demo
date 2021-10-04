<template>
  <main>
    <div class="container">
      <AppPageHeader icon="user">Account</AppPageHeader>

      <Form />
    </div>
  </main>
</template>

<script lang="ts" setup>
import AppPageHeader from '@/shared/components/AppPageHeader.vue';
import Form from '@/pages/Account/Form/Form.vue';
</script>

<style lang="scss" scoped>
main {
  padding: 100px 0;
}
</style>
