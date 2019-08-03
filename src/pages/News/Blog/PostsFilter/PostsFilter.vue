<template>
  <section class="post-filter">
    <div class="form-row">
      <div class="col-md-2">
        <div class="form-group">
          <label for="filter">Posts per page:</label>
          <select id="filter" class="form-control" @change="$emit('filterPosts')">
            <option value="9">9</option>
            <option value="18">18</option>
            <option value="27">27</option>
            <option value="36">36</option>
          </select>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  //==============================
  // GENERAL
  //==============================
  name: 'PostsFilter',
};
</script>


<style lang="scss" scoped>
.post-filter {
  margin-bottom: 10px;
}
</style>
