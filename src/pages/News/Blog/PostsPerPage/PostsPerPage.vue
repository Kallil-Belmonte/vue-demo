<template>
  <section class="post-filter">
    <b-form-row>
      <b-col md="2">
        <b-form-group label-for="filter" label="Posts per page:">
          <b-form-select id="filter" :value="postsPerPage" @change="$emit('change', $event)">
            <option :value="9">9</option>
            <option :value="18">18</option>
            <option :value="27">27</option>
            <option :value="36">36</option>
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-form-row>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  //==============================
  // GENERAL
  //==============================
  name: 'PostsPerPage',
  props: {
    postsPerPage: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.post-filter {
  margin-bottom: 10px;
}
</style>
