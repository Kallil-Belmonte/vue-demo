<template>
  <section>
    <div class="row">
      <div class="col-md-4" v-for="post of data[page]" :key="post.id">
        <post-item :data="post"></post-item>
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
    data: Array,
    page: Number,
  },
  components: {
    PostItem,
  },
};
</script>
