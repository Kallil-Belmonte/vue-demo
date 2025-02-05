export type ObjectType = { [key: string]: any };

export type Variant = 'base' | 'primary' | 'secondary';

export type Status = 'info' | 'success' | 'warning' | 'danger';

export type SelectOption = {
  text: string;
  value: any;
  disabled?: boolean;
};
