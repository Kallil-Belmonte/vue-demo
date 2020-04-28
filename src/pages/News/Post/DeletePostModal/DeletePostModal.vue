<template>
  <fragment>
    <loader v-if="isLoading" />

    <b-modal
      id="delete-post-modal"
      title="Delete confirmation"
      ok-title="Confirm"
      cancel-title="Cancel"
      cancel-variant="light"
      @ok="onDeletePost()"
    >
      <p class="text-center mb-0">Are you sure you want to delete this post?</p>
    </b-modal>
  </fragment>
</template>


<script>
import { INSTANCES, ENDPOINTS } from '@/core/Resource/Resource';
import Loader from '@/shared/Components/Loader';

const { jsonPlaceholder } = INSTANCES;
const { blog } = ENDPOINTS;

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'DeletePostModal',
  components: {
    Loader,
  },

  //==============================
  // DATA
  //==============================
  data() {
    return {
      isLoading: false,
    }
  },


  //==============================
  // METHODS
  //==============================
  methods: {
    // ON DELETE POST
    async onDeletePost() {
      this.isLoading = true;

      try {
        await this.$http.delete(`${jsonPlaceholder}${blog.posts}${this.$route.params.id}`);
        this.$router.push({ name: 'blog' });
      } catch (error) {
        console.error(error);
        this.isLoading = false;
      }
    },
  },
};
</script>
