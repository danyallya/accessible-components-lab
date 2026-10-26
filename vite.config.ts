import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
  plugins: [react(), VitePWA({ registerType: 'autoUpdate', includeAssets: ['favicon.svg'], manifest: { name: 'Inclusive Interface Lab', short_name: 'Interface Lab', description: 'A component workbench for accessible product teams.', theme_color: '#121411', background_color: '#121411', display: 'standalone', start_url: '/', icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }] }, workbox: { globPatterns: ['**/*.{js,css,html,svg,woff2}'] } })],
  test: { environment: 'jsdom', setupFiles: './src/test/setup.ts', css: true }
});
