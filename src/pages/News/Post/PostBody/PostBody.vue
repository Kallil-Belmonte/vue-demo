<template>
  <section class="post-body">
    <article>
      <h1 class="title text-center">{{ post.title }}</h1>
      <p>{{ post.body }}</p>
    </article>
    <hr class="mt-4" />
    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-danger mr-3" @click="emits('delete')">Delete</button>
      <!-- <router-link class="btn btn-light" :to="{ name: 'edit-post', params: { id: post.id } }">
        Edit
      </router-link> -->
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Post } from '@/core/services/news/types';

type Props = {
  post: Post;
};

const props = defineProps<Props>();
const emits = defineEmits(['delete']);
</script>

<style lang="scss" scoped>
.post-body {
  padding: 50px 0;

  .title {
    font-size: 32px;
    font-weight: 700;
    text-transform: capitalize;
    margin-bottom: 25px;
  }
}
</style>
