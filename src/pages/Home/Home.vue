<template>
  <main>
    <loader v-if="isLoading" />

    <featured-posts :posts="featuredPosts" />
  </main>
</template>


<script>
import { mapState, mapMutations } from 'vuex';

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
      isLoading: false,
      featuredPosts: undefined,
    }
  },


  //==============================
  // COMPUTED
  //==============================
  computed: {
    ...mapState('blog', ['posts']),
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
    // MUTATIONS
    ...mapMutations('blog', ['setPosts']),

    // GET FEATURED POSTS
    async getFeaturedPosts() {
      if (this.posts.length) {
        const [firstPost, secondPost, thirdPost] = this.posts;
        this.featuredPosts = [firstPost, secondPost, thirdPost];
      } else {
        this.isLoading = true;

        try {
          const { data: posts } = await this.$http.get(`${jsonPlaceholder}${blog.posts}`);
          const [firstPost, secondPost, thirdPost] = posts;
          this.featuredPosts = [firstPost, secondPost, thirdPost];
          this.setPosts(posts);
        } catch (error) {
          console.error(error);
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
}
</script>
