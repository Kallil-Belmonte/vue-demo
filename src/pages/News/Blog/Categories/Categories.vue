<template>
  <aside>
    <ul class="list-group">
      <li
        :class="{
          'list-group-item d-flex justify-content-between align-items-center': true,
          active: isActive(category.name),
        }"
        v-for="category in categories"
        :key="category.name"
        @click="selectCategory(category.name)"
      >
        {{ category.name }}
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

import { Category } from '@/core/services/news/types';
import { CategoriesState } from '../_files/types';

export type Props = {
  categories: Category[];
};

const props = withDefaults<Props, any>(defineProps<Props>(), {
  categories: [],
});
const emits = defineEmits(['selectCategory']);

const state = reactive<CategoriesState>({
  activeCategory: '',
});

const isActive = (category: Category['name']) => state.activeCategory === category;

const selectCategory = (category: Category['name']) => {
  state.activeCategory = category === state.activeCategory ? '' : category;
  emits('selectCategory', category);
};
</script>

<style lang="scss" scoped>
@import '../../../../assets/scss/helpers/bootstrap-helpers';

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
</style>
