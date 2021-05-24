/**
 * setFieldClassName
 * @param { any } field
 * @param { string[] } customClassNames
 */

export const setFieldClassName = (field: any, customClassNames: string[] = []): string[] => {
  const classList: string[] = ['form-control', ...customClassNames];

  if (field && field.$touched && field.$invalid) classList.push('is-invalid');

  return classList;
};

export default setFieldClassName;
