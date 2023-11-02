<template>
  <aside data-component="categories">
    <ul class="list-group">
      <li
        :class="{
          'list-group-item d-flex align-items-center justify-content-between': true,
          active: isActive(category.name),
        }"
        v-for="category in categories"
        :key="category.name"
        @click="select(category.name)"
      >
        {{ category.name }}
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

const props = defineProps<Props>();

const emit = defineEmits(['selectCategory']);

const activeCategory = ref<Category['name']>();

const isActive = (category: Category['name']) => activeCategory.value === category;

const select = (category: Category['name']) => {
  activeCategory.value = category === activeCategory.value ? '' : category;
  emit('selectCategory', category);
};
</script>

<style lang="scss">
[data-component='categories'] {
  .list-group {
    cursor: pointer;

    .list-group-item {
      &.active {
        .badge-primary {
          color: $primary;
          background-color: #fff;
        }
      }
    }
  }
}
</style>
