<template>
  <nav class="pagination d-inline-block" aria-label="Blog Pagination">
    <ul class="pagination mb-0">
      <li class="page-item" v-if="firstItem > 1">
        <button class="page-link" type="button" @click="emits('paginate', 'previous')">
          Previous
        </button>
      </li>

      <li
        v-for="page in pageItems"
        :key="page"
        :class="{ 'page-item': true, active: isItemActive(page) }"
        @click="isItemActive(page) ? undefined : emits('paginate', page)"
      >
        <button class="page-link" type="button">{{ page }}</button>
      </li>

      <li class="page-item" v-if="endPages < pages.length">
        <button class="page-link" type="button" @click="emits('paginate', 'next')">Next</button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

export type Props = {
  pages: string[];
  firstItem: number;
  maxItem: number;
  currentPage: number;
};

const props = withDefaults<Props, any>(defineProps<Props>(), {
  pages: [],
  firstItem: 1,
});
const emits = defineEmits(['paginate']);

const startPages = computed(() => props.firstItem - 1);
const endPages = computed(() => startPages.value + props.maxItem);
const pageItems = computed(() => props.pages.slice(startPages.value, endPages.value));

const isItemActive = (page: string | number) => Number(page) === props.currentPage;
</script>
