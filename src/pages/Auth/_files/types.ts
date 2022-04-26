import { VueHooksFormField } from '@/shared/files/types';

export type LoginFormState = {
  isLoading: boolean;
  email: VueHooksFormField;
  password: VueHooksFormField;
  keepLogged: VueHooksFormField;
  serverErrors: {
    email: string[];
    password: string[];
    request: string[];
  };
};

export type RegisterFormState = {
  isLoading: boolean;
  firstName: VueHooksFormField;
  lastName: VueHooksFormField;
  email: VueHooksFormField;
  password: VueHooksFormField;
  serverErrors: {
    email: string[];
    password: string[];
    request: string[];
  };
};
