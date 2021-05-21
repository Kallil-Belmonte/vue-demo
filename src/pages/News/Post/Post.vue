<template>
  <main>
    <AppLoader v-if="isLoading" />

    <b-container>
      <b-row>
        <b-col offset-md="2" md="8">
          <PostBody v-if="currentPost" :post="currentPost" />
        </b-col>
      </b-row>
    </b-container>

    <DeletePostModal />
  </main>
</template>

<script lang="ts">
import { mapState, mapMutations } from 'vuex';

import axios, { ENDPOINTS } from '@/core/api';
import AppLoader from '@/shared/components/AppLoader.vue';
import PostBody from '@/pages/News/Post/PostBody/PostBody.vue';
import DeletePostModal from '@/pages/News/Post/DeletePostModal/DeletePostModal.vue';

const { blog } = ENDPOINTS;

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'Post',
  components: {
    AppLoader,
    PostBody,
    DeletePostModal,
  },

  //==============================
  // DATA
  //==============================
  data() {
    return {
      isLoading: true,
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
        const { data: post } = await axios.get(`${blog.posts}${this.$route.params.id}`);
        this.setCurrentPost(post);
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
