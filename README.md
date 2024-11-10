# 1Pages 博客系统

1Pages 是一个基于 Remix 构建的现代化个人博客平台。它支持 MDX 内容创作、响应式设计和深色模式等特性。

#### 【全网首发】支持部署到良心云EdgeOne Pages的博客系统。

### 【[视频教程](https://www.bilibili.com/video/BV1QEmrYZEtt/)】

## 特性

- 📝 MDX 支持：使用 Markdown 和 React 组件编写文章
- 🎨 响应式设计：完美适配各种设备屏幕
- 🌓 深色模式：自动适应系统主题
- ⚡️ 快速加载：基于 Vite 构建，优化性能
- 🔍 SEO 友好：优化的元数据和结构化数据
- 📱 移动优先：移动端优化的用户体验
- 🏷️ 标签系统：文章分类和标签管理
- 📅 归档功能：按时间归档文章

## 开发计划
- [ ] 支持在Github pages中部署【进行中】
- [ ] 支持在Vercel中部署【计划中】
- [ ] 支持在Cloudflare Pages中部署【计划中】
- [ ] 支持在Cloudflare Workers中部署【计划中】
- [ ] 支持Ai功能【计划中】
- [ ] 自有MDX Editor写博客更省心【进行中】
- [ ] 支持评论系统
- [ ] 支持搜索功能
- [ ] 支持RSS订阅
- [ ] 支持文章统计
- [ ] 自定义主题

## 快速开始

### EdgeOne Pages部署步骤

1. 首先注册登录EdgeOne [网址](https://edgeone.ai/)

2. fork我的项目(github) [网址](https://github.com/aigem/1pages)

3. 新建Pages项目

4. 绑定你们的1pages仓库地址

5. 部署
   ```
   构建部署配置:

   框架预设	未设置
   根目录	/
   输出目录	build/client
   编译命令	npm run build
   安装命令	npm install
   ```

6. 绑定自定义域名
（可选）不绑定也可以访问。[注册域名教程](https://www.bilibili.com/video/BV14r421E7X6/)

7. 发布文章
content/posts 目录下创建 .mdx 文件，根据模板创建即可。查看下面的创建文章章节。

### 本地安装步骤

1. 克隆仓库：
   git clone https://github.com/aigem/1pages.git
   cd 1pages
   
2. 安装依赖：
   pnpm install
   可以设置pnpm为国内源，速度更快。[视频教程](https://www.bilibili.com/video/BV1DJDDYfEfD/)

3. 创建内容目录：
   mkdir -p content/posts

4. 启动开发服务器：
   pnpm dev

### 创建文章

1. 在 content/posts 目录下创建 .mdx 文件：

---
title: 文章标题
date: 2024-03-14
description: 文章描述
tags: [标签1, 标签2]
---

文章内容...

2. 使用自家MDX编辑器，发文更方便。

即将上线，敬请期待。

## 部署

### Cloudflare Pages 部署

1. 在 Cloudflare Pages 创建新项目
2. 连接 Git 仓库
3. 设置构建命令：pnpm build
4. 设置构建输出目录：build/client
5. 设置环境变量（如需要）

### 【[视频教程](https://www.bilibili.com/video/BV1QEmrYZEtt/)】

## 项目结构
```
1pages/
├── app/
│ ├── components/ # React 组件
│ ├── routes/ # 路由组件
│ ├── services/ # 服务层
│ ├── styles/ # 样式文件
│ └── types/ # TypeScript 类型
├── content/
│ └── posts/ # MDX 文章
├── public/ # 静态资源
└── build/ # 构建输出
```
## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 致谢

感谢所有贡献者和使用到的开源项目。

---

最后更新：2024-11-11
