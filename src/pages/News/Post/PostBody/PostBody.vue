<template>
  <Loader v-if="loading" />

  <section data-component="PostBody">
    <article>
      <h1 class="title text-center">{{ post.title }}</h1>
      <p>{{ post.body }}</p>
    </article>
    <hr class="my-4" />
    <div class="d-flex justify-content-end">
      <Button class="me-3" :route="{ name: 'edit-post', params: { id: post.id } }">Edit</Button>
      <Button variant="base" @click="toggleDeletePostModal()">Delete</Button>
    </div>
  </section>

  <DeletePostModal
    :isOpen="isDeletePostModalOpen"
    :confirm="() => triggleDeletePost()"
    :cancel="() => toggleDeletePostModal()"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { useRoute, useRouter } from 'vue-router';

import { deletePost } from '@/core/services';
import type { Post } from '@/core/services/news/types';
import { Button, Loader } from '@/shared/components';
import DeletePostModal from '../DeletePostModal/DeletePostModal.vue';

type Props = {
  post: Post;
};

const { post } = defineProps<Props>();

const router = useRouter();
const { params } = useRoute();

const loading = ref(false);
const isDeletePostModalOpen = ref(false);

const toggleDeletePostModal = () => {
  isDeletePostModalOpen.value = !isDeletePostModalOpen.value;
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
[data-component='PostBody'] {
  padding: 50px 0;

  .title {
    font-size: 32px;
    font-weight: 700;
    text-transform: capitalize;
    margin-bottom: 25px;
  }
}
</style>
