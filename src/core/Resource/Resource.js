import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

//==============================
// INSTANCES
//==============================

export const INSTANCES = {
  jsonPlaceholder: 'https://jsonplaceholder.typicode.com/',
  mocky: 'http://www.mocky.io/v2/',
};


//==============================
// ENDPOINTS
//==============================

export const ENDPOINTS = {
  blog: {
    categories: '5bb20b802e00009015927389/',
    posts: 'posts/',
  },
  contactForm: {
    favoriteColors: '5dbf1e1f3300003972a0e512/',
  },
  auth: {
    login: '5bd312b23400002a00cfe028/',
    register: '5bd311fc3400006f00cfe021/',
  }
};


//==============================
// CONFIGURATION
//==============================

// INTERCEPTORS
Vue.http.interceptors.push((request, next) => {
  if (request.url.includes(INSTANCES.jsonPlaceholder)) {
    const authToken = sessionStorage.getItem('authTokenVueDemo') || localStorage.getItem('authTokenVueDemo');

    request.headers.set('Authorization', `Bearer ${authToken}`);
    // request.url = request.url + '?authKey=' + localStorage.getItem('authTokenVueDemo');
  }

  next();
});
