const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 模拟用户数据
const users = [
  { id: 1, name: '张三', age: 25, gender: '男' },
  { id: 2, name: '李四', age: 30, gender: '男' },
  { id: 3, name: '王五', age: 28, gender: '女' },
  { id: 4, name: '赵六', age: 22, gender: '女' },
  { id: 5, name: '钱七', age: 35, gender: '男' }
];

// 配置CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// 解析JSON请求体
app.use(express.json());

// 根路由
app.get('/', (req, res) => {
  res.send('Express Vercel 测试项目');
});

// 用户路由
app.get('/users', (req, res) => {
  res.json(users);
});

// 启动服务器
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
  });
}

// 导出应用供Vercel使用
module.exports = app;