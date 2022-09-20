import { Ref } from 'vue';

import { Validations } from '@/shared/helpers';
import { FieldState } from '@/shared/composables';

/**
 * @name setFields
 */

type Value = string | number | boolean;

type SetFieldParams = {
  fields: Ref<Value>[];
  value?: Value;
  states: FieldState[];
  state: Partial<FieldState>;
};

const { keys } = Object;

const setFields = ({ fields, states, value, state = {} }: SetFieldParams) => {
  if (value !== undefined) fields.forEach(item => (item.value = value));

  setTimeout(() => {
    states.forEach(stateItem => {
      keys(state).forEach((stateKey: string) => {
        const key = stateKey as keyof Validations;
        stateItem[key] = state[key];
      });
    });
  }, 10);
};

export default setFields;
