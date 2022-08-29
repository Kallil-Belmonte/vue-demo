<template>
  <component
    :is="iconComponent"
    v-bind="{
      class: `${iconClass} ${props.class} d-flex align-items-center justify-content-center`,
      style: { width: size, height: size },
      ariaLabel,
      fill,
    }"
  ></component>
</template>

<script lang="ts" setup>
import { shallowRef, computed, watchEffect } from 'vue';

import { firstLetterToUpperCase } from '@/shared/helpers';
import { Icons } from './types';

type Props = {
  class?: string;
  name: Icons;
  size?: string;
  fill?: string;
};

const props = withDefaults(defineProps<Props>(), {
  class: '',
  fill: 'currentColor',
});

const iconComponent = shallowRef();

const iconClass = computed(() => {
  const convertLetters = (letter: string, index: number) => {
    const result = index && letter.match(/[A-Z]/) ? `-${letter}` : letter;
    return result.toLowerCase();
  };
  const iconName = props.name.split('').map(convertLetters).join('');
  return `${iconName}-icon`;
});

const ariaLabel = computed(() => {
  const className = iconClass.value.replaceAll('-', ' ');
  return firstLetterToUpperCase(className);
});

const setIconComponent = async () => {
  try {
    const module = await import(`./Icons/${props.name}Icon.vue`);
    iconComponent.value = module.default;
  } catch (error) {
    console.error(error);
  }
};

// LIFECYCLE HOOKS
watchEffect(() => {
  setIconComponent();
});
</script>
