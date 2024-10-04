<template>
  <section data-component="PageHeader">
    <Icon v-if="icon" class="mx-auto" :name="icon" size="32px" />

    <h1 class="title">
      <slot></slot>
    </h1>
  </section>
</template>

<script lang="ts" setup>
import type { Icons } from '../Icon/types';
import Icon from '../Icon/Icon.vue';

type Props = {
  icon?: Icons;
};

const { icon } = defineProps<Props>();
</script>

<style lang="scss">
@import '@/assets/scss/helpers/_helpers.scss';

[data-component='PageHeader'] {
  [data-component='Icon'] {
    margin-bottom: 15px;
  }

  .title {
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 80px;
  }
}
</style>
