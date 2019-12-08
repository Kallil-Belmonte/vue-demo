<template>
  <nav class="pagination d-inline-block" aria-label="Blog Pagination">
    <ul class="pagination mb-0">
      <li class="page-item" v-if="firstItem > 1">
        <button class="page-link" type="button" @click="$emit('paginate', 'previous')">Previous</button>
      </li>

      <li
        v-for="page in pageItems"
        :key="page"
        :class="{ 'page-item': true, 'active': isItemActive(page) }"
        @click="isItemActive(page) ? undefined : $emit('paginate', Number(page))"
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
      default() {
        return []
      },
    },
    firstItem: {
      type: Number,
      default: 1,
    },
    maxItem: Number,
    currentPage: Number,
  },


  //==============================
  // COMPUTED
  //==============================
  computed: {
    startPages() {
      return this.firstItem - 1;
    },
    endPages() {
      return this.startPages + this.maxItem;
    },
    pageItems() {
      return this.pages.slice(this.startPages, this.endPages);
    },
  },


  //==============================
  // METHODS
  //==============================
  methods: {
    isItemActive(page) {
      return Number(page) === this.currentPage;
    },
  },
};
</script>
