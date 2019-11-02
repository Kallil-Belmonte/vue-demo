<template>
  <fragment>
    <loader v-if="loading"></loader>

    <vue-form class="edit-post-form" :state="form.state" @submit.prevent="onSubmit">
      <validate class="form-group">
        <label for="title">Title</label>
        <input v-model="form.values.title" id="title" :class="Helpers.setInputClassName(form.state.title)" type="text" name="title" required />

        <field-messages name="title" show="$touched">
          <div slot="required" class="invalid-feedback d-block">Title is required</div>
        </field-messages>
      </validate>

      <validate class="form-group">
        <label for="body">Body</label>
        <textarea v-model="form.values.body" id="body" :class="Helpers.setInputClassName(form.state.body)" type="text" name="body" rows="6" required />

        <field-messages name="body" show="$touched">
          <div slot="required" class="invalid-feedback d-block">Body is required</div>
        </field-messages>
      </validate>

      <button class="btn btn-primary mr-2" type="submit" :disabled="!form.state.$valid || form.state.$pristine">Edit</button>
      <button class="btn btn-light" type="button" :disabled="form.state.$pristine" @click="onResetForm()">Reset form</button>
    </vue-form>
  </fragment>
</template>


<script>
import { mapState, mapMutations } from 'vuex';

import * as Helpers from '@/shared/Helpers';
import { INSTANCES, ENDPOINTS } from '@/core/Resource/Resource';
import Loader from '@/shared/Components/Loader';

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
      loading: true,
      form: {
        state: {},
        values: {
          title: null,
          body: null,
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

    // SET LOADING
    setLoading(value) {
      this.loading = value;
    },

    // GET CURRENT POST
    async getCurrentPost(id) {
      try {
        const response = await this.$http.get(`${INSTANCES.jsonPlaceholder}${ENDPOINTS.blog.posts}${id}`);

        this.setCurrentPost(response.data);
        this.form.values = {
          title: this.currentPost.title,
          body: this.currentPost.body,
        };
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.setLoading(false);
      }
    },

    // ON RESET FORM
    onResetForm() {
      this.form.values = {
        title: null,
        body: null,
      };
    },

    // ON SUBMIT
    async onSubmit() {
      this.setLoading(true);

      try {
        await this.$http.put(
          `${INSTANCES.jsonPlaceholder}${ENDPOINTS.blog.posts}${this.$route.params.id}`,
          this.form.values,
        );

        this.setCurrentPost({
          userId: this.currentPost.userId,
          id: this.currentPost.id,
          title: this.form.values.title,
          body:  this.form.values.body,
        });

        this.$router.push({ name: 'edit-post', params: { id: this.currentPost.id } });
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.setLoading(false);
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
