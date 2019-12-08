<template>
  <nav class="pagination d-inline-block" aria-label="Blog Pagination">
    <ul class="pagination mb-0">
      <li class="page-item" v-if="firstItem > 1">
        <button class="page-link" type="button" @click="$emit('paginate', 'previous')">Previous</button>
      </li>

      <li
        v-for="page in pagesItems"
        :key="page"
        :class="{ 'page-item': true, 'active': isItemActive(page) }"
      >
        <button class="page-link" type="button">{{ page }}</button>
      </li>

      <li class="page-item" v-if="endPages < pages.length">
        <button class="page-link" type="button" @click="$emit('paginate', 'next')">Next</button>
      </li>
    </ul>
  </nav>
</template>


<script>
export default {
  //==============================
  // GENERAL
  //==============================
  name: 'BlogPagination',
  props: {
    pages: {
      type: Array,
      default: [],
    },
    firstItem: {
      type: Number,
      default: 1,
    },
    maxItem: Number,
    currentPage: Number,
  },


  //==============================
  // DATA
  //==============================
  data() {
    return {
      startPages: undefined,
      endPages: undefined,
      pagesItems: [],
    }
  },


  //==============================
  // LIFECYCLE HOOKS
  //==============================
  mounted() {
    this.setInitialData();
  },


  //==============================
  // METHODS
  //==============================
  methods: {
    setInitialData() {
      this.startPages = this.firstItem - 1;
      this.endPages = this.startPages + this.maxItem;
      this.pagesItems = this.pages.slice(this.startPages, this.endPages);
    },

    isItemActive(page) {
      return page === this.currentPage;
    },
  },
};
</script>
