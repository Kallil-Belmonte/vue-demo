<template>
  <div class="post-item">
    <img v-if="data.image" class="img-fluid" :src="data.image" alt="Capa" />
    <div v-else class="img-placeholder">Não há imagem para esse post</div>

    <article>
      <h3 class="title">{{ data.title }}</h3>
      <p v-if="data.body" class="mb-0">{{ data.body | limitWords(8) }}</p>
      <router-link class="btn btn-primary mt-3" :to="{ name: 'post', params: { id: data.id }}">
        Read more
      </router-link>
    </article>
  </div>
</template>


<script>
export default {
  //==============================
  // GENERAL
  //==============================
  name: 'PostItem',
  props: {
    data: Object,
  }
};
</script>


<style lang="scss" scoped>
@import "../../assets/scss/helpers/bootstrap-helpers";
@import "../../assets/scss/helpers/helpers";

.post-item {
  text-align: center;
  margin-bottom: 50px;

  img {
    display: block;
    @include square(100px);
    margin: 0 auto 10px;
  }

  .img-placeholder {
    font-weight: 700;
    color: #FFF;
    padding: 20px;
    @include border-top-radius(5px);
    background-color: $primary;
  }

  article {
    padding: 20px;
    @include border-bottom-radius(5px);
    box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.1);

    .title {
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>
