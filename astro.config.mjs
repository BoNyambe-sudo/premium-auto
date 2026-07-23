// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://premierautosales.example.com',
  integrations: [react()],
  vite: {
    plugins: [tailwind()],
    build: {
      compress: 'brotli'
    }
  }
});
