import { Ref, UnwrapRef, reactive, ref, watch, onMounted } from 'vue';

import { ValidationConfig, Validations, validate } from '@/shared/helpers';

// untouched: True if the user has not focused on the element.
// touched: True if the user has focused on the element.
// pristine: True if the element’s value have not been changed.
// dirty: True if the element’s value have been changed.
// valid: True if the element’s value is valid and false otherwise.
// invalid: True if the element’s value is invalid and false otherwise.

export type State = Validations & {
  name: string;
  untouched: boolean;
  touched: boolean;
  pristine: boolean;
  dirty: boolean;
  valid: boolean;
  invalid: boolean;
  errorMessages: string[];
};

type UseFieldConfig<Type> = {
  name: string;
  defaultValue?: Type;
  validation?: ValidationConfig;
};

type UseFieldResult<Type> = [Ref<UnwrapRef<Type>>, Ref<any>, State];

const { keys } = Object;

export const getFieldState = (name: string, required: boolean = false): State => ({
  name,
  untouched: true,
  touched: false,
  pristine: true,
  dirty: false,
  valid: !required,
  invalid: required,
  errorMessages: [],
});

const useField = <Type = string>(config: UseFieldConfig<Type>): UseFieldResult<Type> => {
  const { name, defaultValue, validation = {} } = config;

  const state = reactive(getFieldState(name, validation.required?.check));
  const { pristine, dirty } = state;

  const field = ref<Type>(defaultValue as Type);
  const fieldRef = ref();

  const controlUpdate = (value: UnwrapRef<Type>) => {
    if (pristine) state.pristine = false;
    if (!dirty) state.dirty = true;

    if (keys(validation).length) {
      const { isValid, errorMessages, ...otherValidationProps } = validate(
        value as string,
        validation,
      );

      state.valid = isValid;
      state.invalid = !isValid;
      state.errorMessages = errorMessages;
      keys(otherValidationProps).forEach((validationKey: string) => {
        const key = validationKey as keyof Validations;
        state[key] = otherValidationProps[key];
      });
    }
  };

  const controlTouching = () => {
    if (!fieldRef.value) return;

    const setUntouched = () => {
      state.untouched = false;
      fieldRef.value.removeEventListener('focus', setUntouched);
    };
    fieldRef.value.addEventListener('focus', setUntouched);

    const setTouched = () => {
      state.touched = true;
      fieldRef.value.removeEventListener('focusout', setTouched);
    };
    fieldRef.value.addEventListener('focusout', setTouched);
  };

  // LIFECYCLE HOOKS
  watch(field, controlUpdate);

  onMounted(() => {
    controlTouching();
  });

  return [field, fieldRef, state];
};

export default useField;