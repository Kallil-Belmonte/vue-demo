<template>
  <component
    :is="iconComponent"
    v-bind="{
      class: `${$props.class} d-flex align-items-center justify-content-center`,
      style: { width: size, height: size },
      fill: fill,
    }"
  ></component>
</template>

<script lang="ts" setup>
import { shallowRef, onMounted } from 'vue';

import { Icons } from './types';

type Props = {
  class?: string;
  icon: Icons;
  size?: string;
  fill?: string;
};

const props = withDefaults(defineProps<Props>(), {
  class: '',
  fill: 'currentColor',
});

const iconComponent = shallowRef();

const setIconComponent = async () => {
  try {
    const module = await import(`./Icons/App${props.icon}.vue`);
    iconComponent.value = module.default;
  } catch (error) {
    console.error(error);
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  setIconComponent();
});
</script>

<styled lang="scss" scoped>
[data-element='icon'] {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
</styled>
