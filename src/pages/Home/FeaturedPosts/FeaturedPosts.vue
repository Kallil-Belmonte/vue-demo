<template>
  <section class="page-section">
    <b-container>
      <h2 class="section-title">Featured posts</h2>

      <b-row>
        <b-col md="4" v-for="post in posts" :key="post.id">
          <AppPostItem :post="post" />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppPostItem from '@/shared/components/AppPostItem.vue';

export default defineComponent({
  //==============================
  // GENERAL
  //==============================
  name: 'FeaturedPosts',
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  components: {
    AppPostItem,
  },
});
</script>
