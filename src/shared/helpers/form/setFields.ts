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
      keys(newState).forEach((newStateKey: string) => {
        const key = newStateKey as keyof Validations;
        state[key] = newState[key];
      });
    });
  }, 10);
};

export default setFields;
