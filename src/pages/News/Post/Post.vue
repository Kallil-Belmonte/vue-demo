<template>
  <main>
    <AppLoader v-if="isLoading" />

    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <PostBody v-if="currentPost" :post="currentPost" @delete="toogleDeleteModal(true)" />
        </div>
      </div>
    </div>

    <DeletePostModal :isVisible="isDeleteModalVisible" @cancel="toogleDeleteModal(false)" />
  </main>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted } from 'vue';

import { useRoute } from 'vue-router';

import { currentPost, setCurrentPost } from '@/core/state/news';
import { getPost } from '@/core/services';
import AppLoader from '@/shared/components/AppLoader.vue';
import PostBody from './PostBody/PostBody.vue';
import DeletePostModal from './DeletePostModal/DeletePostModal.vue';
import { PostState } from './_files/types';

const route = useRoute();

const state = reactive<PostState>({
  isLoading: true,
  isDeleteModalVisible: false,
});
const { isLoading, isDeleteModalVisible } = toRefs(state);

const toogleDeleteModal = (value: boolean) => {
  isDeleteModalVisible.value = value;
};

const getCurrentPost = async () => {
  try {
    const post = await getPost(String(route.params.id));
    setCurrentPost(post);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  getCurrentPost();
});
</script>
