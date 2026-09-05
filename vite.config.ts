import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vitePluginChecker from 'vite-plugin-checker';
import oxlintPlugin from 'vite-plugin-oxlint';
import viteSvgLoader from 'vite-svg-loader';

import getEnv from './src/shared/helpers/data/getEnv.ts';

const devPlugins = getEnv('DEV')
  ? [
      oxlintPlugin({ path: 'src' }),
      vitePluginChecker({ vueTsc: { tsconfigPath: './tsconfig.json', buildMode: true } }),
    ]
  : [];

export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [...devPlugins, viteSvgLoader(), vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
