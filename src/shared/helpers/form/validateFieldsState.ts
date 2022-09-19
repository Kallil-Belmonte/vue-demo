import { FieldState } from '@/shared/composables';

/**
 * @name validateFieldsState
 */

const validateFieldsState = (fieldsState: FieldState[]) =>
  fieldsState.every(fieldState => fieldState.valid);

export default validateFieldsState;
