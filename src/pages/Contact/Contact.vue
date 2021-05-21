<template>
  <main>
    <b-container>
      <AppPageHeader icon="envelope">Contact</AppPageHeader>

      <ContactForm />
    </b-container>
  </main>
</template>

<script lang="ts">
import AppPageHeader from '@/shared/components/AppPageHeader.vue';
import ContactForm from '@/pages/Contact/ContactForm/ContactForm.vue';

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'Contact',
  components: {
    AppPageHeader,
    ContactForm,
  },
};
</script>

<style lang="scss" scoped>
main {
  padding: 100px 0;
}
</style>
