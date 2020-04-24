<template>
  <aside>
    <b-list-group>
      <b-list-group-item
        v-for="category in categories"
        :key="category.name"
        :active="isCategoryActive(category.name)"
        class="d-flex justify-content-between align-items-center"
        @click="onSelectCategory(category.name)"
      >
        {{ category.name }}
        <b-badge variant="primary" pill>{{ category.posts }}</b-badge>
      </b-list-group-item>
    </b-list-group>
  </aside>
</template>


<script>
export default {
  //==============================
  // GENERAL
  //==============================
  name: 'Categories',
  props: {
    categories: Array,
  },


  //==============================
  // DATA
  //==============================
  data() {
    return {
      activeCategory: undefined,
    }
  },


  //==============================
  // METHODS
  //==============================
  methods: {
    // IS CATEGORY ACTIVE
    isCategoryActive(category) {
      return this.activeCategory === category;
    },

    // ON SELECT CATEGORY
    onSelectCategory(category) {
      this.activeCategory = category === this.activeCategory ? undefined : category;
      this.$emit('selectCategory', category);
    }
  },
};
</script>


<style lang="scss" scoped>
@import "../../../../assets/scss/helpers/bootstrap-helpers";

.list-group {
  cursor: pointer;

  .list-group-item {
    &.active {
      .badge-primary {
        color: $primary;
        background-color: #FFF;
      }
    }
  }
}
</style>
