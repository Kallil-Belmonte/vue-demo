<template>
  <nav data-component="pagination" class="d-inline-block" aria-label="Pagination">
    <ul class="pagination mb-0">
      <li class="page-item" v-if="firstItem > 1">
        <button class="page-link" type="button" @click="emit('paginate', 'previous')">
          Previous
        </button>
      </li>

      <li
        v-for="page in pageItems"
        :key="page"
        :class="{ 'page-item': true, active: isItemActive(page) }"
        @click="isItemActive(page) ? undefined : emit('paginate', page)"
      >
        <button class="page-link" type="button">{{ page }}</button>
      </li>

      <li class="page-item" v-if="endPages < pages.length">
        <button class="page-link" type="button" @click="emit('paginate', 'next')">Next</button>
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

const { pages = [], firstItem = 1, maxItem, currentPage } = defineProps<Props>();

const emit = defineEmits<{
  (event: 'paginate', target: string): void;
}>();

const startPages = computed(() => firstItem - 1);
const endPages = computed(() => startPages.value + maxItem);
const pageItems = computed(() => pages.slice(startPages.value, endPages.value));

const isItemActive = (page: string | number) => Number(page) === currentPage;
</script>
