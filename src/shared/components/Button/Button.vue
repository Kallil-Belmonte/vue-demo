<template>
  <button
    data-component="Button"
    :class="variant"
    :type="type"
    :disabled="disabled || loading"
    @click="click"
  >
    <Icon v-if="loading" class="mx-auto" name="Loading" color="#fff" size="30px" />

    <slot v-if="!loading"></slot>
  </button>
</template>

<script lang="ts" setup>
import type { ButtonHTMLAttributes } from 'vue';

import { type RouteLocationRaw, useRouter } from 'vue-router';

import type { Variant } from '@/shared/files/types';
import Icon from '../Icon/Icon.vue';

type Props = {
  type?: ButtonHTMLAttributes['type'];
  variant?: Variant;
  route?: RouteLocationRaw;
  loading?: boolean;
  disabled?: boolean;
  click?: (event: MouseEvent) => void;
};

const {
  type = 'button',
  variant = 'primary',
  route,
  loading,
  disabled,
  click: clickProp,
} = defineProps<Props>();

const router = useRouter();

const click = (event: MouseEvent) => {
  clickProp?.(event);
  if (route) router.push(route);
};
</script>

<style lang="scss">
[data-component='Button'] {
  width: max-content;
  border-radius: 50px;
  box-shadow: none;
  @include transitionAll();

  /* Primary */

  &.primary {
    color: #fff;
    background-color: $primary;
  }

  &.primary:hover,
  &.primary:focus,
  &.primary:active {
    background-color: $primary-darker;
  }

  /* Secondary */

  &.secondary {
    color: #fff;
    background-color: $secondary;
  }

  &.secondary:hover,
  &.secondary:focus,
  &.secondary:active {
    background-color: $secondary-darker;
  }

  /* Base */

  &.base {
    background-color: #fff;
    border: 1px solid $grey-4;
  }

  &.base:hover,
  &.base:focus,
  &.base:active {
    background-color: color.adjust(#fff, $lightness: -1%);
  }
}
</style>
