# 1Pages 博客系统

1Pages 是一个基于 Remix 构建的现代化个人博客平台。它支持 MDX 内容创作、响应式设计和深色模式等特性。

## 特性

- 📝 MDX 支持：使用 Markdown 和 React 组件编写文章
- 🎨 响应式设计：完美适配各种设备屏幕
- 🌓 深色模式：自动适应系统主题
- ⚡️ 快速加载：基于 Vite 构建，优化性能
- 🔍 SEO 友好：优化的元数据和结构化数据
- 📱 移动优先：移动端优化的用户体验
- 🏷️ 标签系统：文章分类和标签管理
- 📅 归档功能：按时间归档文章

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8.0 （推荐，也可使用npm）

### 本地安装步骤

1. 克隆仓库：
   git clone https://github.com/aigem/1pages.git
   cd 1pages

2. 安装依赖：
   pnpm install

3. 创建内容目录：
   mkdir -p content/posts

4. 启动开发服务器：
   pnpm dev

### 创建文章

在 content/posts 目录下创建 .mdx 文件：

---
title: 文章标题
date: 2024-03-14
description: 文章描述
tags: [标签1, 标签2]
---

文章内容...

## 部署

### Cloudflare Pages 部署

1. 在 Cloudflare Pages 创建新项目
2. 连接 Git 仓库
3. 设置构建命令：pnpm build
4. 设置构建输出目录：build/client
5. 设置环境变量（如需要）

## 项目结构
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


## 开发指南

### 添加新功能

1. 在相应目录创建组件
2. 更新路由配置
3. 添加必要的类型定义
4. 编写测试（如果需要）

### 样式指南

- 使用 Tailwind CSS 进行样式设计
- 遵循移动优先原则
- 保持深色模式兼容性

## 配置说明

### Vite 配置

vite.config.ts 包含了主要的构建配置：
- MDX 处理
- 路由配置
- 构建优化
- 别名设置

### Remix 配置

- 客户端渲染模式
- 路由配置
- MDX 支持

## 常见问题

1. 文章不显示
   - 检查文件扩展名是否为 .mdx
   - 确认 frontmatter 格式正确
   - 检查控制台错误信息

2. 样式问题
   - 确保 Tailwind 配置正确
   - 检查类名拼写
   - 验证响应式断点

## 待办功能

- [ ] 搜索功能
- [ ] 评论系统
- [ ] 国际化支持
- [ ] 自定义主题
- [ ] RSS 订阅
- [ ] 文章统计
- [ ] 性能优化
- [ ] 图片优化

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 致谢

感谢所有贡献者和使用到的开源项目。

---

最后更新：2024-03-14
