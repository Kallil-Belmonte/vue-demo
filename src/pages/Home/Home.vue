<template>
  <main>
    <Loader v-if="loading" />

    <FeaturedPosts :posts="featuredPosts" />
  </main>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted } from 'vue';

import { HomeState } from '@/pages/Home/_files/types';
import { posts, setPosts } from '@/core/state/news';
import { getPosts } from '@/core/services';
import { Loader } from '@/shared/components';
import FeaturedPosts from './FeaturedPosts/FeaturedPosts.vue';

const initialState: HomeState = {
  loading: false,
  featuredPosts: [],
};

const state = reactive(initialState);
const { loading, featuredPosts } = toRefs(state);

const getFeaturedPosts = async () => {
  if (posts.value.length) {
    const [firstPost, secondPost, thirdPost] = posts.value;
    state.featuredPosts = [firstPost, secondPost, thirdPost];
  } else {
    state.loading = true;

    try {
      const posts = await getPosts();
      const [firstPost, secondPost, thirdPost] = posts;
      state.featuredPosts = [firstPost, secondPost, thirdPost];
      setPosts(posts);
    } catch (error) {
      console.error(error);
    } finally {
      state.loading = false;
    }
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  getFeaturedPosts();
});
</script>
