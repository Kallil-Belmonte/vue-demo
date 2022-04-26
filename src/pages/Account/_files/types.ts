import { VueHooksFormField } from '@/shared/files/types';

export type AccountFormState = {
  firstName: VueHooksFormField;
  lastName: VueHooksFormField;
  email: VueHooksFormField;
  successMessages: string[];
  serverErrors: {
    email: string[];
    request: string[];
  };
};
