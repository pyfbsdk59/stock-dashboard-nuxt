import mongoose from 'mongoose';

export default defineNitroPlugin(async (_nitroApp) => {
  const config = useRuntimeConfig();
  
  try {
    // 加上額外的連線設定
    await mongoose.connect(config.mongodbUri, {
      family: 4, // 【關鍵】強制 Node.js 使用 IPv4 解析 DNS，完美解決 Vercel ENOTFOUND 問題
      serverSelectionTimeoutMS: 5000, // 縮短超時時間，不用苦等 10 秒
    });
    console.log('✅ 成功連接到 MongoDB Atlas');
  } catch (err) {
    console.error('❌ MongoDB 連接失敗', err);
  }
});