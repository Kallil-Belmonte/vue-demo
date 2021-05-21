<template>
  <main>
    <b-container>
      <AppPageHeader icon="user">Account</AppPageHeader>

      <Form />
    </b-container>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppPageHeader from '@/shared/components/AppPageHeader.vue';
import Form from '@/pages/Account/Form/Form.vue';

export default defineComponent({
  //==============================
  // GENERAL
  //==============================
  name: 'Account',
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
