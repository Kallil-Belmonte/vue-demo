import { JSON_PLACEHOLDER_URL } from './endpoints';

const fetchInterceptor = async () => {
  const { fetch: originalFetch } = window;

  window.fetch = async (input, init = {}) => {
    const authToken =
      sessionStorage.getItem('authTokenVueDemo') || localStorage.getItem('authTokenVueDemo');
    let url = `${input}`;

    if (url.includes(JSON_PLACEHOLDER_URL)) {
      // url = `${url}?authKey=${authToken}`;

      const newHeaders = new Headers();
      newHeaders.set('Authorization', `Bearer ${authToken}`);
      const config: RequestInit = {
        ...init,
        headers: newHeaders,
      };

      try {
        const response = await originalFetch(url, config);
        return response;
      } catch (error) {
        throw error;
      }
    }

    try {
      const response = await originalFetch(input, init);
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export default fetchInterceptor;
