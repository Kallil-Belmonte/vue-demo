<template>
  <nav data-component="pagination" aria-label="Pagination" class="mx-auto">
    <ul class="d-flex">
      <li v-if="firstItem > 1">
        <button type="button" @click="emit('paginate', 'previous')">Previous</button>
      </li>

      <li v-for="page in pageItems" :key="page">
        <button
          :class="{ active: isActive(page) }"
          type="button"
          @click="isActive(page) ? undefined : emit('paginate', page)"
        >
          {{ page }}
        </button>
      </li>

      <li v-if="endPages < pages.length">
        <button type="button" @click="emit('paginate', 'next')">Next</button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

type Props = {
  pages: string[];
  firstItem: number;
  maxItem: number;
  currentPage: number;
};

type Emits = {
  (event: 'paginate', target: string): void;
};

const { pages = [], firstItem = 1, maxItem, currentPage } = defineProps<Props>();

const emit = defineEmits<Emits>();

const startPages = computed(() => firstItem - 1);
const endPages = computed(() => startPages.value + maxItem);
const pageItems = computed(() => pages.slice(startPages.value, endPages.value));

const isActive = (page: string | number) => Number(page) === currentPage;
</script>

<style lang="scss">
[data-component='pagination'] {
  width: max-content;

  li {
    button {
      border: 1px solid $primary;
      @include transitionAll();

      &:hover,
      &.active {
        color: #fff;
        background-color: $primary;
      }
    }

    &:first-child {
      button {
        border-radius: 4px 0 0 4px;
      }
    }

    &:last-child {
      button {
        border-radius: 0 4px 4px 0;
      }
    }

    &:not(:last-child) {
      button {
        border-right: 0;
      }
    }
  }
}
</style>
