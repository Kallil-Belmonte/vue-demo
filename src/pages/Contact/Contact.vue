<template>
  <main>
    <div class="container">
      <AppPageHeader icon="envelope">Contact</AppPageHeader>

      <Form />
    </div>
  </main>
</template>

<script lang="ts" setup>
import AppPageHeader from '@/shared/components/AppPageHeader.vue';
import Form from '@/pages/Contact/Form/Form.vue';
</script>

<style lang="scss" scoped>
main {
  padding: 100px 0;
}
</style>
