import { StyleValue } from '@vue/runtime-dom';
import { FieldNode } from 'vue-hooks-form/dist/src/utils.d';

export type Style = StyleValue;

export type BootstrapVariants =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

export type VueHooksFormField = {
  value: any;
  error:
    | {
        message: string;
        field: string;
      }[]
    | undefined;
  ref: (nodeRef: FieldNode) => void;
  validate: () => Promise<any>;
};
