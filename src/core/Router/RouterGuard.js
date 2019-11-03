const RouterGuard = (to, from, next) => {
  const authToken = sessionStorage.getItem('authTokenVueDemo') || localStorage.getItem('authTokenVueDemo');
  const expiredSession = new Date().getTime() > Date.parse(localStorage.getItem('expirationDateVueDemo'));

  if (authToken && !expiredSession) {
    next();
  } else {
    sessionStorage.removeItem('authTokenVueDemo');
    localStorage.removeItem('authTokenVueDemo');
    localStorage.removeItem('expirationDateVueDemo');

    next({ name: 'login' })
  }
};

export default RouterGuard;
