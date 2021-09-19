/**
 * @name getFieldClass
 */

export const getFieldClass = (field: any, customClass: string[] = []): string[] => {
  const isInvalid: boolean = field?.$touched && field?.$invalid;
  return ['form-control', isInvalid ? 'is-invalid' : '', ...customClass];
};

export default getFieldClass;