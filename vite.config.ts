import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/simple-todo-app',
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    globals: true,
  },
})
