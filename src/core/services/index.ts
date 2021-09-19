import fetchInterceptor from './files/fetchInterceptor';

fetchInterceptor();

// AUTH
export { registerUser, loginUser } from './auth';

// BLOG
export { getCategories, getPosts } from './blog';

// CONTACT
export { getFavoriteColors } from './contact';
