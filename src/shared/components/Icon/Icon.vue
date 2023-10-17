<template>
  <figure data-component="icon" :data-category="category" :data-name="name" v-html="svg"></figure>
</template>

<script lang="ts" setup>
import { ref, watchEffect, onUnmounted } from 'vue';

import { PROJECT_DOMAIN } from '@/shared/files/consts';
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
const mounted = ref(true);

const setIcon = async () => {
  const module = await import(`./icons/${props.category}/${props.name}.svg`);
  const request = new Request(module.default);
  const cache = await caches.open(`${PROJECT_DOMAIN}-icons`);
  let response = await cache.match(request);
  let svgHTML = '';

  if (response) {
    svgHTML = await response.text();
  } else {
    await cache.add(request);
    response = await cache.match(request);
    svgHTML = (await response?.text()) || '';
  }

  if (mounted) svg.value = svgHTML;
};

// LIFECYCLE HOOKS
watchEffect(() => {
  setIcon();
});

onUnmounted(() => {
  mounted.value = false;
});
</script>

<style lang="scss">
[data-component='icon'] {
  @extend %flex-center;
  @include square(v-bind(size));
  color: v-bind(color);
}
</style>
