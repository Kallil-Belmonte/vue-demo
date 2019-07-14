<template>
  <main>
    <div class="container">
      <page-header icon="user">Account</page-header>

      <account-form></account-form>
    </div>
  </main>
</template>


<script>
import PageHeader from '@/shared/Components/PageHeader';
import AccountForm from '@/pages/Account/AccountForm/AccountForm';

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'Account',
  components: {
    PageHeader,
    AccountForm,
  },
}
</script>


<style lang="scss" scoped>
main {
  padding: 100px 0;
}
</style>
