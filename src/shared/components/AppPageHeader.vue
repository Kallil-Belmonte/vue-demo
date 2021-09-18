<template>
  <section class="page-header">
    <AppIcon v-if="icon" class="d-block mx-auto" :icon="icon" :width="32" />

    <h1 class="title">
      <slot />
    </h1>
  </section>
</template>

<script lang="ts" setup>
import AppIcon from './AppIcon/AppIcon.vue';

const props = defineProps({
  icon: {
    type: String,
  },
});
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
