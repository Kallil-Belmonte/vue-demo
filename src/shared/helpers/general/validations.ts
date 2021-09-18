/**
 * @name validations
 */

// required
export const required = (value: string): boolean => !!value;

// minLength
export const minLength = (value: string, min: number): boolean => value.length >= min;

// maxLength
export const maxLength = (value: string, max: number): boolean => value.length <= max;

// email
export const email = (value: string): boolean => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(value);
};
