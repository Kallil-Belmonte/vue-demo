<template>
  <div data-component="alert-dismissible" :class="`alert alert-${variant} fade show`" role="alert">
    <slot></slot>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
      @click="emit('dismiss')"
    ></button>
  </div>
</template>

<script lang="ts" setup>
import type { BootstrapVariants } from '@/shared/files/types';

type Props = {
  variant: BootstrapVariants;
};

const { variant } = defineProps<Props>();

const emit = defineEmits<{
  (event: 'dismiss'): void;
}>();
</script>

<style lang="scss">
[data-component='alert-dismissible'] {
  margin-top: 1rem;
}
</style>
