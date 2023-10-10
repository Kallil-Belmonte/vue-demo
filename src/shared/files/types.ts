import { StyleValue } from '@vue/runtime-dom';

export type ObjectType = { [key: string]: any };

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
