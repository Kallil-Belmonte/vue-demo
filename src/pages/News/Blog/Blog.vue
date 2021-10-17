<template>
  <main>
    <AppLoader v-if="isLoading" />

    <div class="container">
      <AppPageHeader icon="Newspaper">Blog</AppPageHeader>

      <PostsPerPage
        :postsPerPage="postsPerPage"
        @change="(value: number) => setPaginationSettings(posts, value)"
      />

      <div class="row">
        <div class="col-md-9">
          <Posts :pages="pages" :currentPage="currentPage" />

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
import { reactive, toRefs, onMounted } from 'vue';

import { Category, Post } from '@/core/services/news/types';
import { BlogState } from '@/pages/News/Blog/_files/types';
import { groupArrayItemsInArrays } from '@/shared/helpers';
import { categories, posts, setCategories, setPosts } from '@/core/state/news';
import { getCategories, getPosts } from '@/core/services';
import AppLoader from '@/shared/components/AppLoader.vue';
import AppPageHeader from '@/shared/components/AppPageHeader.vue';
import PostsPerPage from './PostsPerPage/PostsPerPage.vue';
import Posts from './Posts/Posts.vue';
import Pagination from './Pagination/Pagination.vue';
import Categories from './Categories/Categories.vue';

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
