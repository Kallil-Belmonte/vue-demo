import { createRouter, createWebHistory } from 'vue-router';

import guard from './guard';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/core/layout/Dashboard.vue'),
      beforeEnter: guard,
      children: [
        {
          path: '',
          name: 'home',
          meta: {
            title: 'Home',
          },
          component: () => import('@/pages/Home/Home.vue'),
        },
        {
          path: 'blog',
          component: () => import('@/pages/News/News.vue'),
          children: [
            {
              path: '',
              name: 'blog',
              meta: {
                title: 'Blog',
              },
              component: () => import('@/pages/News/Blog/Blog.vue'),
            },
            {
              path: '/post/:id',
              name: 'post',
              meta: {
                title: 'Post',
              },
              component: () => import('@/pages/News/Post/Post.vue'),
            },
            {
              path: '/edit-post/:id',
              name: 'edit-post',
              meta: {
                title: 'Edit Post',
              },
              component: () => import('@/pages/News/EditPost/EditPost.vue'),
            },
          ],
        },
        {
          path: '/contact',
          name: 'contact',
          meta: {
            title: 'Contact',
          },
          component: () => import('@/pages/Contact/Contact.vue'),
        },
        {
          path: '/account',
          name: 'account',
          meta: {
            title: 'Account',
          },
          component: () => import('@/pages/Account/Account.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Login',
      },
      component: () => import('@/pages/Auth/Login/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: 'Register',
      },
      component: () => import('@/pages/Auth/Register/Register.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      meta: {
        title: 'Not Found',
      },
      component: () => import('@/pages/NotFound/NotFound.vue'),
    },
  ],
});

export default router;
