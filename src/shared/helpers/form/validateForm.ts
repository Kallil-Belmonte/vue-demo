import { Validations, ValidationConfig, validate } from '@/shared/helpers';
import { UseField } from '@/shared/composables';

/**
 * @function validateForm
 */

type Config = {
  fields: UseField[];
  validation?: ValidationConfig;
  updateState?: boolean;
};

const { keys } = Object;

export const validateFields = ({ fields, validation = {}, updateState = true }: Config) => {
  let isValidFields = fields.every(field => field.state.valid);

  if (keys(validation).length) {
    isValidFields = fields
      .map(field => {
        const { isValid, errorMessages, ...otherValidationProps } = validate(
          field.ref.value.value,
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

const validateForm = (formItems: Config[]) => {
  const isValidFields = formItems.map(item => validateFields(item));
  return isValidFields.every(isValid => isValid);
};

export default validateForm;
