<template>
  <fragment>
    <app-header userFullName="fullName"></app-header>

    <slot></slot>

    <app-footer></app-footer>
  </fragment>
</template>


<script>
import AppHeader from '@/layout/AppHeader.vue';
import AppFooter from '@/layout/AppFooter.vue';

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'Layout',
  components: {
    AppHeader,
    AppFooter
  },


  //==============================
  // LIFECYCLE HOOKS
  //==============================
  mounted() {
    // this.getUserData();
  },


  //==============================
  // METHODS
  //==============================
  methods: {
    // GET USER DATA
    getUserData() {
      // Get User Data Reducer
    }
  }
};
</script>
