<template>
  <main>
    <loader v-if="loading"></loader>

    <b-container>
      <b-row>
        <b-col offset-md="2" md="8">
          <post-body v-if="currentPost" :post="currentPost"></post-body>
        </b-col>
      </b-row>
    </b-container>

    <delete-post-modal></delete-post-modal>
  </main>
</template>


<script>
import { mapState, mapMutations } from 'vuex';

import { INSTANCES, ENDPOINTS } from '@/core/Resource/Resource';
import Loader from '@/shared/Components/Loader';
import PostBody from '@/pages/News/Post/PostBody/PostBody';
import DeletePostModal from '@/pages/News/Post/DeletePostModal/DeletePostModal';

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'Post',
  components: {
    Loader,
    PostBody,
    DeletePostModal,
  },


  //==============================
  // DATA
  //==============================
  data() {
    return {
      loading: true,
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
    this.getCurrentPost();
  },


  //==============================
  // METHODS
  //==============================
  methods: {
    // MUTATIONS
    ...mapMutations('post', ['setCurrentPost']),

    // GET CURRENT POST
    async getCurrentPost() {
      try {
        const response = await this.$http.get(`${INSTANCES.jsonPlaceholder}${ENDPOINTS.blog.posts}${this.$route.params.id}`);
        this.setCurrentPost(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  }
}
</script>
