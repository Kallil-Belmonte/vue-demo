<template>
  <AppLoader v-if="isLoading" />

  <vue-form class="edit-post-form" :state="form.state" @submit.prevent="onSubmit">
    <validate>
      <b-form-group label-for="title" label="Title">
        <b-form-input
          v-model="form.model.title"
          id="title"
          :class="getFieldClass(form.state.title)"
          type="text"
          name="title"
          required
          :state="required"
        />

        <field-messages name="title" show="$touched">
          <b-form-invalid-feedback :state="required" force-show>
            Title is required
          </b-form-invalid-feedback>
        </field-messages>
      </b-form-group>
    </validate>

    <validate>
      <b-form-group label-for="body" label="Message">
        <b-form-textarea
          v-model="form.model.body"
          id="body"
          name="body"
          rows="6"
          required
          :state="required"
        />

        <field-messages name="body" show="$touched">
          <b-form-invalid-feedback :state="required" force-show>
            Body is required
          </b-form-invalid-feedback>
        </field-messages>
      </b-form-group>
    </validate>

    <b-button
      variant="primary"
      class="mr-2"
      type="submit"
      :disabled="!form.state.$valid || form.state.$pristine"
    >
      Edit
    </b-button>
    <b-button variant="light" @click="onSetFormData()" :disabled="form.state.$pristine">
      Reset form
    </b-button>
  </vue-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { mapState, mapMutations } from 'vuex';

import axios, { ENDPOINTS } from '@/core/api';
import { required, getFieldClass } from '@/shared/helpers';
import AppLoader from '@/shared/components/AppLoader.vue';
import { FormData } from '../_files/types';

const { blog } = ENDPOINTS;

export default defineComponent({
  //==============================
  // GENERAL
  //==============================
  name: 'EditPostForm',
  components: {
    AppLoader,
  },

  //==============================
  // DATA
  //==============================
  data(): FormData {
    return {
      getFieldClass,
      required,
      isLoading: true,
      form: {
        state: {},
        model: {
          title: '',
          body: '',
        },
      },
    };
  },

  //==============================
  // COMPUTED
  //==============================
  computed: {
    ...mapState('post', ['currentPost']),
  },

  //==============================
  // LIFECYCLE HOOKS
  //==============================
  mounted() {
    this.getCurrentPost(String(this.$route.params.id));
  },

  //==============================
  // METHODS
  //==============================
  methods: {
    // MUTATIONS
    ...mapMutations('post', ['setCurrentPost']),

    // ON SET FORM DATA
    onSetFormData(): void {
      const { title, body } = this.currentPost;
      this.form.model = { title, body };
    },

    // GET CURRENT POST
    async getCurrentPost(id: string): Promise<void> {
      try {
        const { data: post } = await axios.get(`${blog.posts}${id}`);
        this.setCurrentPost(post);
        this.onSetFormData();
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    // ON SUBMIT
    async onSubmit(): Promise<void> {
      this.isLoading = true;

      try {
        await axios.put(`${blog.posts}${this.$route.params.id}`, this.form.model);
        const { userId, id, title, body } = this.currentPost;

        this.setCurrentPost({ userId, id, title, body });
        this.$router.push({ name: 'post', params: { id } });
      } catch (error) {
        console.error(error);
        this.isLoading = false;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.edit-post-form {
  margin: 80px 0;
}
</style>
