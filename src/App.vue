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
    onSetPageTitle(): void {
      this.$router.afterEach((to) => {
        const { name } = to;

        if (name) {
          const pageUrl: string = String(name).split('-').join(' ');
          const urlName: string = capitalizeFirstLetter(pageUrl);
          setPageTitle(urlName);
        }
      });
    },
  },
});
</script>
