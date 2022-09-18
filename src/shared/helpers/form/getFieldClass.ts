import { useFieldState } from '@/shared/composables';

/**
 * @name getFieldClass
 */

const getFieldClass = (fieldState: useFieldState) => [
  'form-control',
  fieldState.dirty && fieldState.invalid ? 'is-invalid' : '',
];

export default getFieldClass;
