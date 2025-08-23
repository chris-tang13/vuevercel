# Express Vercel 测试项目

这是一个部署在Vercel上的Express测试项目，提供简单的用户数据API。

## 功能
- 访问根路径 `/` 返回欢迎信息
- 访问 `/users` 返回用户数据数组，包含用户姓名、年龄和性别信息

## 本地开发
1. 克隆项目
2. 安装依赖：`npm install`
3. 启动服务器：`node index.js`
4. 在浏览器中访问：`http://localhost:3000`

## 部署到Vercel
1. 确保已安装Vercel CLI：`npm install -g vercel`
2. 登录Vercel账户：`vercel login`
3. 部署项目：`vercel --prod`

## 部署注意事项
1. **Vercel配置文件**：必须创建`vercel.json`文件，指定构建配置和路由规则
2. **应用导出方式**：使用`module.exports = app`导出Express应用，而不是直接在文件中启动服务器
3. **端口设置**：使用`process.env.PORT`获取Vercel分配的端口
4. **开发与生产环境区分**：在本地开发环境中启动服务器，在生产环境中由Vercel处理
5. **依赖管理**：确保`package.json`中包含所有必要的依赖

## API接口
### 获取用户列表
- URL: `/users`
- 方法: `GET`
- 响应: JSON数组，包含用户信息

示例响应:
```json
[
  {"id": 1, "name": "张三", "age": 25, "gender": "男"},
  {"id": 2, "name": "李四", "age": 30, "gender": "男"},
  ...
]
```