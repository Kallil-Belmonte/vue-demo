<template>
  <fragment>
    <loader v-if="isLoading" />

    <vue-form class="edit-post-form" :state="form.state" @submit.prevent="onSubmit">
      <validate>
        <b-form-group label-for="title" label="Title">
          <b-form-input v-model="form.model.title" id="title" :class="Helpers.setFieldClassName(form.state.title)" type="text" name="title" required />

          <field-messages name="title" show="$touched">
            <b-form-invalid-feedback slot="required" force-show>
              Title is required
            </b-form-invalid-feedback>
          </field-messages>
        </b-form-group>
      </validate>

      <validate>
        <b-form-group label-for="body" label="Message">
          <b-form-textarea v-model="form.model.body" id="body" name="body" rows="6" required />

          <field-messages name="body" show="$touched">
            <b-form-invalid-feedback slot="required" force-show>
              Body is required
            </b-form-invalid-feedback>
          </field-messages>
        </b-form-group>
      </validate>

      <b-button variant="primary" class="mr-2" type="submit" :disabled="!form.state.$valid || form.state.$pristine">
        Edit
      </b-button>
      <b-button variant="light" @click="onSetFormData()" :disabled="form.state.$pristine">
        Reset form
      </b-button>
    </vue-form>
  </fragment>
</template>


<script>
import { mapState, mapMutations } from 'vuex';

import * as Helpers from '@/shared/Helpers';
import { INSTANCES, ENDPOINTS } from '@/core/Resource/Resource';
import Loader from '@/shared/Components/Loader';

const { jsonPlaceholder } = INSTANCES;
const { blog } = ENDPOINTS;

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'EditPostForm',
  components: {
    Loader,
  },


  //==============================
  // DATA
  //==============================
  data() {
    return {
      Helpers,
      isLoading: true,
      form: {
        state: {},
        model: {
          title: undefined,
          body: undefined,
        },
      },
    }
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
    this.getCurrentPost(this.$route.params.id);
  },


  //==============================
  // METHODS
  //==============================
  methods: {
    // MUTATIONS
    ...mapMutations('post', ['setCurrentPost']),

    // ON SET FORM DATA
    onSetFormData() {
      const { title, body } = this.currentPost;
      this.form.model = { title, body };
    },

    // GET CURRENT POST
    async getCurrentPost(id) {
      try {
        const { data: post } = await this.$http.get(`${jsonPlaceholder}${blog.posts}${id}`);
        this.setCurrentPost(post);
        this.onSetFormData();
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    // ON SUBMIT
    async onSubmit() {
      this.isLoading = true;

      try {
        await this.$http.put(
          `${jsonPlaceholder}${blog.posts}${this.$route.params.id}`,
          this.form.model,
        );
        const { userId, id, title, body } = this.currentPost;

        this.setCurrentPost({ userId, id, title, body });
        this.$router.push({ name: 'post', params: { id } });
      } catch (error) {
        console.error(error);
        this.isLoading = false;
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.edit-post-form {
  margin: 80px 0;
}
</style>
