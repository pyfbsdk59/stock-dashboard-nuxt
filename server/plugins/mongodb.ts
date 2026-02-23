import mongoose from 'mongoose';
import dns from 'node:dns'; // 引入 Node.js 內建的 DNS 模組

// 【終極殺手鐧】強制 Vercel 伺服器在解析 mongodb+srv:// 時優先使用 IPv4
// 這行可以直接從系統底層繞過 Vercel 的 IPv6 DNS 解析 Bug
dns.setDefaultResultOrder('ipv4first');

export default defineNitroPlugin(async (_nitroApp) => {
  const config = useRuntimeConfig();
  
  try {
    await mongoose.connect(config.mongodbUri, {
      serverSelectionTimeoutMS: 5000, // 縮短超時時間，避免苦等
    });
    console.log('✅ 成功連接到 MongoDB Atlas');
  } catch (err) {
    console.error('❌ MongoDB 連接失敗', err);
  }
});