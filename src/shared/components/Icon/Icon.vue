<template>
  <figure
    data-component="icon"
    :data-category="category"
    :data-name="name"
    v-html="svgs[name]"
  ></figure>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';

import type { ObjectType } from '@/shared/files/types';
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

const svgs = ref<ObjectType>({});

const setIcon = async () => {
  const response = await fetch(`/icons/${props.category}/${props.name}.svg`);
  const svgText = await response.text();
  svgs.value = { ...svgs.value, [props.name]: svgText };
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
