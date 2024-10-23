<template>
  <div data-component="PostItem">
    <img v-if="post.image" class="img-fluid" :src="post.image" alt="Cover" />
    <div v-else class="img-placeholder">No image for this post</div>

    <article>
      <h3 class="title">{{ post.title }}</h3>
      <p v-if="post.body" class="mb-0">{{ limitWords(post.body, 8) }}</p>
      <Button class="mt-3" :route="{ name: 'post', params: { id: post.id } }">Read more</Button>
    </article>
  </div>
</template>

<script lang="ts" setup>
import type { Post } from '@/core/services/news/types';
import { limitWords } from '@/shared/helpers';
import { Button } from '@/shared/components';

type Props = {
  post: Post;
};

const { post } = defineProps<Props>();
</script>

<style lang="scss">
@use '@/assets/scss/helpers' as *;

[data-component='PostItem'] {
  text-align: center;
  margin-bottom: 50px;

  img {
    display: block;
    @include square(100px);
    margin: 0 auto 10px;
  }

  .img-placeholder {
    font-weight: 700;
    color: #fff;
    padding: 20px;
    border-radius: 5px 5px 0 0;
    background-color: $primary;
  }

  article {
    padding: 20px;
    border-radius: 0 0 5px 5px;
    box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.1);

    .title {
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>
