<template>
  <app-header :userFullName="userFullName" />

  <router-view />

  <app-footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { mapGetters } from 'vuex';

import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';

export default defineComponent({
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
    ...mapGetters('user', { userFullName: 'fullName' }),
  },
});
</script>
