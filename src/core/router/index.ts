import { createRouter, createWebHashHistory } from 'vue-router';

import guard from './guard';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/Dashboard.vue'),
      beforeEnter: guard,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/pages/Home/Home.vue'),
        },
        {
          path: '/blog',
          name: 'blog',
          component: () => import('@/pages/News/Blog/Blog.vue'),
        },
        {
          path: '/post/:id',
          name: 'post',
          component: () => import('@/pages/News/Post/Post.vue'),
        },
        {
          path: '/edit-post/:id',
          name: 'edit-post',
          component: () => import('@/pages/News/EditPost/EditPost.vue'),
        },
        {
          path: '/contact',
          name: 'contact',
          component: () => import('@/pages/Contact/Contact.vue'),
        },
        {
          path: '/account',
          name: 'account',
          component: () => import('@/pages/Account/Account.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/Auth/Login/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/Auth/Register/Register.vue'),
    },
    {
      path: '*',
      name: 'not-found',
      component: () => import('@/pages/NotFound/NotFound.vue'),
    },
  ],
});

export default router;
