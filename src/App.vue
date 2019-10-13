<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>
import * as Helpers from '@/shared/Helpers';

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'App',


  //==============================
  // LIFECYCLE HOOKS
  //==============================
  mounted() {
    this.setPageTitle();
  },


  //==============================
  // METHODS
  //==============================
  methods: {
    // SET PAGE TITLE
    setPageTitle() {
      this.$router.afterEach(to => {
        if (to.name) {
          const pageUrl = to.name.split('-').join(' ');
          const urlName = Helpers.capitalizeFirstLetter(pageUrl);

          Helpers.setPageTitle(urlName);
        }
      });
    }
  }
};
</script>
