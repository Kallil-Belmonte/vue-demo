import { defineConfig } from 'vite';
import deno from '@deno/vite-plugin';
import biome from 'vite-plugin-biome';
import vue from '@vitejs/plugin-vue';

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
        api: 'modern-compiler',
      },
    },
  },
  plugins: [deno(), biome(),vue()],
});
