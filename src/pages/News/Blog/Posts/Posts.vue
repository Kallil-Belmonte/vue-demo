<template>
  <section>
    <b-row>
      <b-col md="4" v-for="post of pages[currentPage]" :key="post.id">
        <post-item :post="post" />
      </b-col>
    </b-row>
  </section>
</template>


<script>
import PostItem from '@/shared/Components/PostItem';

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'Posts',
  props: {
    pages: Object,
    currentPage: Number,
  },
  components: {
    PostItem,
  },
};
</script>
