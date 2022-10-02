import { Ref } from 'vue';

import { FieldState } from '@/shared/composables';

/**
 * @name getFieldClass
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
