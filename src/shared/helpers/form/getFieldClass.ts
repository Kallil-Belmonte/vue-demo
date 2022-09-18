import { FieldState } from '@/shared/composables';

/**
 * @name getFieldClass
 */

const getFieldClass = (fieldState: FieldState, baseClassNames = ['form-control']) => [
  ...baseClassNames,
  fieldState.dirty && fieldState.invalid ? 'is-invalid' : '',
];

export default getFieldClass;
