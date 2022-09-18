import { Ref } from 'vue';

import { Validations } from '@/shared/helpers';
import { FieldState } from '@/shared/composables';

/**
 * @name setField
 */

type Value = string | number | boolean;

type SetFieldParams = {
  field: Ref<Value>;
  state: FieldState;
  value?: Value;
  newState: Partial<FieldState>;
};

const { keys } = Object;

const setField = ({ field, state, value, newState = {} }: SetFieldParams) => {
  if (value) field.value = value;

  setTimeout(() => {
    keys(newState).forEach((key: string) => {
      state[key as keyof Validations] = newState[key as keyof Validations];
    });
  }, 10);
};

export default setField;
