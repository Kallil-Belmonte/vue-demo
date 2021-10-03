import { VueHooksFormField } from '@/shared/files/types';
import { FavoriteColors } from '@/core/services/contact/types';

export type ContactFormState = {
  isLoading: boolean;
  favoriteColors: FavoriteColors[];
  firstName: VueHooksFormField;
  lastName: VueHooksFormField;
  email: VueHooksFormField;
  telephone: VueHooksFormField;
  sex: VueHooksFormField;
  favoriteColor: VueHooksFormField;
  employed: VueHooksFormField;
  message: VueHooksFormField;
  successMessages: string[];
};
