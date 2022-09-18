import { Validations } from '@/shared/helpers';
import { useFieldState } from '@/shared/composables';

/**
 * @name setFieldsState
 */

const setFieldsState = (fieldsState: useFieldState[], state: Partial<useFieldState>) => {
  fieldsState.forEach(fieldState => {
    Object.keys(state).forEach((key: string) => {
      fieldState[key as keyof Validations] = state[key as keyof Validations];
    });
  });
};

export default setFieldsState;
