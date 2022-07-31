/// <reference types="vitest" />
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [svelte()],
  test: {
    globals: true,
    environment: 'jsdom',
    outputFile: 'junit.xml',
    coverage: {
      exclude: [
        '**/*/*.spec.ts',
      ]
    }
  }
})
