<template>
  <main>
    <loader v-if="isLoading" />

    <featured-posts :posts="posts" />
  </main>
</template>


<script>
import { INSTANCES, ENDPOINTS } from '@/core/Resource/Resource';
import Loader from '@/shared/Components/Loader';
import FeaturedPosts from '@/pages/Home/FeaturedPosts/FeaturedPosts'

const { jsonPlaceholder } = INSTANCES;
const { blog } = ENDPOINTS;

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
      isLoading: true,
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
        const { data: posts } = await this.$http.get(`${jsonPlaceholder}${blog.posts}`);
        const [firstPost, secondPost, thirdPost] = posts;
        this.posts = [firstPost, secondPost, thirdPost];
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
}
</script>
