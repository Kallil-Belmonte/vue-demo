<template>
  <section data-component="tooltip">
    <div class="anchor" @mouseenter="mouseenter" @mouseleave="mouseleave">
      <slot></slot>
    </div>
    <Teleport to="body">
      <div
        v-if="show"
        :style="contentStyle"
        :class="`tooltip-content animated fadeIn ${color} ${position}`"
      >
        {{ info }}
      </div>
    </Teleport>
  </section>
</template>

<script lang="ts" setup>
import { type StyleValue, ref } from 'vue';

import type { Variant } from '@/shared/files/types';
import { uuid } from '@/shared/helpers';

type Props = {
  info: string;
  maxWidth?: string;
  color?: Variant;
  position?:
    | 'top-left'
    | 'top'
    | 'top-right'
    | 'right'
    | 'bottom-left'
    | 'bottom'
    | 'bottom-right'
    | 'left';
  spacing?: string;
  zIndex?: number;
};

const {
  maxWidth = '300px',
  color = 'base',
  position = 'top',
  spacing = '10px',
  zIndex = 5,
} = defineProps<Props>();

const anchorName = `--tooltip-${uuid().split('-')[0]}`;

const contentStyle = { '--spacing': spacing, 'position-anchor': anchorName } as StyleValue;

const show = ref(false);

const mouseenter = () => {
  show.value = true;
};

const mouseleave = () => {
  show.value = false;
};
</script>

<style lang="scss">
[data-component='tooltip'] {
  > .anchor {
    width: max-content;
    anchor-name: v-bind(anchorName);
  }
}

.tooltip-content {
  color: #fff;
  width: max-content;
  max-width: v-bind(maxWidth);
  padding: 5px 10px;
  border-radius: 8px;
  animation-name: fadeIn;
  animation-duration: 0.6s;
  position: absolute;
  z-index: v-bind(zIndex);

  // COLOR

  // Base
  &.base {
    background-color: var(--dark-2);
  }

  // Primary
  &.primary {
    background-color: var(--primary);
  }

  // Secondary
  &.secondary {
    background-color: var(--secondary);
  }

  // POSITION

  // Top
  &.top-left {
    left: anchor(left);
    bottom: calc(anchor(top) + var(--spacing));
  }

  &.top {
    left: anchor(center);
    bottom: calc(anchor(top) + var(--spacing));
    translate: -50% 0;
  }

  &.top-right {
    right: anchor(right);
    bottom: calc(anchor(top) + var(--spacing));
  }

  // Right
  &.right {
    top: anchor(center);
    left: calc(anchor(right) + var(--spacing));
    translate: 0 -50%;
  }

  // Bottom
  &.bottom-left {
    top: calc(anchor(bottom) + var(--spacing));
    left: anchor(left);
  }

  &.bottom {
    top: calc(anchor(bottom) + var(--spacing));
    left: anchor(center);
    translate: -50% 0;
  }

  &.bottom-right {
    top: calc(anchor(bottom) + var(--spacing));
    right: anchor(right);
  }

  // Left
  &.left {
    top: anchor(center);
    right: calc(anchor(left) + var(--spacing));
    translate: -0 -50%;
  }
}
</style>
