import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
   plugins: [react(), svgr()],
   resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
   },
});
