<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>
import Utils from '@/shared/General/Utils';

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
          const urlName = Utils.capitalizeFirstLetter(pageUrl);

          Utils.setPageTitle(urlName);
        }
      });
    }
  }
};
</script>
