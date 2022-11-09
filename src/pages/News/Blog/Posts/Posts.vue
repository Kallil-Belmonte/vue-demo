<template>
  <section>
    <div class="row">
      <div class="col-md-4" v-for="post of pages[currentPage]" :key="post.id">
        <PostItem :post="post" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Post } from '@/core/services/news/types';
import type { PostItem } from '@/shared/components';

export type Props = {
  pages: { [key: string]: Post[] };
  currentPage: number;
};

const props = defineProps<Props>();
</script>
