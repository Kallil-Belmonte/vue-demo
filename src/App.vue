<template>
  <div id="app">
    <router-view />
  </div>
</template>


<script>
import * as Helpers from '@/shared/Helpers';

const { capitalizeFirstLetter, setPageTitle } = Helpers;

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'App',


  //==============================
  // LIFECYCLE HOOKS
  //==============================
  mounted() {
    this.onSetPageTitle();
  },


  //==============================
  // METHODS
  //==============================
  methods: {
    // ON SET PAGE TITLE
    onSetPageTitle() {
      this.$router.afterEach(to => {
        const { name } = to;

        if (name) {
          const pageUrl = name.split('-').join(' ');
          const urlName = capitalizeFirstLetter(pageUrl);

          setPageTitle(urlName);
        }
      });
    }
  }
};
</script>
