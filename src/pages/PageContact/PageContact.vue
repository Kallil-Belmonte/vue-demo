<template>
  <main>
    <div class="container">
      <app-page-header icon="Envelope">Contact</app-page-header>

      <contact-form></contact-form>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { AppPageHeader } from '@/shared/components';
import ContactForm from '@/pages/PageContact/ContactForm/ContactForm.vue';
</script>

<style lang="scss" scoped>
main {
  padding: 100px 0;
}
</style>
