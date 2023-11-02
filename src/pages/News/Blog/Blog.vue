<template>
  <main data-page="blog">
    <Loader v-if="loading" />

    <div class="container">
      <PageHeader icon="Newspaper">Blog</PageHeader>

      <PostsPerPage
        :postsPerPage="postsPerPage"
        @change="(value: number) => setPaginationSettings(posts, value)"
      />

      <div class="row">
        <div class="col-md-9">
          <Posts :currentPage="currentPage" :pages="pages" />

          <Pagination
            :pages="Object.keys(pages)"
            :firstItem="firstPaginationItem"
            :maxItem="maxPaginationItem"
            :currentPage="currentPage"
            @paginate="paginate"
          />
        </div>
        <div class="col-md-3">
          <Categories :categories="categories" @selectCategory="selectCategory" />
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import type { Category, Post } from '@/core/services/news/types';
import { groupArrayItemsInArrays } from '@/shared/helpers';
import { categories, posts, setCategories, setPosts } from '@/core/state/news';
import { getCategories, getPosts } from '@/core/services';
import { Loader, PageHeader } from '@/shared/components';
import PostsPerPage from './PostsPerPage/PostsPerPage.vue';
import Posts from './Posts/Posts.vue';
import Pagination from './Pagination/Pagination.vue';
import Categories from './Categories/Categories.vue';

type Pages = { [key: string]: Post[] };

const loading = ref(true);
const pages = ref<Pages>({});
const postsPerPage = ref(9);
const firstPaginationItem = ref(1);
const maxPaginationItem = ref(5);
const currentPage = ref(1);

const setPaginationSettings = (posts: Post[], quantPostsPerPage = 9) => {
  const pagesResult: Pages = {};

  groupArrayItemsInArrays(posts, quantPostsPerPage).forEach((item: Post[], index) => {
    pagesResult[index + 1] = item;
  });

  pages.value = pagesResult;
  postsPerPage.value = quantPostsPerPage;
  firstPaginationItem.value = 1;
  maxPaginationItem.value = 5;
  currentPage.value = 1;
};

const getAllData = async () => {
  try {
    if (!categories.value.length) {
      const response = await getCategories();
      setCategories(response);
    }

    if (!posts.value.length) {
      const response = await getPosts();
      setPosts(response);
    }

    setPaginationSettings(posts.value);
  } catch (error) {
    console.log('AQUI');
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const selectCategory = async (category: Category['name']) => {
  loading.value = true;

  try {
    const response = await getPosts();
    setPosts(response);
    setPaginationSettings(response);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const paginate = (target: string) => {
  switch (target) {
    case 'previous':
      firstPaginationItem.value = --firstPaginationItem.value;
      break;

    case 'next':
      firstPaginationItem.value = ++firstPaginationItem.value;
      break;

    default:
      currentPage.value = Number(target);
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  getAllData();
});
</script>

<style lang="scss">
[data-page='blog'] {
  min-height: 500px;
  padding: 80px 0 30px;
}
</style>
