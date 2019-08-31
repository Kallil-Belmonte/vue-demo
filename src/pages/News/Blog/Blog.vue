<template>
  <main>
    <loader v-if="loading"></loader>

    <div class="container">
      <page-header icon="newspaper">Blog</page-header>

      <posts-filter v-on:filterPosts="onFilterPosts()"></posts-filter>

      <div class="row">
        <div class="col-md-9">
          <posts :data="pagePosts" :page="currentPage"></posts>

          <pagination :firstItem="firstPaginationItem" :totalItems="pagePosts.length" v-on:paginate="onPaginate()"></pagination>
        </div>
        <div class="col-md-3">
          <categories :data="categories" v-on:selectCategory="onSelectCategory()"></categories>
        </div>
      </div>
    </div>
  </main>
</template>


<script>
import { mapState, mapMutations } from 'vuex';

import Utils from '@/shared/General/Utils';
import { INSTANCES, ENDPOINTS } from '@/core/Resource/Resource';
import Loader from '@/shared/Components/Loader';
import PageHeader from '@/shared/Components/PageHeader';
import PostsFilter from '@/pages/News/Blog/PostsFilter/PostsFilter';
import Posts from '@/pages/News/Blog/Posts/Posts';
import Pagination from '@/pages/News/Blog/Pagination/Pagination';
import Categories from '@/pages/News/Blog/Categories/Categories';

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'Blog',
  components: {
    Loader,
    PageHeader,
    PostsFilter,
    Posts,
    Pagination,
    Categories,
  },


  //==============================
  // DATA
  //==============================
  data() {
    return {
      Utils,
      loading: true,
      postsPerPage: 9,
      pagePosts: [],
      currentPage: 0,
      firstPaginationItem: 1,
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

    // RESET PAGINATION
    resetPagination() {
      // Remove active class
      if (document.querySelector('.page-item.active')) document.querySelector('.page-item.active').classList.remove('active');

      // Add active class
      if (document.querySelector('.page-item .page-link:first-child').innerText !== 'Previous') {
        document.querySelector('.page-item:nth-child(1)').classList.add('active');
      } else {
        document.querySelector('.page-item:nth-child(2)').classList.add('active');
      }
    },

    // GET CATEGORIES
    getCategories() {
      return this.$http.get(INSTANCES.mocky + ENDPOINTS.blog.categories).then(response => response.data);
    },

    // GET POSTS
    getPosts() {
      return this.$http.get(INSTANCES.jsonPlaceholder + ENDPOINTS.blog.posts).then(response => response.data);
    },

    // GET ALL DATA
    getAllData() {
      Promise.all([
        this.getCategories(),
        this.getPosts(),
      ])
      .then(([categories, posts]) => {
        // Set data to store
        this.setCategories(categories);
        this.setPosts(posts);

        // Set Page Posts
        this.pagePosts = Utils.groupArrayItems(posts, this.postsPerPage);
      })
      .catch((error) => {
        console.error(error);
      })
      .then(() => {
        // Deactivate loader
        this.loading = false;
      });
    },

    // ON SELECT CATEGORY
    onSelectCategory() {
      // Activate loader
      this.loading = true;

      // Remove active class
      for (let item of document.querySelectorAll('.list-group-item')) {
        item.classList.remove('active');
      }

      // Add active class
      const targetElement = event.target;
      const parentElement = targetElement.parentNode;

      if (targetElement.tagName === 'SPAN') {
        parentElement.classList.add('active');
      } else {
        targetElement.classList.add('active');
      }

      // Reset Page posts
      this.pagePosts = [];

      // Get posts from the selected category
      // const category = document.querySelector('.list-group-item.active').getAttribute('data-name');;
      this.$http.get(INSTANCES.jsonPlaceholder + ENDPOINTS.blog.posts)
        .then(response => {
          // Set Posts
          this.posts = response.data;

          // Reset pagination
          this.resetPagination();

          // Set page settings
          this.pagePosts = Utils.groupArrayItems(this.posts, this.postsPerPage);
          this.currentPage = 0;
          this.firstPaginationItem = 1;

          // Deactivate loader
          this.loading = false;
        })
        .catch(error => {
          console.error(error);

          // Deactivate loader
          this.loading = false;
        });
    },

    // ON FILTER POSTS
    onFilterPosts() {
      const filterOption = event.target;

      // Reset pagination
      this.resetPagination();

      // Set page settings
      this.postsPerPage = +filterOption.value;
      this.pagePosts = Utils.groupArrayItems(this.posts, +filterOption.value);
      this.currentPage = 0;
      this.firstPaginationItem = 1;
    },

    // ON PAGINATE
    onPaginate() {
      // Select active page item
      const activePageItem = document.querySelector('.page-item.active');

      // Navigate back and forth
      const navigateBackAndForth = (back) => {
        if (activePageItem) activePageItem.classList.remove('active');

        for (let item of document.querySelectorAll('.page-item .page-link')) {
          if (back) {
            if (+item.innerText === this.currentPage + 2) item.parentNode.classList.add('active');
          } else {
            if (+item.innerText === this.currentPage) item.parentNode.classList.add('active');
          }
        }

        this.firstPaginationItem = back ? this.firstPaginationItem - 1 : this.firstPaginationItem + 1;
      };

      // Update current page
      const targetElement = event.target;
      const parentElement = targetElement.parentNode;

      switch(targetElement.innerText) {
        case 'Previous':
          navigateBackAndForth(true);
          break;

        case 'Next':
          navigateBackAndForth(false);
          break;

        default:
          if (activePageItem) activePageItem.classList.remove('active');
          parentElement.classList.add('active');
          this.currentPage = +targetElement.innerText - 1;
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
