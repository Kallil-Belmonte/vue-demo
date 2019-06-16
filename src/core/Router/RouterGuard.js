const RouterGuard = (to, from, next) => {
  const authToken = sessionStorage.getItem('authTokenVueDemo') || localStorage.getItem('authTokenVueDemo');
  const expiredSession = new Date().getTime() > Date.parse(localStorage.getItem('expirationDateVueDemo'));

  if (authToken && !expiredSession) {
    next();
  } else {
    // Remove token
    sessionStorage.removeItem('authTokenVueDemo');
    localStorage.removeItem('authTokenVueDemo');
    localStorage.removeItem('expirationDateVueDemo');

    // Redirect
    next({ name: 'login' })
  }
};

export default RouterGuard;
