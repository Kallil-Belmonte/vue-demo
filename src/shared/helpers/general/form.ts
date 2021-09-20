import { VueHooksFormField } from '@/shared/files/types';

/**
 * @name getFieldClass
 */

export const getFieldClass = (field: VueHooksFormField) => [
  'form-control',
  field.error ? 'is-invalid' : '',
];
