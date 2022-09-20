import { UseField } from '@/shared/composables';

/**
 * @name getFieldClass
 */

const getFieldClass = (
  isFormSubmitted: boolean,
  field: UseField,
  baseClassNames = ['form-control'],
) => {
  const classes = baseClassNames;
  if ((isFormSubmitted || field.state.dirty) && field.state.invalid) classes.push('is-invalid');
  return classes;
};

export default getFieldClass;
