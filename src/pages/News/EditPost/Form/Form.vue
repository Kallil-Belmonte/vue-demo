<template>
  <AppLoader v-if="isLoading" />

  <form class="edit-post-form" @submit.prevent="submit">
    <div class="mb-3">
      <label class="form-label" for="title">Title</label>
      <input
        id="title"
        :class="getFieldClass(title)"
        type="text"
        name="title"
        v-model="title.value"
        ref="title.ref"
      />
      <div class="invalid-feedback" v-if="title.error">
        {{ title.error?.message }}
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label" for="body">Body</label>
      <textarea
        id="body"
        :class="getFieldClass(body)"
        name="body"
        rows="6"
        v-model="body.value"
        ref="body.ref"
      />
      <div class="invalid-feedback" v-if="body.error">
        {{ body.error?.message }}
      </div>
    </div>

    <button class="btn btn-primary me-2" type="submit">Edit</button>
    <button class="btn btn-light" type="button" @click="setFormData">Reset form</button>
  </form>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted } from 'vue';

import { useRouter, useRoute } from 'vue-router';
import { useForm } from 'vue-hooks-form';

import { Post } from '@/core/services/news/types';
import { EditPostFormState } from '@/pages/News/EditPost/_files/types';
import { getFieldClass, validateFields } from '@/shared/helpers';
import { getPost, editPost } from '@/core/services';
import { currentPost, setCurrentPost } from '@/core/state/news';
import { AppLoader } from '@/shared/components';

const fields = ['Title', 'Body'];

const router = useRouter();
const route = useRoute();

const { useField, set, validateField } = useForm({ defaultValues: {} });

const state = reactive<EditPostFormState>({
  isLoading: true,
  title: useField('Title', {
    rule: { required: true },
  }),
  body: useField('Body', {
    rule: { required: true },
  }),
});
const { isLoading, title, body } = toRefs(state);

const setFormData = () => {
  set('Title', currentPost.value.title);
  set('Body', currentPost.value.body);
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
  const errors = await validateFields(fields, validateField);
  if (errors.length) return;

  state.isLoading = true;

  try {
    const payload: Post = {
      userId: currentPost.value.userId,
      id: currentPost.value.userId,
      title: state.title.value,
      body: state.body.value,
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
