<template>
  <section>
    <b-row>
      <b-col md="4" v-for="post of pages[currentPage]" :key="post.id">
        <AppPostItem :post="post" />
      </b-col>
    </b-row>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppPostItem from '@/shared/components/AppPostItem.vue';

export default defineComponent({
  //==============================
  // GENERAL
  //==============================
  name: 'Posts',
  props: {
    pages: {
      type: Object,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  components: {
    AppPostItem,
  },
});
</script>
