import deno from '@deno/vite-plugin';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
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
  plugins: [oxlintPlugin({ path: 'src' }), vue(), deno()],
});
