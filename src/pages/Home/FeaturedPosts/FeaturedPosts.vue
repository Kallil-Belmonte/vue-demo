<template>
  <section class="page-section">
    <div class="container">
      <h2 class="section-title">Featured posts</h2>

      <div class="row">
        <div class="col-md-4" v-for="featuredPost in featuredPosts" :key="featuredPost.id">
          <post-item :data="featuredPost"></post-item>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import PostItem from '@/shared/Components/PostItem';

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'FeaturedPosts',
  props: {
    featuredPosts: Array,
  },
  components: {
    PostItem,
  },
}
</script>
