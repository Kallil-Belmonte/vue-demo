import { Validations } from '@/shared/helpers';
import { UseField, getFieldState } from '@/shared/composables';

/**
 * @name setFields
 */

type Value = string | number | boolean;

type SetFieldParams = {
  fields: UseField[];
  value?: Value;
  resetState?: boolean;
};

const setFields = ({ fields, value, resetState }: SetFieldParams) => {
  if (value !== undefined) fields.forEach(field => (field.model.value = value));

  if (resetState) {
    setTimeout(() => {
      fields.forEach(field => (field.state = getFieldState(field.state.name, true)));
    }, 10);
  }
};

export default setFields;
