import mongoose from 'mongoose';

export default defineNitroPlugin(async (_nitroApp) => {
  const config = useRuntimeConfig();
  try {
    await mongoose.connect(config.mongodbUri);
    console.log('✅ 成功連接到 MongoDB Atlas');
  } catch (err) {
    console.error('❌ MongoDB 連接失敗', err);
  }
});