<template>
  <section class="page-header">
    <font-awesome-icon v-if="icon" :icon="icon" class="icon d-block mx-auto" />
    <h1 class="title">
      <slot />
    </h1>
  </section>
</template>


<script>
export default {
  //==============================
  // GENERAL
  //==============================
  name: 'PageHeader',
  props: {
    icon: String,
  }
};
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
