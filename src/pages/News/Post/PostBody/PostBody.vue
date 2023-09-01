<template>
  <section data-component="post-body">
    <article>
      <h1 class="title text-center">{{ post.title }}</h1>
      <p>{{ post.body }}</p>
    </article>
    <hr class="mt-4" />
    <div class="d-flex justify-content-end">
      <router-link class="btn btn-light me-3" :to="{ name: 'edit-post', params: { id: post.id } }">
        Edit
      </router-link>
      <button
        type="button"
        class="btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target="#delete-post-modal"
      >
        Delete
      </button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Post } from '@/core/services/news/types';

export type Props = {
  post: Post;
};

const props = defineProps<Props>();
</script>

<style lang="scss">
[data-component='post-body'] {
  padding: 50px 0;

  .title {
    font-size: 32px;
    font-weight: 700;
    text-transform: capitalize;
    margin-bottom: 25px;
  }
}
</style>
