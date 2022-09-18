import { useFieldState } from '@/shared/composables';

/**
 * @name validateFields
 */

const validateFields = (fields: useFieldState[]) => fields.every(field => field.valid);

export default validateFields;
