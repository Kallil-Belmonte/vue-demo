<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { capitalizeFirstLetter, setPageTitle } from '@/shared/helpers';

export default defineComponent({
  //==============================
  // GENERAL
  //==============================
  name: 'App',

  //==============================
  // METHODS
  //==============================
  methods: {
    // VER ISSO: https://www.freecodecamp.org/news/build-accessible-vue-applications/
    // onSetPageTitle(): void {
    // this.$router.afterEach(to => {
    //   const { name } = to;
    //   if (name) {
    //     const pageUrl: string = String(name).split('-').join(' ');
    //     const urlName: string = capitalizeFirstLetter(pageUrl);
    //     setPageTitle(urlName);
    //   }
    // });
    // },
  },
});
</script>
