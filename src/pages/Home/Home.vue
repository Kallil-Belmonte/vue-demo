<template>
  <main data-page="Home">
    <Loader v-if="loading" />

    <FeaturedPosts :posts="featuredPosts" />
  </main>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import type { Post } from '@/core/services/news/types';
import { posts, setPosts } from '@/core/state/news';
import { getPosts } from '@/core/services';
import { Loader } from '@/shared/components';
import FeaturedPosts from './FeaturedPosts/FeaturedPosts.vue';

const loading = ref(false);
const featuredPosts = ref<Post[]>([]);

const getFeaturedPosts = async () => {
  if (posts.value.length) {
    const [firstPost, secondPost, thirdPost] = posts.value;
    featuredPosts.value = [firstPost, secondPost, thirdPost];
  } else {
    loading.value = true;

    try {
      const posts = await getPosts();
      const [firstPost, secondPost, thirdPost] = posts;
      featuredPosts.value = [firstPost, secondPost, thirdPost];
      setPosts(posts);
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  getFeaturedPosts();
});
</script>
