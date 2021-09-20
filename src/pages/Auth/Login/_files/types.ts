import { VueHooksFormField } from '@/shared/files/types';

export type FormState = {
  isLoading: boolean;
  email: VueHooksFormField;
  password: VueHooksFormField;
  keepLogged: VueHooksFormField;
  serverErrors: {
    email: string[];
    password: string[];
  };
};
