<template>
  <div :class="`alert alert-${variant} alert-dismissible fade show`" role="alert">
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

const props = defineProps<Props>();
const emit = defineEmits(['dismiss']);
</script>

<style lang="scss" scoped>
.alert-dismissible {
  margin-top: 1rem;
}
</style>
