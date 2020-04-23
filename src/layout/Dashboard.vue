<template>
  <fragment>
    <app-header :userFullName="userFullName" />

    <router-view />

    <app-footer />
  </fragment>
</template>


<script>
import { mapGetters } from 'vuex';

import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'Dashboard',
  components: {
    AppHeader,
    AppFooter,
  },


  //==============================
  // COMPUTED
  //==============================
  computed: {
    ...mapGetters('user', {
      userFullName: 'fullName',
    }),
  },
};
</script>
