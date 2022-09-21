// ARRAY
export { default as groupArrayItemsInArrays } from './array/groupArrayItemsInArrays';

// AUTH
export { default as clearStorageData } from './auth/clearStorageData';
export { default as getAuthToken } from './auth/getAuthToken';
export { default as redirectLoggedUser } from './auth/redirectLoggedUser';

// FORM
export { default as clearFormMessage } from './form/clearFormMessage';
export { default as getFieldClass } from './form/getFieldClass';
export { default as setFields } from './form/setFields';
export { default as validateForm } from './form/validateForm';

// GENERAL
export { default as setPageTitle } from './general/setPageTitle';

// STRING
export { default as firstLetterToUpperCase } from './string/firstLetterToUpperCase';
export { default as limitWords } from './string/limitWords';
export {
  type Config as ValidationConfig,
  type Validations,
  default as validate,
} from './string/validate';
