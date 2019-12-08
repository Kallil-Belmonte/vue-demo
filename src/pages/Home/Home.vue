<template>
  <main>
    <loader v-if="loading" />

    <featured-posts :posts="posts" />
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
      posts: undefined,
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
    async getFeaturedPosts() {
      try {
        const response = await this.$http.get(`${INSTANCES.jsonPlaceholder}${ENDPOINTS.blog.posts}`);
        const [firstPost, secondPost, thirdPost] = response.data;
        this.posts = [firstPost, secondPost, thirdPost];
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
}
</script>
