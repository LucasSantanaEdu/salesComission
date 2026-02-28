import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Calc Salário & Comissão',
        short_name: 'CalcSalário',
        description: 'Calculadora de folha e comissão do dia seguinte',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone', // Isso faz abrir como app, sem barra de navegação
        icons: [
          {
            src: '/icon-192x192.png', // Você precisará colocar uma imagem com esse nome na pasta 'public'
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png', // O mesmo aqui, mas 512x512
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});