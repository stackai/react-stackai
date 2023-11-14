import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'example',
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/Stack.tsx'),
      name: 'react-stack',
      formats: ['es', 'cjs'],
      fileName: (format) => `react-stack.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          dir: 'dist'
        },
      },
    },
  },
});

