<template>
  <main>
    <AppLoader v-if="isLoading" />

    <b-container>
      <AppPageHeader icon="newspaper">Blog</AppPageHeader>

      <PostsPerPage
        :postsPerPage="postsPerPage"
        v-on:change="(value) => setPaginationSettings(this.posts, value)"
      />

      <b-row>
        <b-col md="9">
          <Posts :pages="pages" :currentPage="currentPage" />

          <Pagination
            :pages="Object.keys(pages)"
            :firstItem="firstPaginationItem"
            :maxItem="maxPaginationItem"
            :currentPage="currentPage"
            v-on:paginate="(target) => onPaginate(target)"
          />
        </b-col>
        <b-col md="3">
          <Categories
            :categories="categories"
            v-on:selectCategory="(category) => onSelectCategory(category)"
          />
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { mapState, mapMutations } from 'vuex';

import { Post } from '@/core/vuex/modules/blog';
import axios, { MOCKY_INSTANCE, ENDPOINTS } from '@/core/api';
import { groupArrayItemsInArrays } from '@/shared/helpers';
import AppLoader from '@/shared/components/AppLoader.vue';
import AppPageHeader from '@/shared/components/AppPageHeader.vue';
import PostsPerPage from '@/pages/News/Blog/PostsPerPage/PostsPerPage.vue';
import Posts from '@/pages/News/Blog/Posts/Posts.vue';
import Pagination from '@/pages/News/Blog/Pagination/Pagination.vue';
import Categories from '@/pages/News/Blog/Categories/Categories.vue';
import { BlogData } from './_files/types';

const { blog } = ENDPOINTS;

export default defineComponent({
  //==============================
  // GENERAL
  //==============================
  name: 'Blog',
  components: {
    AppLoader,
    AppPageHeader,
    PostsPerPage,
    Posts,
    Pagination,
    Categories,
  },

  //==============================
  // DATA
  //==============================
  data(): BlogData {
    return {
      groupArrayItemsInArrays,
      isLoading: true,
      pages: {},
      postsPerPage: 9,
      firstPaginationItem: 1,
      maxPaginationItem: 5,
      currentPage: 1,
    };
  },

  //==============================
  // COMPUTED
  //==============================
  computed: {
    ...mapState('blog', ['categories', 'posts']),
  },

  //==============================
  // LIFECYCLE HOOKS
  //==============================
  mounted() {
    this.getAllData();
  },

  //==============================
  // METHODS
  //==============================
  methods: {
    // MUTATIONS
    ...mapMutations('blog', ['setCategories', 'setPosts']),

    // SET PAGINATION SETTINGS
    setPaginationSettings(posts: Post[], quantPostsPerPage = 9): void {
      const pages: BlogData['pages'] = {};

      groupArrayItemsInArrays(posts, quantPostsPerPage).forEach((item, index) => {
        pages[index + 1] = item;
      });

      this.pages = pages;
      this.postsPerPage = quantPostsPerPage;
      this.firstPaginationItem = 1;
      this.maxPaginationItem = 5;
      this.currentPage = 1;
    },

    // GET ALL DATA
    async getAllData(): Promise<void> {
      try {
        if (!this.categories.length) {
          const { data: categories } = await MOCKY_INSTANCE.get(blog.categories);
          this.setCategories(categories);
        }

        if (!this.posts.length) {
          const { data: posts } = await axios.get(blog.posts);
          this.setPosts(posts);
        }

        this.setPaginationSettings(this.posts);
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    // ON SELECT CATEGORY
    async onSelectCategory(/* category */): Promise<void> {
      this.isLoading = true;

      try {
        const { data: posts } = await axios.get(blog.posts);

        this.setPosts(posts);
        this.setPaginationSettings(posts);
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    // ON PAGINATE
    onPaginate(target: string): void {
      switch (target) {
        case 'previous':
          this.firstPaginationItem = --this.firstPaginationItem;
          break;

        case 'next':
          this.firstPaginationItem = ++this.firstPaginationItem;
          break;

        default:
          this.currentPage = Number(target);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
main {
  min-height: 500px;
  padding: 80px 0 30px;
}
</style>
