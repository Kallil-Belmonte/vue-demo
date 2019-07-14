<template>
  <main>
    <div class="container">
      <page-header icon="envelope">Contact</page-header>

      <contact-form></contact-form>
    </div>
  </main>
</template>


<script>
import PageHeader from '@/shared/Components/PageHeader';
import ContactForm from '@/pages/Contact/ContactForm/ContactForm';

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'Contact',
  components: {
    PageHeader,
    ContactForm,
  },
}
</script>


<style lang="scss" scoped>
main {
  padding: 100px 0;
}
</style>
