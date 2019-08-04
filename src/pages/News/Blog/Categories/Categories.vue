<template>
  <aside>
    <div class="list-group">
      <button class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" type="button" :data-name="category.name" @click="$emit('selectCategory')" v-for="category in data" :key="category.name">
        {{ category.name }}
        <span class="badge badge-primary badge-pill">{{ category.posts }}</span>
      </button>
    </div>
  </aside>
</template>


<script>
export default {
  //==============================
  // GENERAL
  //==============================
  name: 'Categories',
  props: {
    data: Array,
  },
};
</script>
