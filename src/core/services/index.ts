import fetchInterceptor from './files/fetchInterceptor';

fetchInterceptor();

// AUTH
export { registerUser, loginUser } from './auth';

// CONTACT
export { getFavoriteColors } from './contact';

// NEWS
export { getCategories, getPosts, getPost, deletePost } from './news';
