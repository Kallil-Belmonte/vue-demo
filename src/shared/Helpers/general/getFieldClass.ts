/**
 * getFieldClass
 * @param { any } field
 * @param { string[] } customClassNames
 */

export const getFieldClass = (field: any, customClassNames: string[] = []): string[] => {
  const classList: string[] = ['form-control', ...customClassNames];

  if (field && field.$touched && field.$invalid) classList.push('is-invalid');

  return classList;
};

export default getFieldClass;
