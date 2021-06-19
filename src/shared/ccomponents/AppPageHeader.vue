<template>
  <section class="page-header">
    <font-awesome-icon v-if="icon" :icon="icon" class="icon d-block mx-auto" />
    <h1 class="title">
      <slot />
    </h1>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  //==============================
  // GENERAL
  //==============================
  name: 'AppPageHeader',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.page-header {
  .icon {
    font-size: 32px;
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
