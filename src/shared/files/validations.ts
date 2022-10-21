import { Ref } from 'vue';

import { Config } from '@/shared/helpers/string/validate';

export const required: Config = { required: { check: true } };

export const requiredEmail: Config = { ...required, email: { check: true } };

export const requiredSelect = (model: Ref<string>) => ({
  custom: { check: model.value !== 'select', message: 'Required value.' },
});

export const requiredMin = (min: number): Config => ({ ...required, min: { check: min } });

export const custom = (condition: boolean, message: string) => ({
  custom: { check: condition, message },
});
