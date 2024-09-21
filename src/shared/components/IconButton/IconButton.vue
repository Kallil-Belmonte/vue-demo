<template>
  <button data-component="icon-button" class="flex-center" type="button" :disabled="disabled">
    <Icon :name="icon" :color="color" />
  </button>
</template>

<script lang="ts" setup>
import type { Icons } from '../Icon/types';
import Icon from '../Icon/Icon.vue';

type Props = {
  icon: Icons;
  size?: string;
  color?: string;
  disabled?: boolean;
};

const { icon, size = '20px', color, disabled } = defineProps<Props>();
</script>

<style lang="scss">
[data-component='icon-button'] {
  @include square(v-bind(size));
  padding: 0;

  &:hover,
  &:focus,
  &:active {
    color: $primary;
  }

  &[disabled] {
    color: $grey-4 !important;
    background-color: transparent !important;
  }
}
</style>
