import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '@/core/Dashboard/Dashboard';
import Home from '@/pages/Home/Home';
// import Blog from '@/pages/News/Blog/Blog';
// import Post from '@/pages/News/Post/Post';
import EditPost from '@/pages/News/EditPost/EditPost';
import Contact from '@/pages/Contact/Contact';
import Account from '@/pages/Account/Account';
import Login from '@/pages/Auth/Login/Login';
import Register from '@/pages/Auth/Register/Register';
import NotFound from '@/pages/NotFound/NotFound';
import RouterGuard from './RouterGuard';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   // Lazy loading example
    //   path: '/page-name',
    //   name: 'page-name',
    //   component: () => import('@/pages/PageName/PageName')
    // }
    {
      path: '/',
      component: Dashboard,
      beforeEnter: RouterGuard,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
        },
        // {
        //   path: '/blog',
        //   name: 'blog',
        //   component: Blog,
        // },
        // {
        //   path: '/post/:id',
        //   name: 'post',
        //   component: Post,
        // },
        {
          path: '/edit-post/:id',
          name: 'edit-post',
          component: EditPost,
        },
        {
          path: '/contact',
          name: 'contact',
          component: Contact,
        },
        {
          path: '/account',
          name: 'account',
          component: Account,
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
    },
  ]
});
