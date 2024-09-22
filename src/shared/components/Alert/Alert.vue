<template>
  <div data-component="Alert" role="alert" :class="status">
    <Icon :name="getIcon(status)" size="25px" />

    <div class="content">
      <slot></slot>
    </div>

    <IconButton v-if="close" icon="Close" size="15px" @click="close" />
  </div>
</template>

<script lang="ts" setup>
import type { Status } from '@/shared/files/types';
import { getIcon } from '@/shared/helpers';
import Icon from '../Icon/Icon.vue';
import IconButton from '../IconButton/IconButton.vue';

type Props = {
  status?: Status;
  close?: (event: MouseEvent) => void;
};

const { status = 'info', close } = defineProps<Props>();
</script>

<style lang="scss">
[data-component='Alert'] {
  @extend %flex-center-y;
  justify-content: space-between;
  padding: 15px;
  border-radius: 15px;
  border: 1px solid #eee;
  box-shadow: 0 0 8px 5px rgb(0, 0, 0, 3%);

  > [data-component='Icon'] {
    margin-right: 10px;
  }

  .content {
    width: 100%;
  }

  [data-component='IconButton'] {
    color: $grey-6;

    &:hover,
    &:focus,
    &:active {
      color: $dark-2;
    }
  }

  &.info {
    > [data-component='Icon'] {
      color: $info;
    }
  }

  &.success {
    > [data-component='Icon'] {
      color: $success;
    }
  }

  &.warning {
    > [data-component='Icon'] {
      color: $warning;
    }
  }

  &.danger {
    > [data-component='Icon'] {
      color: $danger;
    }
  }
}
</style>
