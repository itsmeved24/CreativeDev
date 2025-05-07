import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    host: true, // Expose the server to the network
    allowedHosts: ['.ngrok-free.app'], // Allow ngrok domain
  },
})
