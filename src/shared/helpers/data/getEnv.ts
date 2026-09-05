type Env = 'BASE_URL' | 'DEV' | 'MODE' | 'PROD' | 'SSR';

/**
 * @function getEnv
 * @description Gets the environment variable.
 * @param env - Environment variable.
 * @see EnvVariablesAndModes {@link https://vite.dev/guide/env-and-mode}
 */

const getEnv = (env: Env) => import.meta?.env?.[env];

export default getEnv;
