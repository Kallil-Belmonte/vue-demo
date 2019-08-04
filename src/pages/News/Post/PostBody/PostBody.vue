<template>
  <section class="post-body">
    <article>
      <h1 class="title text-center">{{ data.title }}</h1>
      <p>{{ data.body }}</p>
    </article>
    <hr class="mt-4" />
    <div class="d-flex justify-content-end">
      <button class="btn btn-danger mr-3" type="button" @click="$emit('openModal')">Delete</button>
      <router-link class="btn btn-light" :to="{ name: 'edit-post', params: { id: data.id }}">
        Edit
      </router-link>
    </div>
  </section>
</template>


<script>
export default {
  //==============================
  // GENERAL
  //==============================
  name: 'PostBody',
  props: {
    data: Object,
  },
};
</script>


<style lang="scss" scoped>
.post-body {
  padding: 50px 0;

  .title {
    font-size: 32px;
    font-weight: 700;
    text-transform: capitalize;
    margin-bottom: 25px;
  }
}
</style>
