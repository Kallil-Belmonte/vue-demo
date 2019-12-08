<template>
  <section>
    <div class="row">
      <div class="col-md-4" v-for="post of pages[currentPage]" :key="post.id">
        <post-item :post="post" />
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
