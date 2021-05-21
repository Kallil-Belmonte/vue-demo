<template>
  <AppLoader v-if="isLoading" />

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
</template>

<script lang="ts">
import axios, { ENDPOINTS } from '@/core/api';
import AppLoader from '@/shared/components/AppLoader.vue';

const { blog } = ENDPOINTS;

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'DeletePostModal',
  components: {
    AppLoader,
  },

  //==============================
  // DATA
  //==============================
  data() {
    return {
      isLoading: false,
    };
  },

  //==============================
  // METHODS
  //==============================
  methods: {
    // ON DELETE POST
    async onDeletePost(): Promise<void> {
      this.isLoading = true;

      try {
        await axios.delete(`${blog.posts}${this.$route.params.id}`);
        this.$router.push({ name: 'blog' });
      } catch (error) {
        console.error(error);
        this.isLoading = false;
      }
    },
  },
};
</script>
