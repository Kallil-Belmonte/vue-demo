<template>
  <main>
    <loader v-if="loading" />

    <b-container>
      <b-row>
        <b-col offset-md="2" md="8">
          <post-body v-if="currentPost" :post="currentPost" />
        </b-col>
      </b-row>
    </b-container>

    <delete-post-modal />
  </main>
</template>


<script>
import { mapState, mapMutations } from 'vuex';

import { INSTANCES, ENDPOINTS } from '@/core/Resource/Resource';
import Loader from '@/shared/Components/Loader';
import PostBody from '@/pages/News/Post/PostBody/PostBody';
import DeletePostModal from '@/pages/News/Post/DeletePostModal/DeletePostModal';

const { jsonPlaceholder } = INSTANCES;
const { blog } = ENDPOINTS;

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
        const { data } = await this.$http.get(`${jsonPlaceholder}${blog.posts}${this.$route.params.id}`);
        this.setCurrentPost(data);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  }
}
</script>
