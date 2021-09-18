<template>
  <component
    :is="iconComponent"
    v-bind="{ class: $props.class, width: $props.width, height: $props.height, fill: $props.fill }"
  ></component>
</template>

<script lang="ts" setup>
import { shallowRef, onMounted } from 'vue';

const props = defineProps({
  class: {
    type: String,
  },
  icon: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  fill: {
    type: String,
  },
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
