<template>
  <main>
    <AppLoader v-if="isLoading" />

    <FeaturedPosts :posts="featuredPosts" />
  </main>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted } from 'vue';

import { HomeState } from '@/pages/Home/_files/types';
import { posts, setPosts } from '@/core/state/news';
import { getPosts } from '@/core/services/news';
import { AppLoader } from '@/shared/components';
import FeaturedPosts from './FeaturedPosts/FeaturedPosts.vue';

const state = reactive<HomeState>({
  isLoading: false,
  featuredPosts: [],
});
const { isLoading, featuredPosts } = toRefs(state);

const getFeaturedPosts = async () => {
  if (posts.value.length) {
    const [firstPost, secondPost, thirdPost] = posts.value;
    state.featuredPosts = [firstPost, secondPost, thirdPost];
  } else {
    state.isLoading = true;

    try {
      const posts = await getPosts();
      const [firstPost, secondPost, thirdPost] = posts;
      state.featuredPosts = [firstPost, secondPost, thirdPost];
      setPosts(posts);
    } catch (error) {
      console.error(error);
    } finally {
      state.isLoading = false;
    }
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  getFeaturedPosts();
});
</script>
