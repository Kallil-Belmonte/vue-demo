<template>
  <fragment>
    <app-header :userFullName="fullName"></app-header>

    <router-view></router-view>

    <app-footer></app-footer>
  </fragment>
</template>


<script>
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
  // DATA
  //==============================
  data() {
    return {
      fullName: 'Full Name',
    }
  },


  //==============================
  // LIFECYCLE HOOKS
  //==============================
  mounted() {
    this.getUserData();
  },


  //==============================
  // METHODS
  //==============================
  methods: {
    // GET USER DATA
    getUserData() {
      // Get User Data Reducer
    },
  }
};
</script>
