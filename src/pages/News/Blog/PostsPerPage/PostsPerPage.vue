<template>
  <section data-component="posts-per-page">
    <div class="row">
      <div class="col-md-2">
        <label for="filter" class="form-label">Posts per page:</label>
        <select
          id="filter"
          class="form-select"
          :value="postsPerPage"
          @change="emit('change', Number(($event.target as HTMLSelectElement).value))"
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

const { postsPerPage } = defineProps<Props>();

const emit = defineEmits<{
  (event: 'change', value: number): void;
}>();
</script>

<style lang="scss">
[data-component='posts-per-page'] {
  margin-bottom: 10px;
}
</style>
