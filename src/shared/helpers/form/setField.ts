import { Ref } from 'vue';

import { Validations } from '@/shared/helpers';
import { FieldState } from '@/shared/composables';

/**
 * @name setField
 */

type Value = string | number | boolean;

const setField = (
  field: Ref<Value>,
  state: FieldState,
  value: Value,
  newState: Partial<FieldState> = {},
) => {
  field.value = value;

  setTimeout(() => {
    Object.keys(newState).forEach((key: string) => {
      state[key as keyof Validations] = newState[key as keyof Validations];
    });
  }, 10);
};

export default setField;
