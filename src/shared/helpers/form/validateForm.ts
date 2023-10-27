import { Validations, ValidationConfig, validate } from '@/shared/helpers';
import { UseField } from '@/shared/composables';

type Config = {
  fields: UseField[];
  validation?: ValidationConfig;
  updateState?: boolean;
};

const { keys } = Object;

/**
 * @function validateFields
 * @description Validates the fields.
 * @param { Config } config - Configuration properties.
 */

export const validateFields = ({ fields, validation = {}, updateState = true }: Config) => {
  let isValidFields = fields.every(field => field.state.valid);

  if (keys(validation).length) {
    isValidFields = fields
      .map(field => {
        const { isValid, errorMessages, ...otherValidationProps } = validate(
          field.model.value,
          validation,
        );

        if (updateState) {
          keys(otherValidationProps).forEach((validationKey: string) => {
            const key = validationKey as keyof Validations;
            field.state[key] = otherValidationProps[key];
          });

          field.state.valid = isValid;
          field.state.invalid = !isValid;
          field.state.errorMessages = errorMessages;
        }

        return isValid;
      })
      .every(isValid => isValid);
  }

  return isValidFields;
};

/**
 * @function validateForm
 * @description Validates the form.
 * @param { Config[] } formItems - Form items.
 */

const validateForm = (formItems: Config[]) => {
  const isValidFields = formItems.map(item => validateFields(item));
  return isValidFields.every(isValid => isValid);
};

export default validateForm;
