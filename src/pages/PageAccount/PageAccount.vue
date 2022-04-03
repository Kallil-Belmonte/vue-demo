<template>
  <main>
    <div class="container">
      <app-page-header icon="User">Account</app-page-header>

      <account-form></account-form>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { AppPageHeader } from '@/shared/components';
import AccountForm from '@/pages/PageAccount/AccountForm/AccountForm.vue';
</script>

<style lang="scss" scoped>
main {
  padding: 100px 0;
}
</style>
