<template>
  <figure
    data-component="icon"
    :data-name="name"
    :style="{ '--size': size, '--color': color }"
    v-html="svg"
  ></figure>
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

const setImage = async () => {
  const response = await fetch(`/images/icons/${props.category}/${props.name}.svg`);
  const svgText = await response.text();
  svg.value = svgText;
};

// LIFECYCLE HOOKS
watchEffect(() => {
  setImage();
});
</script>

<style lang="scss" scoped>
[data-component='icon'] {
  @extend %flex-center;
  @include square(var(--size));
  color: var(--color);
}
</style>
