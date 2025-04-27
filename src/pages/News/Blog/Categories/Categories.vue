<template>
  <aside data-component="Categories">
    <ul>
      <li v-for="category in categories" :key="category.name">
        <button
          :class="{ active: isActive(category.name) }"
          type="button"
          @click="isActive(category.name) ? undefined : select(category.name)"
        >
          {{ category.name }}
        </button>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import type { Category } from '@/core/services/news/types';

type Props = {
  categories: Category[];
};

type Emits = {
  (event: 'selectCategory', category: string): void;
};

const { categories } = defineProps<Props>();

const emit = defineEmits<Emits>();

const activeCategory = ref<Category['name']>();

const isActive = (category: Category['name']) => activeCategory.value === category;

const select = (category: Category['name']) => {
  activeCategory.value = category === activeCategory.value ? '' : category;
  emit('selectCategory', category);
};
</script>

<style lang="scss">
[data-component='Categories'] {
  li {
    button {
      width: 100%;
      border: 1px solid var(--primary);
      @include transitionAll();

      &:hover,
      &.active {
        color: #fff;
        background-color: var(--primary);
      }

      &.active {
        cursor: auto;
      }
    }

    &:first-child {
      button {
        border-radius: 4px 4px 0 0;
      }
    }

    &:last-child {
      button {
        border-radius: 0 0 4px 4px;
      }
    }

    &:not(:last-child) {
      button {
        border-bottom: 0;
      }
    }
  }
}
</style>
