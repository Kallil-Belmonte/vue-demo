<template>
  <nav class="pagination d-inline-block" aria-label="Blog Pagination">
    <ul class="pagination mb-0">
      <li class="page-item" v-if="firstItem > 1">
        <button class="page-link" type="button" @click="$emit('paginate', 'previous')">
          Previous
        </button>
      </li>

      <li
        v-for="page in pageItems"
        :key="page"
        :class="{ 'page-item': true, active: isItemActive(page) }"
        @click="isItemActive(page) ? undefined : $emit('paginate', page)"
      >
        <button class="page-link" type="button">{{ page }}</button>
      </li>

      <li class="page-item" v-if="endPages < pages.length">
        <button class="page-link" type="button" @click="$emit('paginate', 'next')">Next</button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  //==============================
  // GENERAL
  //==============================
  name: 'Pagination',
  props: {
    pages: {
      type: Array,
      default() {
        return [];
      },
      required: true,
    },
    firstItem: {
      type: Number,
      default: 1,
      required: true,
    },
    maxItem: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },

  //==============================
  // COMPUTED
  //==============================
  computed: {
    startPages(): number {
      return this.firstItem - 1;
    },
    endPages(): number {
      return this.startPages + this.maxItem;
    },
    pageItems(): number[] {
      return this.pages.slice(this.startPages, this.endPages);
    },
  },

  //==============================
  // METHODS
  //==============================
  methods: {
    // IS ITEM ACTIVE
    isItemActive(page: string | number) {
      return Number(page) === this.currentPage;
    },
  },
});
</script>
