<template>
  <section class="page-section">
    <b-container>
      <h2 class="section-title">Featured posts</h2>

      <b-row>
        <b-col md="4" v-for="post in posts" :key="post.id">
          <post-item :post="post" />
        </b-col>
      </b-row>
    </b-container>
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
    posts: Array,
  },
  components: {
    PostItem,
  },
}
</script>
