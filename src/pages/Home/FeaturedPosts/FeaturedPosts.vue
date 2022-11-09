<template>
  <section class="page-section">
    <div class="container">
      <h2 class="section-title">Featured posts</h2>

      <div class="row">
        <div class="col-md-4" v-for="post in posts" :key="post.id">
          <PostItem :post="post" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Post } from '@/core/services/news/types';
import { PostItem } from '@/shared/components';

type Props = {
  posts: Post[];
};

const props = defineProps<Props>();
</script>
