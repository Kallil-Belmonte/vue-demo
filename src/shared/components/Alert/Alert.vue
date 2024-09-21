<template>
  <div data-component="alert" role="alert" :class="status">
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
[data-component='alert'] {
  @extend %flex-center-y;
  justify-content: space-between;
  padding: 15px;
  border-radius: 15px;
  border: 1px solid #eee;
  box-shadow: 0 0 8px 5px rgb(0, 0, 0, 3%);

  > [data-component='icon'] {
    margin-right: 10px;
  }

  .content {
    width: 100%;
  }

  [data-component='icon-button'] {
    color: $grey-6;

    &:hover,
    &:focus,
    &:active {
      color: $dark-2;
    }
  }

  &.info {
    > [data-component='icon'] {
      color: $info;
    }
  }

  &.success {
    > [data-component='icon'] {
      color: $success;
    }
  }

  &.warning {
    > [data-component='icon'] {
      color: $warning;
    }
  }

  &.danger {
    > [data-component='icon'] {
      color: $danger;
    }
  }
}
</style>
