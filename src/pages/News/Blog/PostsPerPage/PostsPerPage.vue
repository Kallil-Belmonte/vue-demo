<template>
  <section class="post-filter">
    <div class="row">
      <div class="col-md-2">
        <label for="filter" class="form-label">Posts per page:</label>
        <select
          id="filter"
          class="form-select"
          :value="postsPerPage"
          @change="emits('change', Number(($event.target as HTMLSelectElement).value))"
        >
          <option :value="9">9</option>
          <option :value="18">18</option>
          <option :value="27">27</option>
          <option :value="36">36</option>
        </select>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
export type Props = {
  postsPerPage: number;
};

const props = defineProps<Props>();
const emits = defineEmits(['change']);
</script>

<style lang="scss" scoped>
.post-filter {
  margin-bottom: 10px;
}
</style>
