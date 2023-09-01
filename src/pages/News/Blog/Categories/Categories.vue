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
import { reactive } from 'vue';

import type { Category } from '@/core/services/news/types';
import type { CategoriesState } from '@/pages/News/Blog/_files/types';

export type Props = {
  categories: Category[];
};

const props = withDefaults<Props, any>(defineProps<Props>(), {
  categories: [],
});
const emit = defineEmits(['selectCategory']);

const initialState: CategoriesState = {
  activeCategory: '',
};

const state = reactive(initialState);

const isActive = (category: Category['name']) => state.activeCategory === category;

const select = (category: Category['name']) => {
  state.activeCategory = category === state.activeCategory ? '' : category;
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
