<template>
  <main>
    <loader v-if="loading"></loader>

    <featured-posts :featuredPosts="posts"></featured-posts>
  </main>
</template>


<script>
import { INSTANCES, ENDPOINTS } from '@/core/Resource/Resource';
import Loader from '@/shared/Components/Loader';
import FeaturedPosts from '@/pages/Home/FeaturedPosts/FeaturedPosts'

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'Home',
  components: {
    Loader,
    FeaturedPosts,
  },


  //==============================
  // DATA
  //==============================
  data() {
    return {
      loading: true,
      posts: null,
    }
  },


  //==============================
  // LIFECYCLE HOOKS
  //==============================
  mounted() {
    this.getFeaturedPosts();
  },


  //==============================
  // METHODS
  //==============================
  methods: {
    // GET FEATURED POSTS
    getFeaturedPosts() {
      this.$http.get(INSTANCES.jsonPlaceholder + ENDPOINTS.blog.posts)
        .then(response => {
          // Set Posts
          this.posts = [response.data[0], response.data[1], response.data[2]];
        })
        .catch(error => {
          console.error(error);
        })
        .then(() => {
          // Deactivate loader
          this.loading = false;
        });
    },
  },
}
</script>
