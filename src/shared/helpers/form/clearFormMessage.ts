/**
 * @function clearFormMessage
 */

const clearFormMessage = (errorMessages: string[], index: number) => {
  errorMessages.splice(index, 1);
};

export default clearFormMessage;
