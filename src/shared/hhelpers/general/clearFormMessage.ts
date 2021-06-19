/**
 * clearFormMessage
 * @param { string[] } field
 * @param { number } index
 */

export const clearFormMessage = (field: string[], index: number): void => {
  field.splice(index, 1);
};

export default clearFormMessage;
