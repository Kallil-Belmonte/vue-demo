<template>
  <Loader v-if="isLoading" />

  <form class="edit-post-form" @submit.prevent="submit">
    <div class="mb-3">
      <Input label="Title" :field="title" :isFormSubmitted="isFormSubmitted" />
    </div>

    <div class="mb-3">
      <Input label="Body" :field="body" :isFormSubmitted="isFormSubmitted" />
    </div>

    <button class="btn btn-primary me-2" type="submit">Edit</button>
    <button class="btn btn-light" type="button" @click="setFormData">Reset form</button>
  </form>
</template>

<script lang="ts" setup>
import { reactive, toRefs, computed, onMounted } from 'vue';

import { useRouter, useRoute } from 'vue-router';

import { Post } from '@/core/services/news/types';
import { EditPostFormState } from '@/pages/News/EditPost/_files/types';
import { requiredMin } from '@/shared/files/validations';
import { validateForm } from '@/shared/helpers';
import { useField } from '@/shared/composables';
import { getPost, editPost } from '@/core/services';
import { currentPost, setCurrentPost } from '@/core/state/news';
import { Loader, Input } from '@/shared/components';

const router = useRouter();
const route = useRoute();

const initialState: EditPostFormState = {
  isLoading: true,
  isFormSubmitted: false,
};

const state = reactive(initialState);
const { isLoading, isFormSubmitted } = toRefs(state);

const title = useField({ name: 'title', validation: requiredMin(2) });
const body = useField({ name: 'body', validation: requiredMin(2) });

const setFormData = () => {
  title.model.value = currentPost.value.title;
  body.model.value = currentPost.value.body;
};

const getCurrentPost = async () => {
  try {
    const post = await getPost(String(route.params.id));
    setCurrentPost(post);
    setFormData();
  } catch (error) {
    console.error(error);
  } finally {
    state.isLoading = false;
  }
};

const submit = async () => {
  state.isFormSubmitted = true;

  const isValidForm = validateForm([{ fields: [title, body], validation: requiredMin(2) }]);
  if (!isValidForm) return;

  state.isLoading = true;

  try {
    const payload: Post = {
      userId: currentPost.value.userId,
      id: currentPost.value.userId,
      title: title.model.value,
      body: body.model.value,
    };

    await editPost(payload);
    setCurrentPost(payload);
    state.isLoading = false;
    router.push({ name: 'post', params: { id: payload.id } });
  } catch (error) {
    console.error(error);
    state.isLoading = false;
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  getCurrentPost();
});
</script>

<style lang="scss" scoped>
.edit-post-form {
  margin: 80px 0;
}
</style>
