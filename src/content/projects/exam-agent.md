---
title: "智能备考 Agent 平台"
description: "面向考研/考公/考证场景的 AI 智能助手，以对话为核心交互，集成学习规划、知识管理、智能出题、错因诊断，支持多轮对话、工具调用、RAG 知识增强与用户自定义扩展。"
cover: "/images/projects/ai-tutor.svg"
tags: ["Python", "Flask", "LLM", "RAG", "ReAct", "ChromaDB", "Redis"]
category: "fullstack"
role: "AI 产品化后端负责人（6 人团队）"
date: 2026-03-01
featured: true
repoUrl: "https://github.com/cx-67/smart-exam-agent"
documents:
  - name: "后端简历.docx"
    path: "/files/resume-backend.docx"
order: 100
---

## 项目背景

备考用户普遍面临三大痛点：**信息检索低效、缺少个性化学习路径、错题管理松散**。本平台以对话为核心交互，将这三大痛点转化为 RAG 知识增强、自动出题批改、跨对话知识复用三项产品功能，帮助用户高效备考。

## 我的角色

6 人团队，担任 AI 产品化后端负责人，**独立交付 4500 行 Python 后端代码**，设计 30+ RESTful API 端点，主导从架构设计到部署的完整链路。

## 技术架构

- **语言与框架**：Python + Flask，RESTful API 设计
- **LLM 适配**：自研 `LLMWrapper` 统一适配 DeepSeek / OpenAI / 智谱，支持流式与非流式调用 + Function Calling
- **向量检索**：ChromaDB + LightRAG，PDF → pdfplumber 逐页提取 → Embedding 入库
- **数据库**：6 个 SQLite 按职责分离（sessions / users / subjects / files / knowledge / skills），WAL 模式保证并发读写
- **缓存**：Redis

## 核心亮点

### 1. ReAct 推理循环（Think→Act→Observe）

分离"纯思考"与"工具执行"阶段防止幻觉。PlannerAgent / RetrieverAgent / QuizMasterAgent 三 Agent 分工，确定性 Workflow 编排。`threading.Event` 实现中断机制，`GeneratorExit` 安全退出。

### 2. LLM 多厂商零成本切换

对比 DeepSeek / OpenAI / 智谱，从中文能力、API 兼容性、成本三维度评估选定 DeepSeek。封装 `LLMWrapper` 复用 HTTP 连接 + 120s 超时控制，切换厂商只需改配置。

### 3. RAG 全链路

PDF 上传 → pdfplumber 逐页提取 → LightRAG 向量入库（ChromaDB）→ 状态机流转（uploading→parsing→indexed→failed）→ 按 `subject_id` 元数据过滤提升检索精度 → 检索结果注入 System Prompt。

### 4. 7 工具 Function Calling 系统

JSON Schema 定义工具注册表，三层过滤（ALWAYS_ON / GLOBAL / SKILL），`inspect.signature` 动态校验参数注入，`PUT /tools/{tool_key}` 实时修改配置。参考 Anthropic Skills 规范实现用户自定义 Skill 上传与动态注册。

### 5. 数据库设计与安全

sessions + turns 双表设计，`(session_id, round_number, step_index)` 复合索引支持高效窗口查询。级联删除：删除科目时自动清理关联文件、向量索引、会话、知识条目、练习历史。SHA-256 加盐哈希存储密码，`secrets.token_hex(32)` 生成 64 字符随机 Token，修改密码后自动使该用户所有 Token 失效。

## 交付成果

- 独立完成 4500 行 Python 后端代码
- 30+ API 端点、7 个 Function Calling 工具、6 个数据库模块
- 流式 SSE 支持中断机制
- 参考 Anthropic Skills 规范实现用户自定义 Skill 上传与动态注册
