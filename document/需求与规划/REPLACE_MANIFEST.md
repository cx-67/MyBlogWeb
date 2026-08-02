# 替换清单（Replacement Manifest）

> **使用方式**：打开此文档 → 按下方格式填好你的信息 → 把整份文档交给 AI 助手 → 助手会自动替换站点中的占位内容。
>
> **填写说明**：
> - 【必填】= 必须填，否则站点会有空白或报错
> - 【选填】= 不填会用占位值，不影响运行
> - 每项后的 `检索位置` 是 Agent 要去替换的文件路径，供你了解内部逻辑（**你不需要打开那些文件**）
> - 不确定怎么填的字段可以参考 `示例值` 列的格式

---

## 1. 部署信息【必填】

| 字段 | 说明 | 检索位置 | 示例值 | 你的值 |
|------|------|---------|--------|--------|
| GitHub 用户名 | 用于生成最终访问 URL，**只填用户名**，不要带 url 前缀 | `astro.config.mjs` → `site` | `zhangsan` | cx-67 |
| 仓库名 | 如果是用户主页（`用户名.github.io`）填 `MyBlogWeb` 或你的实际仓库名 | `astro.config.mjs` → `base` | `MyBlogWeb` | MyBlogWeb（刚刚新建的仓库）|
| 站点类型 | 项目站 / 用户站；项目站是 `用户名.github.io/仓库名/`，用户站是 `用户名.github.io/` | 决定 `base` 是否带 `/` | `项目站` | 项目站 |

> **Agent 提示**：根据 `站点类型` 自动设置 `base` —— 项目站 → `base: '/<仓库名>'`，用户站 → `base: '/'`。`site` 统一填 `https://<GitHub 用户名>.github.io`。

---

## 2. 个人信息【必填】

| 字段 | 说明 | 检索位置 | 示例值 | 你的值 |
|------|------|---------|--------|--------|
| 姓名 | 显示在关于页 Header 和头像位置 | `src/pages/about.astro` → `profile.name` | `张三` | 成馨 |
| 求职方向 | 简短副标题 | `src/pages/about.astro` → `profile.title` | `全栈开发 · 2026 届秋招` | 27届秋招后端开发/售前解决方案 |
| 个人简介 | 3-5 句话，让面试官初步了解你 | `src/pages/about.astro` → `profile.bio` | `科班出身，热爱全栈开发……` | 南大软工本科在读，vibe coding研发中（这里我感觉处理得不是很好啊，可不可以给我提供一些更好的描述或建议） |
| 所在地 | 可选 | `src/pages/about.astro` → `profile.location` | `北京` | 江苏南京 |
| 邮箱 | 用于联系按钮 | `src/pages/about.astro` → `profile.email` | `zhangsan@email.com` | 231250056@smail.nju.edu.cn |
| GitHub 主页 | 完整 URL | `src/pages/about.astro` → `profile.github` | `https://github.com/zhangsan` | https://github.com/cx-67 |

---

## 3. 技能列表【必填】

> **格式**：按分类列出，每行一个技能。Agent 会自动用彩色标签渲染。

### 3.1 前端技能
```
示例：
Vue3, React, TypeScript, TailwindCSS, Vite
```
你的前端技能：Vue3, React, TypeScript, Vite，CSS
### 3.2 后端技能
```
示例：
Spring Boot, Node.js, Go, MyBatis, Express
```
你的后端技能：Flask /Spring Boot, Node.js, Go, MyBatis

### 3.3 数据库
```
示例：
MySQL, Redis, MongoDB
```
你的数据库技能：MySQL, Redis,ChromaDB

### 3.4 工程化 / 工具
```
示例：
Docker, Git, CI/CD, Nginx, Linux
```
你的工程化技能：Docker, Git, CI/CD, Nginx, Linux

> **Agent 提示**：检索 `src/pages/about.astro` 的 `skills` 数组，按类别填入。

---

## 4. 经历时间线【必填，至少 1 条】

> **格式**：每条经历一行，按 `时间段 | 标题 | 描述` 格式，描述不超过 2 句话。
> **检索位置**：`src/pages/about.astro` → `timeline` 数组

```
示例：
2023.09 - 2027.06 | 南京大学 · 软件工程（本科） | 主修核心课程，GPA 4.17/5.0
```

你的校园经历：

1.软件学院学生会综合联络中心（2024-2025）：拉取赞助，统筹活动物资，协调部门事务
2. 反哺学社社员（2024-2025）：参与春季支教活动，负责后勤与数据统计
3. ___________ | ___________ | ___________
4. ___________ | ___________ | ___________

---

## 5. 项目列表【必填，至少 1 个】

> **格式**：每个项目写一段，Agent 会转成 Markdown 文件放进 `src/content/projects/`。
> **检索位置**：新建 `src/content/projects/<你的文件名>.md`

### 项目 1（必填，示例：最重要的项目）

| 字段 | 说明 | 示例值 | 你的值 |
|------|------|--------|--------|
| 文件名 | 英文，用作 URL 路径（kebab-case） | `campus-market` | study_platform |
| 标题 | 项目名 | `校园二手交易平台` | 智能备考平台 |
| 简介 | 一句话，**不超 80 字** | `面向高校学生的二手物品交易平台` | 面向考研、考公、考证等备考场景的AI智能助手，以对话为核心交互，集成学习规划、知识管理、智能出题、错因诊断等能力，帮助用户高效备考。平台采用大模型驱动的Agent架构，支持多轮对话、工具调用、RAG知识增强及用户自定义扩展。 |
| 角色 | 全栈 / 前端主导 / 后端主导 | `全栈开发（独立）` | AI 产品化后端负责人 |
| 时间 | YYYY-MM-DD | `2025-03-15` | 2026.03 – 2026.06 |
| 精选 | 是否首页展示（是/否），3 个以内 | `是` | 是 |
| 技术栈 | 用英文逗号分隔，**保持命名一致**（如都用 `Vue3` 不要写成 `vue 3`） | `Vue3, Spring Boot, MySQL, Redis` | Python, Flask, LLM, ChromaDB, Redis |
| 分类 | fullstack / frontend / backend / tool | `fullstack` | backend |
| 线上地址 | 可选，**完整 URL 带 https** | `https://example.com` | _____ |
| 源码地址 | 可选，**完整 URL** | `https://github.com/zhangsan/campus-market` | _____ |
| 背景 | 2-3 句话，这个项目解决什么问题 | `校园内二手物品交易需求旺盛……` | _____ |
| 技术架构 | 列出用到的技术、架构特点 | `前端 Vue3 + Vite；后端 Spring Boot + MyBatis-Plus；WebSocket 实现即时聊天` | _____ |
| 核心亮点 | 3-4 条要点（可量化更好） | `基于 WebSocket 的实时聊天；Redis 缓存提升 3 倍 QPS；JWT 鉴权 + 接口幂等` | _____ |
| 文档下载 | 列出 PDF/Word 文件名 + 用途（Agent 会把文件放进 `public/files/` 后引用） | `项目设计文档.pdf, 数据库设计.docx` | _____ |

### 项目 2（选填）

| 字段 | 说明 | 示例值 | 你的值 |
|------|------|--------|--------|
| 文件名 | 英文，用作 URL 路径（kebab-case） | `campus-market` | MilkyTea |
| 标题 | 项目名 | `校园二手交易平台` | 奶茶记录系统 |
| 简介 | 一句话，**不超 80 字** | `面向高校学生的二手物品交易平台` | 面向考研、考公、考证等备考场景的AI智能助手，以对话为核心交互，集成学习规划、知识管理、智能出题、错因诊断等能力，帮助用户高效备考。平台采用大模型驱动的Agent架构，支持多轮对话、工具调用、RAG知识增强及用户自定义扩展。 |
| 角色 | 全栈 / 前端主导 / 后端主导 | `全栈开发（独立）` | AI 产品化后端负责人 |
| 时间 | YYYY-MM-DD | `2025-03-15` | 2026.03 – 2026.06 |
| 精选 | 是否首页展示（是/否），3 个以内 | `是` | 是 |
| 技术栈 | 用英文逗号分隔，**保持命名一致**（如都用 `Vue3` 不要写成 `vue 3`） | `Vue3, Spring Boot, MySQL, Redis` | Python, Flask, LLM, ChromaDB, Redis |
| 分类 | fullstack / frontend / backend / tool | `fullstack` | backend |
| 线上地址 | 可选，**完整 URL 带 https** | `https://example.com` | _____ |
| 源码地址 | 可选，**完整 URL** | `https://github.com/zhangsan/campus-market` | _____ |
| 背景 | 2-3 句话，这个项目解决什么问题 | `校园内二手物品交易需求旺盛……` | _____ |
| 技术架构 | 列出用到的技术、架构特点 | `前端 Vue3 + Vite；后端 Spring Boot + MyBatis-Plus；WebSocket 实现即时聊天` | _____ |
| 核心亮点 | 3-4 条要点（可量化更好） | `基于 WebSocket 的实时聊天；Redis 缓存提升 3 倍 QPS；JWT 鉴权 + 接口幂等` | _____ |
| 文档下载 | 列出 PDF/Word 文件名 + 用途（Agent 会把文件放进 `public/files/` 后引用） | `项目设计文档.pdf, 数据库设计.docx` | _____ |

### 项目 3（选填）

（同上结构，复制后填写）

### 项目 4（选填）

（同上结构，复制后填写）

> **Agent 提示**：
> 1. 文件名要转 kebab-case（`My Project` → `my-project`），避免中文路径
> 2. `tags` 数组会参与首页"技术栈"聚合，命名建议统一（如 `Vue3` / `React` / `Spring Boot`）
> 3. 文档文件需要用户**单独提供 PDF/Word 文件**，Agent 接收后会放到 `public/files/`
> 4. `order` 字段默认按时间倒序，Agent 自动设置；用户也可指定（数字越大越靠前）

---

## 6. 文章列表【选填】

> 格式同项目列表，更简单。检索位置：`src/content/posts/<文件名>.md`

### 文章 1（选填）

| 字段 | 说明 | 你的值 |
|------|------|--------|
| 文件名 | kebab-case | _____ |
| 标题 | 文章标题 | _____ |
| 简介 | 一句话，**不超 100 字** | _____ |
| 发布时间 | YYYY-MM-DD | _____ |
| 标签 | 英文逗号分隔 | _____ |
| 是否草稿 | 是/否 | _____ |
| 正文 | Markdown 内容 | （可直接粘贴你写好的文章 Markdown） |

> 你可以粘贴更多文章，每篇一段。

---

## 7. 文档上传【选填】

> **使用方式**：把你要上传的 PDF / Word 文件，**连同这份清单**一起发给 Agent。Agent 会自动放到 `public/files/` 并在对应项目/关于页引用。

| 文件名 | 类型 | 用途 / 关联 |
|--------|------|-------------|
| 示例：`resume.pdf` | PDF | 简历（关于页下载） |
| 示例：`campus-market-design.pdf` | PDF | 校园项目设计文档（项目 1 文档） |
| _____ | PDF / Word | _____ |
| _____ | PDF / Word | _____ |

> **Agent 提示**：
> - 文件名建议用英文 + kebab-case，避免 URL 编码后变长
> - 简历默认路径 `public/files/resume.pdf`，关于页会直接引用
> - 项目文档路径会写进对应项目的 `documents` 字段

---

## 8. 视觉个性化【选填】

> 不填则用默认多巴胺清新配色（粉红/鹅黄/淡蓝/薄荷绿/丁香紫/象牙白）。

| 偏好 | 说明 | 检索位置 | 你的值 |
|------|------|---------|--------|
| 主题色偏好 | 偏暖 / 偏冷 / 偏粉 / 偏绿 | `src/styles/global.css` → `--color-pink` 等 | _____ |
| 字体偏好 | 默认无衬线；想换圆润/手写/代码风告诉我 | 同上 → `--font-sans` | _____ |
| 是否要暗色模式 | 暂时没做 | — | 暂不支持 |

---

## 9. 自定义导航文案 / 站点名【选填】

| 字段 | 说明 | 检索位置 | 你的值 |
|------|------|---------|--------|
| 站点名（显示在 Logo 旁） | 默认"我的作品集" | `src/components/Header.astro` → `logo-text` | _____ |
| 头像文字 | 关于页头像圈里的字（默认用姓，或一个字符） | `src/pages/about.astro` | _____ |

---

## 完成后

把这份文档（连同你要上传的 PDF/Word 文件、你的真实文章 Markdown）**整体发给 AI 助手**，说一句：
> "请按 REPLACE_MANIFEST.md 帮我替换作品集项目的内容。"

助手会：
1. 自动修改 `astro.config.mjs` 的 `site` 和 `base`
2. 替换 `about.astro` 的 profile/skills/timeline
3. 在 `src/content/projects/` 和 `posts/` 生成对应的 Markdown 文件
4. 把文档放进 `public/files/` 并在项目 frontmatter 中引用
5. 调整配色/字体等个性化项（如果你填了）

---

## 反馈与改进

这份清单是 **试验版**，试用后请告诉 AI 助手：
- 哪些字段**不知道怎么填** → Agent 改成更友好的提示或提供选项
- 哪些字段**没必要** → Agent 移除
- 哪些字段**遗漏了** → Agent 补充
- 整体流程是否顺畅 → 优化交互
