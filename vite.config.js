import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/resume/',
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  resolve: {
    dedupe: ['react', 'react-dom', 'three'],
  },
})
