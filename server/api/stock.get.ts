import StockData from '../models/StockData';

export default defineEventHandler(async (event) => {
  const { id, year, month } = getQuery(event);
  
  // 尋找指定條件，或直接找該股票最新的一筆
  let query = id ? { stock_id: id } : {};
  if (year && month && id) {
    query = { stock_id: id, data_year: Number(year), data_month: Number(month) };
  }

  const data = await StockData.findOne(query).sort({ data_year: -1, data_month: -1 });
  
  // 獲取已匯入的股票清單供 Modal 使用
  const list = await StockData.aggregate([
    { $group: { _id: "$stock_id", name: { $first: "$stock_name" } } },
    { $sort: { _id: 1 } }
  ]);

  return { 
    currentData: data, 
    availableStocks: list.map(s => ({ id: s._id, name: s.name })) 
  };
});