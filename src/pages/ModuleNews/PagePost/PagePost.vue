<template>
  <main>
    <app-loader v-if="isLoading"></app-loader>

    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <post-body v-if="currentPost" :post="currentPost"></post-body>
        </div>
      </div>
    </div>

    <delete-post-modal></delete-post-modal>
  </main>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted } from 'vue';

import { useRoute } from 'vue-router';

import { PostState } from '@/pages/ModuleNews/Post/_files/types';
import { currentPost, setCurrentPost } from '@/core/state/news';
import { getPost } from '@/core/services';
import { AppLoader } from '@/shared/components';
import PostBody from './PostBody/PostBody.vue';
import DeletePostModal from './DeletePostModal/DeletePostModal.vue';

const route = useRoute();

const state = reactive<PostState>({
  isLoading: true,
});
const { isLoading } = toRefs(state);

const getCurrentPost = async () => {
  try {
    const post = await getPost(String(route.params.id));
    setCurrentPost(post);
  } catch (error) {
    console.error(error);
  } finally {
    state.isLoading = false;
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  getCurrentPost();
});
</script>
