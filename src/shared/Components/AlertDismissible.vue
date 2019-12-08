<template>
  <div :class="`alert alert-${variant} alert-dismissible fade show`" role="alert">
    <slot />

    <button @click="$emit('dismiss')" type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>


<script>
export default {
  //==============================
  // GENERAL
  //==============================
  name: 'AlertDismissible',
  props: {
    variant: String,
  },
};
</script>


<style lang="scss" scoped>
.alert-dismissible {
  margin-top: 1rem;
}
</style>
