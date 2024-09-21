import { StyleValue, ButtonHTMLAttributes } from '@vue/runtime-dom';

export type Style = StyleValue;

export type ButtonType = ButtonHTMLAttributes['type'];

export type ObjectType = { [key: string]: any };

export type UserFrom = 'user' | 'search' | 'match' | 'match-to-choose';

export type Variant = 'primary' | 'secondary' | 'base';

export type Status = 'info' | 'success' | 'warning' | 'danger';
