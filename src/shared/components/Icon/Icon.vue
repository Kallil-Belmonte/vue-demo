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
import { shallowRef, computed, onMounted } from 'vue';

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
const { name } = props;

const iconComponent = shallowRef();

const iconClass = computed(() => {
  const convertLetters = (letter: string, index: number) => {
    const result = index && letter.match(/[A-Z]/) ? `-${letter}` : letter;
    return result.toLowerCase();
  };
  const iconName = name.split('').map(convertLetters).join('');
  return `${iconName}-icon`;
});

const ariaLabel = computed(() => {
  const className = iconClass.value.replaceAll('-', ' ');
  return `${className.charAt(0).toUpperCase()}${className.slice(1)}`;
});

const setIconComponent = async () => {
  try {
    const module = await import(`./Icons/${name}Icon.vue`);
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
