import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vitePluginChecker from 'vite-plugin-checker';
import oxlintPlugin from 'vite-plugin-oxlint';

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
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/assets/scss/helpers' as *;`,
      },
    },
  },
  plugins: [
    vue(),
    vitePluginChecker({
      vueTsc: {
        tsconfigPath: './tsconfig.json',
        buildMode: true,
      },
    }),
    oxlintPlugin({ path: 'src' }),
  ],
});
