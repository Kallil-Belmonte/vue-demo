<template>
  <button
    data-component="Button"
    :class="variant"
    :type="type"
    :disabled="disabled || loading"
    @click="click"
  >
    <Icon v-if="loading" name="Loading" color="#fff" />
    <Icon v-else-if="name" :name="name" :color="color" :size="size" />

    <slot v-if="!loading"></slot>
  </button>
</template>

<script lang="ts" setup>
import type { ButtonHTMLAttributes } from 'vue';

import { type RouteLocationRaw, useRouter } from 'vue-router';

import type { Variant } from '@/shared/files/types';
import type { Icons } from '../Icon/types';
import Icon from '../Icon/Icon.vue';

type Props = {
  type?: ButtonHTMLAttributes['type'];
  variant?: Variant | 'icon' | 'icon-base' | 'icon-primary' | 'icon-secondary';
  route?: RouteLocationRaw;
  icon?: { name: Icons; color?: string; size?: string };
  loading?: boolean;
  disabled?: boolean;
  click?: (event: MouseEvent) => void;
};

const {
  type = 'button',
  variant = 'primary',
  route,
  icon,
  loading,
  disabled,
  click: clickProp,
} = defineProps<Props>();
const { name, color, size = '20px' } = icon || {};

const router = useRouter();

const click = (event: MouseEvent) => {
  clickProp?.(event);
  if (route) router.push(route);
};
</script>

<style lang="scss">
$icon-size: 60%;

[data-component='Button'] {
  @extend %flex-center;
  gap: 10px;
  font-weight: 700;
  box-shadow: none;
  transition: background-color 0.4s ease;
  overflow: hidden;

  [data-component='Icon'][data-name='Loading'] {
    @include square($icon-size);
  }

  // VARIANT

  // Base
  // Primary
  // Secondary
  &.base,
  &.primary,
  &.secondary {
    width: 100%;
    border-radius: 50px;
  }

  // Base
  &.base {
    background-color: #fff;
    border: 1px solid $grey-4;

    @include active-style {
      background-color: color.adjust(#fff, $lightness: -1%);
    }
  }

  // Primary
  &.primary {
    color: #fff;
    background-color: $primary;

    @include active-style {
      background-color: $primary-darker;
    }
  }

  // Secondary
  &.secondary {
    color: #fff;
    background-color: $secondary;

    @include active-style {
      background-color: $secondary-darker;
    }
  }

  // Icon
  // Icon Base
  // Icon Primary
  // Icon Secondary
  &.icon,
  &.icon-base,
  &.icon-primary,
  &.icon-secondary {
    @include square(v-bind(size));
    padding: 0;
  }

  // Icon Base
  // Icon Primary
  // Icon Secondary
  &.icon-base,
  &.icon-primary,
  &.icon-secondary {
    border-radius: 25%;

    [data-component='Icon'] {
      @include square($icon-size);
    }
  }

  // Icon Primary
  // Icon Secondary
  &.icon-primary,
  &.icon-secondary {
    color: #fff;
  }

  // Icon
  &.icon {
    color: $grey-7;

    @include active-style {
      color: $dark-1;
    }

    [data-component='Icon'] {
      @include square(100%);
    }
  }

  // Icon Base
  &.icon-base {
    background-color: #fff;
    border: 1px solid $grey-4;

    @include active-style {
      background-color: color.adjust(#fff, $lightness: -1%);
    }
  }

  // Icon Primary
  &.icon-primary {
    background-color: $primary;

    @include active-style {
      background-color: $primary-darker;
    }
  }

  // Icon Secondary
  &.icon-secondary {
    background-color: $secondary;

    @include active-style {
      background-color: $secondary-darker;
    }
  }
}
</style>
