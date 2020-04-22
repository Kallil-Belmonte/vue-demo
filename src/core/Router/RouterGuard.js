import { clearStorageData } from '@/core/Vuex/Store';

const RouterGuard = (to, from, next) => {
  const authToken = sessionStorage.getItem('authTokenVueDemo') || localStorage.getItem('authTokenVueDemo');
  const expiredSession = new Date().getTime() > Date.parse(localStorage.getItem('expirationDateVueDemo'));

  if (authToken && !expiredSession) {
    next();
  } else {
    clearStorageData();
    next({ name: 'login' })
  }
};

export default RouterGuard;
