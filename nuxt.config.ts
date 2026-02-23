export default defineNuxtConfig({
  css: ['bootstrap/dist/css/bootstrap.min.css'],
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI, // 伺服器端可讀取
  },
  // Vercel 部署設定
  nitro: {
    preset: 'vercel'
  }
})