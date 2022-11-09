<template>
  <main>
    <Loader v-if="loading" />

    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <PostBody v-if="currentPost" :post="currentPost" />
        </div>
      </div>
    </div>

    <DeletePostModal />
  </main>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted } from 'vue';

import { useRoute } from 'vue-router';

import type { PostState } from '@/pages/News/Post/_files/types';
import { currentPost, setCurrentPost } from '@/core/state/news';
import { getPost } from '@/core/services';
import { Loader } from '@/shared/components';
import PostBody from './PostBody/PostBody.vue';
import DeletePostModal from './DeletePostModal/DeletePostModal.vue';

const route = useRoute();

const initialState: PostState = {
  loading: true,
};

const state = reactive(initialState);
const { loading } = toRefs(state);

const getCurrentPost = async () => {
  try {
    const post = await getPost(String(route.params.id));
    setCurrentPost(post);
  } catch (error) {
    console.error(error);
  } finally {
    state.loading = false;
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  getCurrentPost();
});
</script>
