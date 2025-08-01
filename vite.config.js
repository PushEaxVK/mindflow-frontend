// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     sourcemap: true,
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  server: {
    port: 5173, // Додаю інший порт, щоб уникнути конфлікту
  },
});
