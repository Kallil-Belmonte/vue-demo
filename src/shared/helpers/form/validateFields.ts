import { FieldState } from '@/shared/composables';

/**
 * @name validateFields
 */

const validateFields = (fields: FieldState[]) => fields.every(field => field.valid);

export default validateFields;
