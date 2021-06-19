<template>
  <div :class="`alert alert-${variant} alert-dismissible fade show`" role="alert">
    <slot />

    <button
      type="button"
      class="close"
      data-dismiss="alert"
      aria-label="Close"
      @click="$emit('dismiss')"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  //==============================
  // GENERAL
  //==============================
  name: 'AppAlertDismissible',
  props: {
    variant: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.alert-dismissible {
  margin-top: 1rem;
}
</style>
