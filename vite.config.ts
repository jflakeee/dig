import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        dig4d: 'dig-4d.html',
      },
    },
  },
});
