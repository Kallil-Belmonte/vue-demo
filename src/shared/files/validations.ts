import { Config } from '@/shared/helpers/string/validate';

export const requiredEmail: Config = { required: { check: true }, min: { check: 2 } };

export const requiredMin = (min: number): Config => ({
  required: { check: true },
  min: { check: min },
});
