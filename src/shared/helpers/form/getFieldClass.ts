import type { FieldState } from '@/shared/composables';

/**
 * @function getFieldClass
 */

const getFieldClass = (
  formSubmitted: boolean,
  state: FieldState,
  baseClasses: string[] = ['form-control'],
) => {
  const classes = [...baseClasses];
  if ((formSubmitted || state.dirty) && state.invalid) classes.push('is-invalid');
  return classes;
};

export default getFieldClass;
