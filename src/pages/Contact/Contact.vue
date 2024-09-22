<template>
  <main data-page="Contact">
    <div class="container">
      <PageHeader icon="Envelope">Contact</PageHeader>

      <Form />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { PageHeader } from '@/shared/components';
import Form from '@/pages/Contact/Form/Form.vue';
</script>

<style lang="scss">
[data-page='Contact'] {
  padding: 100px 0;
}
</style>
