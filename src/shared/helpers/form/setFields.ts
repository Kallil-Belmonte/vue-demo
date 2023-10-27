import { type UseField, getFieldState } from '@/shared/composables';

type Value = string | number | boolean;

type Config = {
  fields: UseField[];
  value?: Value;
  reset?: { required: boolean };
};

const { assign } = Object;

/**
 * @function setFields
 * @description Sets a value to the fields.
 * @param { Config } config - Configuration properties.
 */

const setFields = ({ fields, value, reset }: Config) => {
  const { required } = reset || {};

  if (value !== undefined) fields.forEach(field => (field.model.value = value));

  if (reset) {
    setTimeout(() => {
      fields.forEach(field => assign(field.state, getFieldState(field.state.name, required)));
    });
  }
};

export default setFields;
