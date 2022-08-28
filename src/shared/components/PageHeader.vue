<template>
  <section class="page-header">
    <Icon v-if="icon" class="d-block mx-auto" :name="icon" size="32px" />

    <h1 class="title">
      <slot></slot>
    </h1>
  </section>
</template>

<script lang="ts" setup>
import { Icons } from './Icon/types';
import Icon from './Icon/Icon.vue';

type Props = {
  icon?: Icons;
};

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.page-header {
  .icon {
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
