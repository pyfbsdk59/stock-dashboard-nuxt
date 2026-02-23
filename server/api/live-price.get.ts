import * as cheerio from 'cheerio';

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  try {
    const html = await $fetch(`https://stock.wearn.com/a${id}.html`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const $ = cheerio.load(html);
    let price = 0;
    
    // 尋找成交價
    $('ul').each((i, el) => {
      if ($(el).text().includes('成交價')) {
        const txt = $(el).find('li').first().text().replace(/,/g, '').trim();
        price = parseFloat(txt);
      }
    });

    return { price: price > 0 ? price : null };
  } catch (error) {
    return { price: null };
  }
});