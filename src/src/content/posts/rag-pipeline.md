---
title: "RAG 全链路：从 PDF 上传到精准检索"
description: "在备考 Agent 平台中落地 RAG 的完整工程实践：PDF 提取、向量化、状态机流转、元数据过滤。"
date: 2026-03-28
tags: ["RAG", "ChromaDB", "LLM", "Python"]
---

## RAG 不是"接个向量库"

很多人以为 RAG = 文本切片 + Embedding + 检索，三行代码搞定。真正落地才发现，**全链路的工程细节才是难点**。

## 我的 RAG 全链路

```
PDF 上传 → pdfplumber 逐页提取 → LightRAG 向量入库（ChromaDB）
→ 状态机流转 → 按 subject_id 元数据过滤 → 检索结果注入 System Prompt
```

每一步都有坑。

### 1. PDF 提取

用 `pdfplumber` 逐页提取文本。踩过的坑：
- 扫描版 PDF 提取出来是空的，需要前置 OCR 判断
- 表格会变成乱序文本，需要保留结构

### 2. 状态机流转

上传不是同步完成的，要给用户反馈进度：

```
uploading → parsing → indexed
                 ↓
               failed
```

每个状态都对应前端不同的 UI，失败要能重试。

### 3. 元数据过滤提精度

最关键的提精度技巧：**检索时带 `subject_id` 元数据**。

不加过滤时，检索会把所有科目的资料都捞回来，相关性很差。加上 `subject_id` 后，只在当前科目范围内检索，精度大幅提升。

### 4. 注入 System Prompt

检索结果不是直接塞给用户看，而是注入到 System Prompt，让 LLM 基于这些上下文回答。这样答案有据可依，还能引用来源。

## 小结

RAG 的难点不在算法，在工程：状态管理、错误恢复、精度优化。把这些做扎实，RAG 才真的好用。
