<template>
  <main>
    <app-loader v-if="isLoading"></app-loader>

    <div class="container">
      <app-page-header icon="Newspaper">Blog</app-page-header>

      <blog-posts-per-page
        :postsPerPage="postsPerPage"
        @change="(value: number) => setPaginationSettings(posts, value)"
      ></blog-posts-per-page>

      <div class="row">
        <div class="col-md-9">
          <blog-posts :pages="pages" :currentPage="currentPage"></blog-posts>

          <blog-pagination
            :pages="Object.keys(pages)"
            :firstItem="firstPaginationItem"
            :maxItem="maxPaginationItem"
            :currentPage="currentPage"
            @paginate="paginate"
          ></blog-pagination>
        </div>
        <div class="col-md-3">
          <blog-categories
            :categories="categories"
            @selectCategory="selectCategory"
          ></blog-categories>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted } from 'vue';

import { Category, Post } from '@/core/services/news/types';
import { BlogState } from '@/pages/ModuleNews/Blog/_files/types';
import { groupArrayItemsInArrays } from '@/shared/helpers';
import { categories, posts, setCategories, setPosts } from '@/core/state/news';
import { getCategories, getPosts } from '@/core/services';
import { AppLoader, AppPageHeader } from '@/shared/components';
import BlogPostsPerPage from './BlogPostsPerPage/BlogPostsPerPage.vue';
import BlogPosts from './BlogPosts/BlogPosts.vue';
import BlogPagination from './BlogPagination/BlogPagination.vue';
import BlogCategories from './BlogCategories/BlogCategories.vue';

const state = reactive<BlogState>({
  isLoading: true,
  pages: {},
  postsPerPage: 9,
  firstPaginationItem: 1,
  maxPaginationItem: 5,
  currentPage: 1,
});
const { isLoading, pages, postsPerPage, firstPaginationItem, maxPaginationItem, currentPage } =
  toRefs(state);

const setPaginationSettings = (posts: Post[], quantPostsPerPage = 9) => {
  const pages: BlogState['pages'] = {};

  groupArrayItemsInArrays(posts, quantPostsPerPage).forEach((item, index) => {
    pages[index + 1] = item;
  });

  state.pages = pages;
  state.postsPerPage = quantPostsPerPage;
  state.firstPaginationItem = 1;
  state.maxPaginationItem = 5;
  state.currentPage = 1;
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
    console.error(error);
  } finally {
    state.isLoading = false;
  }
};

const selectCategory = async (category: Category['name']) => {
  console.log(category);
  state.isLoading = true;

  try {
    const response = await getPosts();
    setPosts(response);
    setPaginationSettings(response);
  } catch (error) {
    console.error(error);
  } finally {
    state.isLoading = false;
  }
};

const paginate = (target: string) => {
  switch (target) {
    case 'previous':
      state.firstPaginationItem = --state.firstPaginationItem;
      break;

    case 'next':
      state.firstPaginationItem = ++state.firstPaginationItem;
      break;

    default:
      state.currentPage = Number(target);
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  getAllData();
});
</script>

<style lang="scss" scoped>
main {
  min-height: 500px;
  padding: 80px 0 30px;
}
</style>
