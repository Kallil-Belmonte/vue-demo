<template>
  <nav class="pagination d-inline-block" aria-label="Pagination" @click="$emit('paginate')">
    <ul class="pagination mb-0">
      <li class="page-item" v-if="firstItem > 1">
        <button class="page-link" type="button">Previous</button>
      </li>

      <li class="page-item active">
        <button class="page-link" type="button">{{ firstItem }}</button>
      </li>

      <li class="page-item" v-if="secondItem <= totalItems">
        <button class="page-link" type="button">{{ secondItem }}</button>
      </li>

      <li class="page-item" v-if="thirdItem <= totalItems">
        <button class="page-link" type="button">{{ thirdItem }}</button>
      </li>

      <li class="page-item" v-if="fourthItem <= totalItems">
        <button class="page-link" type="button">{{ fourthItem }}</button>
      </li>

      <template v-if="fifthItem <= totalItems">
        <li class="page-item">
          <button class="page-link" type="button">{{ fifthItem }}</button>
        </li>

        <li class="page-item">
          <button class="page-link" type="button">Next</button>
        </li>
      </template>
    </ul>
  </nav>
</template>


<script>
export default {
  //==============================
  // GENERAL
  //==============================
  name: 'Pagination',
  props: {
    firstItem: {
      type: Number,
      default: 1
    },
    totalItems: Number,
  },


  //==============================
  // DATA
  //==============================
  data() {
    return {
      secondItem: null,
      thirdItem: null,
      fourthItem: null,
      fifthItem: null,
    }
  },


  //==============================
  // LIFECYCLE HOOKS
  //==============================
  updated() {
    this.setItemsValues();
  },


  //==============================
  // METHODS
  //==============================
  methods: {
    // SET ITEMS VALUES
    setItemsValues() {
      this.secondItem = this.firstItem + 1;
      this.thirdItem  = this.firstItem + 2;
      this.fourthItem = this.firstItem + 3;
      this.fifthItem  = this.firstItem + 4;
    },
  },
};
</script>
