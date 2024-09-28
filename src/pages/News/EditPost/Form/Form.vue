<template>
  <Loader v-if="loading" />

  <form @submit.prevent="submit">
    <div class="mb-3">
      <Input label="Title" name="title" required minlength="2" v-model="title" />
    </div>

    <div class="mb-3">
      <Textarea label="Body" name="body" required minlength="2" v-model="body" />
    </div>

    <Button class="me-2" type="submit">Edit</Button>
    <Button variant="base" :click="setFormData">Reset form</Button>
  </form>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import { useRouter, useRoute } from 'vue-router';

import type { Post } from '@/core/services/news/types';
import { getPost, editPost } from '@/core/services';
import { currentPost, setCurrentPost } from '@/core/state/news';
import { Loader, Input, Textarea, Button } from '@/shared/components';

const router = useRouter();
const route = useRoute();

const loading = ref(true);
const title = ref('');
const body = ref('');

const setFormData = () => {
  title.value = currentPost.value.title;
  body.value = currentPost.value.body;
};

const getCurrentPost = async () => {
  try {
    const post = await getPost(String(route.params.id));
    setCurrentPost(post);
    setFormData();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const submit = async () => {
  loading.value = true;

  try {
    const payload: Post = {
      userId: currentPost.value.userId,
      id: currentPost.value.userId,
      title: title.value,
      body: body.value,
    };

    await editPost(payload);
    setCurrentPost(payload);
    router.push({ name: 'post', params: { id: payload.id } });
  } catch (error) {
    console.error(error);
    loading.value = false;
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  getCurrentPost();
});
</script>

<style lang="scss">
[data-page='EditPost'] {
  form {
    margin: 80px 0;
  }
}
</style>
