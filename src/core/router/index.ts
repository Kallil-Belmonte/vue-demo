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
          name: 'home',
          path: '',
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
              name: 'blog',
              path: '',
              meta: {
                title: 'Blog',
              },
              component: () => import('@/pages/News/Blog/Blog.vue'),
            },
            {
              name: 'post',
              path: '/post/:id',
              meta: {
                title: 'Post',
              },
              component: () => import('@/pages/News/Post/Post.vue'),
            },
            {
              name: 'edit-post',
              path: '/edit-post/:id',
              meta: {
                title: 'Edit Post',
              },
              component: () => import('@/pages/News/EditPost/EditPost.vue'),
            },
          ],
        },
        {
          name: 'contact',
          path: '/contact',
          meta: {
            title: 'Contact',
          },
          component: () => import('@/pages/Contact/Contact.vue'),
        },
        {
          name: 'account',
          path: '/account',
          meta: {
            title: 'Account',
          },
          component: () => import('@/pages/Account/Account.vue'),
        },
      ],
    },
    {
      name: 'login',
      path: '/login',
      meta: {
        title: 'Login',
      },
      component: () => import('@/pages/Auth/Login/Login.vue'),
    },
    {
      name: 'register',
      path: '/register',
      meta: {
        title: 'Register',
      },
      component: () => import('@/pages/Auth/Register/Register.vue'),
    },
    {
      name: 'not-found',
      path: '/:pathMatch(.*)*',
      meta: {
        title: 'Not Found',
      },
      component: () => import('@/pages/NotFound/NotFound.vue'),
    },
  ],
});

export default router;
