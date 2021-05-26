<template>
  <main>
    <AppLoader v-if="isLoading" />

    <FeaturedPosts :posts="featuredPosts" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { mapState, mapMutations } from 'vuex';

import axios, { ENDPOINTS } from '@/core/api';
import AppLoader from '@/shared/components/AppLoader.vue';
import FeaturedPosts from '@/pages/Home/FeaturedPosts/FeaturedPosts.vue';
import { HomeData } from './_files/types';

const { blog } = ENDPOINTS;

export default defineComponent({
  //==============================
  // GENERAL
  //==============================
  name: 'Home',
  components: {
    AppLoader,
    FeaturedPosts,
  },

  //==============================
  // DATA
  //==============================
  data(): HomeData {
    return {
      isLoading: false,
      featuredPosts: [],
    };
  },

  //==============================
  // COMPUTED
  //==============================
  computed: {
    ...mapState('blog', ['posts']),
  },

  //==============================
  // LIFECYCLE HOOKS
  //==============================
  mounted() {
    this.getFeaturedPosts();
  },

  //==============================
  // METHODS
  //==============================
  methods: {
    // MUTATIONS
    ...mapMutations('blog', ['setPosts']),

    // GET FEATURED POSTS
    async getFeaturedPosts(): Promise<void> {
      if (this.posts.length) {
        const [firstPost, secondPost, thirdPost] = this.posts;
        this.featuredPosts = [firstPost, secondPost, thirdPost];
      } else {
        this.isLoading = true;

        try {
          const { data: posts } = await axios.get(blog.posts);
          const [firstPost, secondPost, thirdPost] = posts;
          this.featuredPosts = [firstPost, secondPost, thirdPost];
          this.setPosts(posts);
        } catch (error) {
          console.error(error);
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
});
</script>
