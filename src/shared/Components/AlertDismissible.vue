<template>
  <div :class="'alert alert-' + status + ' alert-dismissible fade show'" role="alert">
    <slot></slot>

    <button v-if="dismissible" @click="$emit('dismissAlert')" type="button" class="close" data-dismiss="alert" aria-label="Close">
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
    status: String,
    dismissible: Boolean
  }
};
</script>


<style lang="scss" scoped>
.alert-dismissible {
  margin-top: 1rem;
}
</style>
