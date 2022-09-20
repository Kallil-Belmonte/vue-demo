import { Validations, ValidationConfig, validate } from '@/shared/helpers';
import { UseField } from '@/shared/composables';

/**
 * @name validateFieldsState
 */

type ValidateFieldsState = {
  fields: UseField[];
  validation?: ValidationConfig;
  updateState?: boolean;
};

const { keys } = Object;

const validateFieldsState = ({
  fields,
  validation = {},
  updateState = true,
}: ValidateFieldsState) => {
  let isValidFields = fields.every(field => field.state.valid);

  if (keys(validation).length) {
    isValidFields = fields
      .map(field => {
        const { isValid, errorMessages, ...otherValidationProps } = validate(
          field.model.value,
          validation,
        );

        if (updateState) {
          field.state.valid = isValid;
          field.state.invalid = !isValid;
          field.state.errorMessages = errorMessages;
          keys(otherValidationProps).forEach((validationKey: string) => {
            const key = validationKey as keyof Validations;
            field.state[key] = otherValidationProps[key];
          });
        }

        return isValid;
      })
      .every(isValid => isValid);
  }

  return isValidFields;
};

export default validateFieldsState;
