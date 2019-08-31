<template>
  <main>
    <loader v-if="loading"></loader>

    <div class="container">
      <div class="row">
        <div class="offset-md-2 col-md-8">
          <post-body v-if="currentPost" :data="currentPost" v-on:openModal="onToggleModal()"></post-body>
        </div>
      </div>
    </div>

    <delete-post-modal :open="isModalOpen" v-on:closeModal="onToggleModal()"></delete-post-modal>
  </main>
</template>


<script>
import { mapState, mapMutations } from 'vuex';

import ThemeFunctions from '@/shared/General/ThemeFunctions';
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
      isModalOpen: false,
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
    getCurrentPost() {
      this.$http.get(INSTANCES.jsonPlaceholder + ENDPOINTS.blog.posts + this.$route.params.id)
        .then(response => {
          // Set current post to store
          this.setCurrentPost(response.data);
        })
        .catch(error => {
          console.error(error);
        })
        .then(() => {
          // Deactivate loader
          this.loading = false;
        });
    },

    // ON TOGGLE MODAL
    onToggleModal() {
      // Toggle styles
      ThemeFunctions.toggleModalStyles(this.isModalOpen);

      // Toggle modal
      this.isModalOpen = !this.isModalOpen;
    },
  }
}
</script>
