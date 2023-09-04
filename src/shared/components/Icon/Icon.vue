<template>
  <figure data-component="icon" :data-category="category" :data-name="name" v-html="svg"></figure>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';

import type { Category, Icons } from './types';

type Props = {
  category?: Category;
  name: Icons;
  size?: string;
  color?: string;
};

const props = withDefaults(defineProps<Props>(), {
  category: 'UI',
  size: '100%',
});

const svg = ref('');

const setIcon = async () => {
  const response = await fetch(`/icons/${props.category}/${props.name}.svg`);
  const svgText = await response.text();
  svg.value = svgText;
};

// LIFECYCLE HOOKS
watchEffect(() => {
  setIcon();
});
</script>

<style lang="scss">
[data-component='icon'] {
  @extend %flex-center;
  @include square(v-bind(size));
  color: v-bind(color);
}
</style>
