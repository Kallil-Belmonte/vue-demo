<template>
  <Loader v-if="isLoading" />

  <form class="edit-post-form" @submit.prevent="submit">
    <div class="mb-3">
      <label class="form-label" for="title">Title</label>
      <input
        id="title"
        :class="getFieldClass(titleState)"
        type="text"
        name="title"
        v-model="title"
        ref="titleRef"
      />
      <div class="invalid-feedback" v-for="errorMessage in titleState.errorMessages">
        {{ errorMessage }}
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label" for="body">Body</label>
      <textarea
        id="body"
        :class="getFieldClass(bodyState)"
        name="body"
        rows="6"
        v-model="body"
        ref="bodyRef"
      />
      <div class="invalid-feedback" v-for="errorMessage in bodyState.errorMessages">
        {{ errorMessage }}
      </div>
    </div>

    <button class="btn btn-primary me-2" type="submit">Edit</button>
    <button class="btn btn-light" type="button" @click="setFormData">Reset form</button>
  </form>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted } from 'vue';

import { useRouter, useRoute } from 'vue-router';

import { Post } from '@/core/services/news/types';
import { EditPostFormState } from '@/pages/News/EditPost/_files/types';
import { getFieldClass, validateFieldsState } from '@/shared/helpers';
import { useField } from '@/shared/composables';
import { getPost, editPost } from '@/core/services';
import { currentPost, setCurrentPost } from '@/core/state/news';
import { Loader } from '@/shared/components';

const router = useRouter();
const route = useRoute();

const initialState: EditPostFormState = {
  isLoading: true,
};

const state = reactive(initialState);
const { isLoading } = toRefs(state);

const [title, titleRef, titleState] = useField({
  validation: { required: { check: true }, min: { check: 2 } },
});
const [body, bodyRef, bodyState] = useField({
  validation: { required: { check: true }, min: { check: 2 } },
});

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
    state.isLoading = false;
  }
};

const submit = async () => {
  const isValidFields = validateFieldsState([titleState, bodyState]);
  if (!isValidFields) return;

  state.isLoading = true;

  try {
    const payload: Post = {
      userId: currentPost.value.userId,
      id: currentPost.value.userId,
      title: title.value,
      body: body.value,
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
