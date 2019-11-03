<template>
  <fragment>
    <app-header :userFullName="userFullName"></app-header>

    <router-view></router-view>

    <app-footer></app-footer>
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
