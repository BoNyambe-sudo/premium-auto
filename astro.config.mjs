// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://bonyambe-sudo.github.io/premium-auto/',
  base: '/premium-auto/',
  tailingSlash: 'always',
  integrations: [react()],
  vite: {
    plugins: [tailwind()],
    build: {
      compress: 'brotli'
    }
  }
});
