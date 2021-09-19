import { createRouter, createWebHistory } from 'vue-router';

import guard from './guard';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // {
    //   path: '/',
    //   component: () => import('src/layout/Dashboard.vue'),
    //   beforeEnter: guard,
    //   children: [
    //     {
    //       path: '',
    //       name: 'home',
    //       meta: {
    //         title: 'Home',
    //       },
    //       component: () => import('src/pages/Home/Home.vue'),
    //     },
    //     {
    //       path: '/blog',
    //       name: 'blog',
    //       meta: {
    //         title: 'Blog',
    //       },
    //       component: () => import('src/pages/News/Blog/Blog.vue'),
    //     },
    //     {
    //       path: '/post/:id',
    //       name: 'post',
    //       meta: {
    //         title: 'Post',
    //       },
    //       component: () => import('src/pages/News/Post/Post.vue'),
    //     },
    //     {
    //       path: '/edit-post/:id',
    //       name: 'edit-post',
    //       meta: {
    //         title: 'Edit Post',
    //       },
    //       component: () => import('src/pages/News/EditPost/EditPost.vue'),
    //     },
    //     {
    //       path: '/contact',
    //       name: 'contact',
    //       meta: {
    //         title: 'Contact',
    //       },
    //       component: () => import('src/pages/Contact/Contact.vue'),
    //     },
    //     {
    //       path: '/account',
    //       name: 'account',
    //       meta: {
    //         title: 'Account',
    //       },
    //       component: () => import('src/pages/Account/Account.vue'),
    //     },
    //   ],
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   meta: {
    //     title: 'Login',
    //   },
    //   component: () => import('src/pages/Auth/Login/Login.vue'),
    // },
    // {
    //   path: '/register',
    //   name: 'register',
    //   meta: {
    //     title: 'Register',
    //   },
    //   component: () => import('src/pages/Auth/Register/Register.vue'),
    // },
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'not-found',
    //   meta: {
    //     title: 'Not Found',
    //   },
    //   component: () => import('src/pages/NotFound/NotFound.vue'),
    // },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      meta: {
        title: 'Not Found',
      },
      component: () => import('src/ModalExemplo.vue'),
    },
  ],
});

export default router;
