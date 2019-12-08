<template>
  <main>
    <loader v-if="loading" />

    <div class="container">
      <page-header icon="newspaper">Blog</page-header>

      <posts-per-page
        :postsPerPage="postsPerPage"
        v-on:change="(value) => setPaginationSettings(posts, value)"
      />

      <div class="row">
        <div class="col-md-9">
          <posts :pages="pages" :currentPage="currentPage" />

          <blog-pagination
            :pages="Object.keys(pages)"
            :firstItem="firstPaginationItem"
            :maxItem="maxPaginationItem"
            :currentPage="currentPage"
            v-on:paginate="onPaginate(target)"
          />
        </div>
        <div class="col-md-3">
          <categories
            :categories="categories"
            v-on:selectCategory="(category) => onSelectCategory(category)"
          />
        </div>
      </div>
    </div>
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
      loading: true,
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
    ...mapState('blog', ['categories']),
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
      this.loading = value;
    },


    // SET PAGINATION SETTINGS
    setPaginationSettings(posts, quantPostsPerPage) {
      const pages = {};
      const postsPerPage = quantPostsPerPage || 9;

      Helpers.groupArrayItemsInArrays(posts, postsPerPage).forEach((item, index) => {
        pages[index + 1] = item;
      });

      this.pages = pages;
      this.postsPerPage = postsPerPage;
      this.firstPaginationItem = 1;
      this.maxPaginationItem = 5;
      this.currentPage = 1;
    },

    // GET ALL DATA
    async getAllData() {
      try {
        const categoriesResponse = await this.$http.get(`${INSTANCES.mocky}${ENDPOINTS.blog.categories}`);
        const postsResponse = await this.$http.get(`${INSTANCES.jsonPlaceholder}${ENDPOINTS.blog.posts}`);

        this.setCategories(categoriesResponse.data);
        this.setPosts(postsResponse.data);
        this.setPaginationSettings(postsResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        this.setLoading(false);
      }
    },

    // ON SELECT CATEGORY
    async onSelectCategory(category) {
      this.setLoading(true);

      try {
        const response = await this.$http.get(`${INSTANCES.jsonPlaceholder}${ENDPOINTS.blog.posts}`)

        this.setPosts(response.data);
        this.setPaginationSettings(response.data);
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
          this.currentPage = Number(target);
      }
    },

    // // RESET PAGINATION
    // resetPagination() {
    //   // Remove active class
    //   if (document.querySelector('.page-item.active')) document.querySelector('.page-item.active').classList.remove('active');
    //
    //   // Add active class
    //   if (document.querySelector('.page-item .page-link:first-child').innerText !== 'Previous') {
    //     document.querySelector('.page-item:nth-child(1)').classList.add('active');
    //   } else {
    //     document.querySelector('.page-item:nth-child(2)').classList.add('active');
    //   }
    // },

    // // GET CATEGORIES
    // getCategories() {
    //   return this.$http.get(`${INSTANCES.mocky}${ENDPOINTS.blog.categories}`).then(response => response.data);
    // },
    //
    // // GET POSTS
    // getPosts() {
    //   return this.$http.get(`${INSTANCES.jsonPlaceholder}${ENDPOINTS.blog.posts}`).then(response => response.data);
    // },
    //
    // // GET ALL DATA
    // getAllData() {
    //   Promise.all([
    //     this.getCategories(),
    //     this.getPosts(),
    //   ])
    //   .then(([categories, posts]) => {
    //     // Set data to store
    //     this.setCategories(categories);
    //     this.setPosts(posts);
    //
    //     // Set Page Posts
    //     this.pagePosts = Helpers.groupArrayItemsInArrays(posts, this.postsPerPage);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   })
    //   .then(() => {
    //     // Deactivate loader
    //     this.loading = false;
    //   });
    // },

    // ON SELECT CATEGORY
    // onSelectCategory() {
    //   // Activate loader
    //   this.loading = true;
    //
    //   // Remove active class
    //   for (const item of document.querySelectorAll('.list-group-item')) {
    //     item.classList.remove('active');
    //   }
    //
    //   // Add active class
    //   const targetElement = event.target;
    //   const parentElement = targetElement.parentNode;
    //
    //   if (targetElement.tagName === 'SPAN') {
    //     parentElement.classList.add('active');
    //   } else {
    //     targetElement.classList.add('active');
    //   }
    //
    //   // Reset Page posts
    //   this.pagePosts = [];
    //
    //   // Get posts from the selected category
    //   // const category = document.querySelector('.list-group-item.active').getAttribute('data-name');;
    //   this.$http.get(`${INSTANCES.jsonPlaceholder}${ENDPOINTS.blog.posts}`)
    //     .then(response => {
    //       // Set Posts
    //       this.posts = response.data;
    //
    //       // Reset pagination
    //       this.resetPagination();
    //
    //       // Set page settings
    //       this.pagePosts = Helpers.groupArrayItemsInArrays(this.posts, this.postsPerPage);
    //       this.currentPage = 0;
    //       this.firstPaginationItem = 1;
    //
    //       // Deactivate loader
    //       this.loading = false;
    //     })
    //     .catch(error => {
    //       console.error(error);
    //
    //       // Deactivate loader
    //       this.loading = false;
    //     });
    // },

    // // ON FILTER POSTS
    // onFilterPosts() {
    //   const filterOption = event.target;
    //
    //   // Reset pagination
    //   this.resetPagination();
    //
    //   // Set page settings
    //   this.postsPerPage = +filterOption.value;
    //   this.pagePosts = Helpers.groupArrayItemsInArrays(this.posts, +filterOption.value);
    //   this.currentPage = 0;
    //   this.firstPaginationItem = 1;
    // },

    // ON PAGINATE
    // onPaginate() {
    //   // Select active page item
    //   const activePageItem = document.querySelector('.page-item.active');
    //
    //   // Navigate back and forth
    //   const navigateBackAndForth = (back) => {
    //     if (activePageItem) activePageItem.classList.remove('active');
    //
    //     for (const item of document.querySelectorAll('.page-item .page-link')) {
    //       if (back) {
    //         if (+item.innerText === this.currentPage + 2) item.parentNode.classList.add('active');
    //       } else {
    //         if (+item.innerText === this.currentPage) item.parentNode.classList.add('active');
    //       }
    //     }
    //
    //     this.firstPaginationItem = back ? this.firstPaginationItem - 1 : this.firstPaginationItem + 1;
    //   };
    //
    //   // Update current page
    //   const targetElement = event.target;
    //   const parentElement = targetElement.parentNode;
    //
    //   switch(targetElement.innerText) {
    //     case 'Previous':
    //       navigateBackAndForth(true);
    //       break;
    //
    //     case 'Next':
    //       navigateBackAndForth(false);
    //       break;
    //
    //     default:
    //       if (activePageItem) activePageItem.classList.remove('active');
    //       parentElement.classList.add('active');
    //       this.currentPage = +targetElement.innerText - 1;
    //   }
    // },
  },
}
</script>


<style lang="scss" scoped>
main {
  min-height: 500px;
  padding: 80px 0 30px;
}
</style>
