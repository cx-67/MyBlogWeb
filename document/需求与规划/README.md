# 个人作品集网站

秋招求职用的个人作品集站点，展示全栈项目经历与技术文章。采用 Astro 构建，部署于 GitHub Pages。

## 技术栈

- **框架**：Astro 4（静态站点生成）
- **样式**：原生 CSS + 设计令牌（多巴胺清新主题）
- **内容**：Markdown + Content Collections（类型安全）
- **部署**：GitHub Pages（GitHub Actions 自动部署）

## 快速开始

```bash
npm install      # 安装依赖
npm run dev      # 本地开发 http://localhost:4321/MyBlogWeb/
npm run build    # 构建到 dist/
npm run preview  # 预览构建产物
```

## 目录结构

```
src/
├── components/        # 复用组件
│   ├── Header.astro       导航栏
│   ├── Footer.astro       页脚
│   ├── ProjectCard.astro  项目卡片
│   ├── PostCard.astro     文章卡片
│   └── Tags.astro         彩色标签
├── content/           # 内容集合
│   ├── config.ts          集合 schema 定义
│   ├── projects/          全栈项目（Markdown）
│   └── posts/             技术文章（Markdown）
├── layouts/
│   └── BaseLayout.astro   基础布局
├── pages/             # 路由页面
│   ├── index.astro        首页
│   ├── projects/          项目列表 + 详情
│   ├── posts/             文章列表 + 详情
│   └── about.astro        关于页
└── styles/
    └── global.css         全局样式与设计令牌

public/
├── images/projects/   项目封面图（SVG/PNG）
├── images/posts/      文章封面图
├── files/             PDF / Word 文档（简历、设计文档等）
└── styles/prose.css   Markdown 正文排版
```

## 如何添加内容

### 新增项目

在 `src/content/projects/` 下新建 `.md` 文件：

```markdown
---
title: "项目标题"
description: "一句话简介"
cover: "/images/projects/xxx.svg"
tags: ["Vue3", "Spring Boot"]
category: "fullstack"
role: "全栈开发"
date: 2025-06-01
featured: true          # 是否首页精选
liveUrl: "https://..."  # 可选
repoUrl: "https://..."  # 可选
documents:              # 可下载文档
  - name: "设计文档.pdf"
    path: "/files/xxx.pdf"
order: 100              # 排序权重，越大越靠前
---

正文用 Markdown 写...
```

### 新增文章

在 `src/content/posts/` 下新建 `.md` 文件：

```markdown
---
title: "文章标题"
description: "简介"
date: 2025-06-01
tags: ["标签1", "标签2"]
cover: "/images/posts/xxx.svg"   # 可选
draft: false                     # true 则不发布
---

正文...
```

### 添加文档

把 PDF / Word 文件放到 `public/files/` 目录，然后在项目的 `documents` 字段引用路径即可。

## 部署到 GitHub Pages

1. **修改配置**：编辑 `astro.config.mjs`，把 `site` 改成你的 GitHub Pages 域名，`base` 改成你的仓库名。
   - 项目站点（`https://用户名.github.io/仓库名/`）：`base: '/仓库名'`
   - 用户站点（`https://用户名.github.io/`）：`base: '/'`
2. **推送代码**到 GitHub 仓库的 `main` 分支。
3. **开启 Pages**：仓库 Settings → Pages → Source 选 "GitHub Actions"。
4. 推送后 `.github/workflows/deploy.yml` 会自动构建部署。

## 个性化

- **配色**：修改 `src/styles/global.css` 顶部的 CSS 变量（`--color-pink` 等）。
- **个人信息**：编辑 `src/pages/about.astro` 中的 `profile`、`skills`、`timeline` 对象。
- **站点名/导航**：编辑 `src/components/Header.astro`。

## 痛点记录

见 `PAIN_POINTS.md` —— 这是构建过程中沉淀的痛点，将作为"作品集生成助手 Agent"项目的需求输入。
