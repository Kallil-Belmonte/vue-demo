import { createRouter, createWebHistory } from 'vue-router';

import guard from './guard';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/core/layout/AppDashboard.vue'),
      beforeEnter: guard,
      children: [
        {
          path: '',
          name: 'home',
          meta: {
            title: 'Home',
          },
          component: () => import('@/pages/PageHome/PageHome.vue'),
        },
        {
          path: 'blog',
          component: () => import('@/pages/ModuleNews/ModuleNews.vue'),
          children: [
            {
              path: '',
              name: 'blog',
              meta: {
                title: 'Blog',
              },
              component: () => import('@/pages/ModuleNews/PageBlog/PageBlog.vue'),
            },
            {
              path: '/post/:id',
              name: 'post',
              meta: {
                title: 'Post',
              },
              component: () => import('@/pages/ModuleNews/PagePost/PagePost.vue'),
            },
            {
              path: '/edit-post/:id',
              name: 'edit-post',
              meta: {
                title: 'Edit Post',
              },
              component: () => import('@/pages/ModuleNews/PageEditPost/PageEditPost.vue'),
            },
          ],
        },
        {
          path: '/contact',
          name: 'contact',
          meta: {
            title: 'Contact',
          },
          component: () => import('@/pages/PageContact/PageContact.vue'),
        },
        {
          path: '/account',
          name: 'account',
          meta: {
            title: 'Account',
          },
          component: () => import('@/pages/PageAccount/PageAccount.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Login',
      },
      component: () => import('@/pages/PageAuth/PageLogin/PageLogin.vue'),
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: 'Register',
      },
      component: () => import('@/pages/PageAuth/PageRegister/PageRegister.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      meta: {
        title: 'Not Found',
      },
      component: () => import('@/pages/PageNotFound/PageNotFound.vue'),
    },
  ],
});

export default router;
