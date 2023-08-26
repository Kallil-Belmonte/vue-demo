<template>
  <component
    :is="iconComponent"
    :class="`${iconClass} flex-center ${props.class}`"
    :ariaLabel="ariaLabel"
    :size="size"
    :color="color"
  ></component>
</template>

<script lang="ts" setup>
import { shallowRef, computed, watchEffect } from 'vue';

import { firstLetterToUpperCase } from '@/shared/helpers';
import type { Icons } from './_types';

type Props = {
  class?: string;
  name: Icons;
  size?: string;
  color?: string;
};

const props = withDefaults(defineProps<Props>(), {
  class: '',
  size: '100%',
  color: 'currentColor',
});

const iconComponent = shallowRef();

const iconClass = computed(() => {
  const convertLetters = (letter: string, index: number) => {
    const result = index && letter.match(/[A-Z]/) ? `-${letter}` : letter;
    return result.toLowerCase();
  };
  const iconName = props.name.split('').map(convertLetters).join('');
  return iconName;
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
