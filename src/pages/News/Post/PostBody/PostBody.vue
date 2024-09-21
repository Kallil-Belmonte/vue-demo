<template>
  <Loader v-if="loading" />

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
      <button type="button" class="btn btn-danger" @click="toggleDeletePostModal()">Delete</button>
    </div>
  </section>

  <DeletePostModal
    :open="openDeletePostModal"
    :confirm="() => triggleDeletePost()"
    :cancel="() => toggleDeletePostModal()"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { useRouter, useRoute } from 'vue-router';

import type { Post } from '@/core/services/news/types';
import { deletePost } from '@/core/services';
import { Loader } from '@/shared/components';
import DeletePostModal from '../DeletePostModal/DeletePostModal.vue';

type Props = {
  post: Post;
};

const { post } = defineProps<Props>();

const router = useRouter();
const { params } = useRoute();

const loading = ref(false);
const openDeletePostModal = ref(false);

const toggleDeletePostModal = () => {
  openDeletePostModal.value = !openDeletePostModal.value;
};

const triggleDeletePost = async () => {
  toggleDeletePostModal();
  loading.value = true;

  try {
    await deletePost(String(params.id));
    router.push({ name: 'blog' });
  } catch (error) {
    console.error(error);
    loading.value = false;
  }
};
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
