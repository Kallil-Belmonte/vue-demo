import { Ref } from 'vue';

import { Validations } from '@/shared/helpers';
import { FieldState } from '@/shared/composables';

/**
 * @name setFields
 */

type Value = string | number | boolean;

type SetFieldParams = {
  fields: Ref<Value>[];
  states: FieldState[];
  value?: Value;
  newState: Partial<FieldState>;
};

const { keys } = Object;

const setFields = ({ fields, states, value, newState = {} }: SetFieldParams) => {
  if (value !== undefined) fields.forEach(item => (item.value = value));

  setTimeout(() => {
    states.forEach(state => {
      keys(newState).forEach((key: string) => {
        state[key as keyof Validations] = newState[key as keyof Validations];
      });
    });
  }, 10);
};

export default setFields;
