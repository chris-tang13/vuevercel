// server.js
// 简单的Express服务器，用于处理Google Maps数据抓取请求

import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 静态文件服务 - 确保正确处理MIME类型
app.use(express.static(join(__dirname, 'dist'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// 确保所有非API路由都返回index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// 抓取Google Maps数据的路由
app.post('/api/scrape-google-map', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // 使用axios获取Google Maps页面内容
    // 注意：这里需要设置适当的User-Agent以避免被阻止
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // 提取评分和评价数量
    // 使用aria-label进行模糊匹配，提高对页面结构变化的适应性
    let rating = null;
    let reviewCount = null;

    // 尝试使用aria-label模糊匹配获取评分
    // 匹配包含'rating'或'评分'的aria-label
    const ratingElements = [
      '[aria-label*="rating"]',
      '[aria-label*="评分"]',
      'div.F7nice span.Aq14fc',
      'div.jANrlb span.Aq14fc',
      'span.z1asCe'
    ];

    for (const selector of ratingElements) {
      if ($(selector).length > 0) {
        rating = $(selector).text().trim();
        // 提取数字评分（有些元素可能包含额外文本）
        const ratingMatch = rating.match(/\d+\.\d+/);
        if (ratingMatch) {
          rating = ratingMatch[0];
        }
        break;
      }
    }

    // 尝试使用aria-label模糊匹配获取评价数量
    // 匹配包含'review'或'评价'的aria-label
    const reviewCountElements = [
      '[aria-label*="review"]',
      '[aria-label*="评价"]',
      'div.F7nice span.jANrlb',
      'div.jANrlb span.jANrlb',
      'span.Yr7JMd'
    ];

    for (const selector of reviewCountElements) {
      if ($(selector).length > 0) {
        reviewCount = $(selector).text().trim();
        // 移除括号和其他非数字字符
        reviewCount = reviewCount.replace(/[^0-9]/g, '');
        break;
      }
    }

    res.json({
      url,
      rating,
      reviewCount
    });
  } catch (error) {
    console.error('Error scraping Google Maps:', error);
    res.status(500).json({
      error: 'Failed to scrape Google Maps data',
      details: error.message
    });
  }
});

// 所有其他路由都指向index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// 注意：
// 1. 此服务器仅用于开发目的，生产环境中需要进一步的安全措施
// 2. Google Maps的HTML结构可能会变化，导致抓取失败
// 3. 频繁抓取Google Maps可能会导致IP被暂时阻止
// 4. 考虑使用Google Maps API代替抓取，以获得更稳定和合法的数据获取方式