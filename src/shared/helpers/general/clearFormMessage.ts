/**
 * @name clearFormMessage
 */

export const clearFormMessage = (field: string[], index: number) => {
  field.splice(index, 1);
};

export default clearFormMessage;
