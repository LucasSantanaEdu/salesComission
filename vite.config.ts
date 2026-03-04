import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Calculadora de Comissão Produced By Lucas Eduardo',
        short_name: 'Calculadora comissão',
        description: 'Calculadora de folha e comissão do dia seguinte',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone', 
        icons: [
          {
            src: '/icon-192x192.png', 
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});