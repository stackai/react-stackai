import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Configuration for React component
const reactConfig = defineConfig({
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
        dir: path.resolve(__dirname, './dist/'),
      },
    },
  },
});

// Configuration for Vanilla JavaScript script
const vanillaConfig = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/vanilla-stackai.js'),
      name: 'VanillaStackAI',
      formats: ['iife'],
      fileName: () => 'vanilla-stackai.js',
    },
    rollupOptions: {
      output: {
        dir: path.resolve(__dirname, './dist/vanilla'),
      },
    },
    plugins: [],
  },
});

export default defineConfig(({ mode }) => {
  const buildTarget = process.env.BUILD_TARGET;

  if (buildTarget === 'vanilla') {
    return vanillaConfig;
  } else {
    return reactConfig;
  }
});
