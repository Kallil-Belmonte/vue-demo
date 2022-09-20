<template>
  <Loader v-if="isLoading" />

  <form class="edit-post-form" @submit.prevent="submit">
    <div class="mb-3">
      <label class="form-label" :for="titleState.name">Title</label>
      <input
        :id="titleState.name"
        :class="getFieldClass(isFormSubmitted, title)"
        type="text"
        :name="titleState.name"
        v-model="titleModel"
        ref="titleRef"
      />
      <div class="invalid-feedback" v-for="errorMessage in titleState.errorMessages">
        {{ errorMessage }}
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label" :for="bodyState.name">Body</label>
      <textarea
        :id="bodyState.name"
        :class="getFieldClass(isFormSubmitted, body)"
        :name="bodyState.name"
        rows="6"
        v-model="bodyModel"
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
import { requiredMin } from '@/shared/files/validations';
import { getFieldClass, validateFields } from '@/shared/helpers';
import { useField } from '@/shared/composables';
import { getPost, editPost } from '@/core/services';
import { currentPost, setCurrentPost } from '@/core/state/news';
import { Loader } from '@/shared/components';

const router = useRouter();
const route = useRoute();

const initialState: EditPostFormState = {
  isLoading: true,
  isFormSubmitted: false,
};

const state = reactive(initialState);
const { isLoading, isFormSubmitted } = toRefs(state);

const title = useField({ name: 'title', validation: requiredMin(2) });
const { model: titleModel, ref: titleRef, state: titleState } = title;

const body = useField({ name: 'body', validation: requiredMin(2) });
const { model: bodyModel, ref: bodyRef, state: bodyState } = body;

const setFormData = () => {
  titleModel.value = currentPost.value.title;
  bodyModel.value = currentPost.value.body;
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

  const isValidFields = [
    validateFields({ fields: [title, body], validation: requiredMin(2) }),
  ].every(isValid => isValid);
  if (!isValidFields) return;

  state.isLoading = true;

  try {
    const payload: Post = {
      userId: currentPost.value.userId,
      id: currentPost.value.userId,
      title: titleModel.value,
      body: bodyModel.value,
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
