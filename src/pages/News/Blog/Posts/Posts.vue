<template>
  <section data-component="Posts">
    <div class="row">
      <div class="col-md-4" v-for="post of pages[currentPage]" :key="post.id">
        <PostItem :post="post" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Post } from '@/core/services/news/types';
import { PostItem } from '@/shared/components';

type Props = {
  currentPage: number;
  pages: { [key: string]: Post[] };
};

const { currentPage, pages } = defineProps<Props>();
</script>
