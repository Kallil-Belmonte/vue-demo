import { VueHooksFormField } from '@/shared/files/types';

export type EditPostFormState = {
  isLoading: boolean;
  title: VueHooksFormField;
  body: VueHooksFormField;
};
