<template>
  <main>
    <b-container>
      <AppPageHeader icon="envelope">Contact</AppPageHeader>

      <Form />
    </b-container>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppPageHeader from '@/shared/components/AppPageHeader.vue';
import Form from '@/pages/Contact/Form/Form.vue';

export default defineComponent({
  //==============================
  // GENERAL
  //==============================
  name: 'Contact',
  components: {
    AppPageHeader,
    Form,
  },
});
</script>

<style lang="scss" scoped>
main {
  padding: 100px 0;
}
</style>
