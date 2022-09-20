import { Config } from '@/shared/helpers/string/validate';

export const required: Config = { required: { check: true } };

export const requiredEmail: Config = { ...required, min: { check: 2 } };

export const requiredMin = (min: number): Config => ({ ...required, min: { check: min } });
