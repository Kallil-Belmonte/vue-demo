<template>
  <div
    data-component="Icon"
    :data-category="category"
    :data-name="name"
    v-html="icons[category]?.[name]"
  ></div>
</template>

<script lang="ts" setup>
import { onUnmounted, watchEffect } from 'vue';

import { addIcon, icons } from '@/core/state/icons';
import type { Category, Icons } from './types';

type Props = {
  category?: Category;
  name: Icons;
  size?: string;
  color?: string;
};

const { category = 'UI', name, size = '100%', color = 'inherit' } = defineProps<Props>();

let controller: null | AbortController = null;

const setIcon = async () => {
  if (icons.value[category]?.[name]) return;

  controller = new AbortController();
  const response = await fetch(`/icons/${category}/${name}.svg`, { signal: controller.signal });
  const svgHTML = await response.text();
  addIcon(category, name, svgHTML);
};

// LIFECYCLE HOOKS
watchEffect(() => {
  setIcon();
});

onUnmounted(() => {
  if (controller) controller.abort();
});
</script>

<style lang="scss">
[data-component='Icon'] {
  @extend %flex-center;
  @include square(v-bind(size));
  color: v-bind(color);
}
</style>
