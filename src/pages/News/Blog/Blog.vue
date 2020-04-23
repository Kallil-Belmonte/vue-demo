<template>
  <main>
    <loader v-if="isLoading" />

    <b-container>
      <page-header icon="newspaper">Blog</page-header>

      <posts-per-page
        :postsPerPage="postsPerPage"
        v-on:change="(value) => setPaginationSettings(this.posts, value)"
      />

      <b-row>
        <b-col md="9">
          <posts :pages="pages" :currentPage="currentPage" />

          <blog-pagination
            :pages="Object.keys(pages)"
            :firstItem="firstPaginationItem"
            :maxItem="maxPaginationItem"
            :currentPage="currentPage"
            v-on:paginate="(target) => onPaginate(target)"
          />
        </b-col>
        <b-col md="3">
          <categories
            :categories="categories"
            v-on:selectCategory="(category) => onSelectCategory(category)"
          />
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>


<script>
import { mapState, mapMutations } from 'vuex';

import * as Helpers from '@/shared/Helpers';
import { INSTANCES, ENDPOINTS } from '@/core/Resource/Resource';
import Loader from '@/shared/Components/Loader';
import PageHeader from '@/shared/Components/PageHeader';
import PostsPerPage from '@/pages/News/Blog/PostsPerPage/PostsPerPage';
import Posts from '@/pages/News/Blog/Posts/Posts';
import BlogPagination from '@/pages/News/Blog/BlogPagination/BlogPagination';
import Categories from '@/pages/News/Blog/Categories/Categories';

const { mocky, jsonPlaceholder } = INSTANCES;
const { blog } = ENDPOINTS;
const { groupArrayItemsInArrays } = Helpers

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'Blog',
  components: {
    Loader,
    PageHeader,
    PostsPerPage,
    Posts,
    BlogPagination,
    Categories,
  },


  //==============================
  // DATA
  //==============================
  data() {
    return {
      Helpers,
      isLoading: true,
      pages: {},
      postsPerPage: 9,
      firstPaginationItem: 1,
      maxPaginationItem: 5,
      currentPage: 1,
    }
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

    // SET LOADING
    setLoading(value) {
      this.isLoading = value;
    },


    // SET PAGINATION SETTINGS
    setPaginationSettings(posts, quantPostsPerPage = 9) {
      const pages = {};

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
    async getAllData() {
      try {
        const { data: categories} = await this.$http.get(`${mocky}${blog.categories}`);
        const { data: posts } = await this.$http.get(`${jsonPlaceholder}${blog.posts}`);

        this.setCategories(categories);
        this.setPosts(posts);
        this.setPaginationSettings(posts);
      } catch (error) {
        console.error(error);
      } finally {
        this.setLoading(false);
      }
    },

    // ON SELECT CATEGORY
    async onSelectCategory(/* category */) {
      this.setLoading(true);

      try {
        const { data: posts } = await this.$http.get(`${jsonPlaceholder}${blog.posts}`)

        this.setPosts(posts);
        this.setPaginationSettings(posts);
      } catch (error) {
        console.error(error);
      } finally {
        this.setLoading(false);
      }
    },

    // ON PAGINATE
    onPaginate(target) {
      switch(target) {
        case 'previous':
          this.firstPaginationItem = --this.firstPaginationItem;
          break;

        case 'next':
          this.firstPaginationItem = ++this.firstPaginationItem;
          break;

        default:
          this.currentPage = target;
      }
    },
  },
}
</script>


<style lang="scss" scoped>
main {
  min-height: 500px;
  padding: 80px 0 30px;
}
</style>
