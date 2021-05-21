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
import AppPostItem from '@/shared/components/AppPostItem.vue';

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'Posts',
  props: {
    pages: Object,
    currentPage: Number,
  },
  components: {
    AppPostItem,
  },
};
</script>
