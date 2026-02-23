import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  stock_id: { type: String, required: true },
  stock_name: { type: String, required: true },
  data_year: { type: Number, required: true },
  data_month: { type: Number, required: true },
  update_date: { type: Date, default: Date.now },
  raw_data: { type: Object, required: true }
});

// 建立聯合唯一索引 (同股票、同年、同月只能一筆)
schema.index({ stock_id: 1, data_year: 1, data_month: 1 }, { unique: true });

export default mongoose.models.StockData || mongoose.model('StockData', schema);