<template>
  <Loader v-if="loading" />

  <form class="edit-post-form" @submit.prevent="submit">
    <div class="mb-3">
      <Input label="Title" :field="title" :formSubmitted="formSubmitted" />
    </div>

    <div class="mb-3">
      <Input label="Body" :field="body" :formSubmitted="formSubmitted" />
    </div>

    <button class="btn btn-primary me-2" type="submit">Edit</button>
    <button class="btn btn-light" type="button" @click="setFormData">Reset form</button>
  </form>
</template>

<script lang="ts" setup>
import { reactive, toRefs, computed, onMounted } from 'vue';

import { useRouter, useRoute } from 'vue-router';

import type { Post } from '@/core/services/news/types';
import type { EditPostFormState } from '@/pages/News/EditPost/_files/types';
import { requiredMin } from '@/shared/files/validations';
import { validateForm } from '@/shared/helpers';
import { useField } from '@/shared/composables';
import { getPost, editPost } from '@/core/services';
import { currentPost, setCurrentPost } from '@/core/state/news';
import { Loader, Input } from '@/shared/components';

const router = useRouter();
const route = useRoute();

const initialState: EditPostFormState = {
  loading: true,
  formSubmitted: false,
};

const state = reactive(initialState);
const { loading, formSubmitted } = toRefs(state);

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
    state.loading = false;
  }
};

const submit = async () => {
  state.formSubmitted = true;

  const isValidForm = validateForm([{ fields: [title, body], validation: requiredMin(2) }]);
  if (!isValidForm) return;

  state.loading = true;

  try {
    const payload: Post = {
      userId: currentPost.value.userId,
      id: currentPost.value.userId,
      title: title.model.value,
      body: body.model.value,
    };

    await editPost(payload);
    setCurrentPost(payload);
    state.loading = false;
    router.push({ name: 'post', params: { id: payload.id } });
  } catch (error) {
    console.error(error);
    state.loading = false;
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  getCurrentPost();
});
</script>

<style lang="scss">
.edit-post-form {
  margin: 80px 0;
}
</style>
