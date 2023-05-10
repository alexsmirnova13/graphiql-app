/// <reference types="vite-plugin-svgr/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sass from 'vite-plugin-sass';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sass(), svgr()],
});
