---
title: "LLM 多厂商适配：一个 Wrapper 搞定 DeepSeek/OpenAI/智谱"
description: "如何封装 LLMWrapper 让大模型厂商切换零成本，以及流式调用、Function Calling 的统一处理。"
date: 2026-04-20
tags: ["LLM", "Python", "Flask", "工程化"]
---

## 为什么要适配多厂商

不同 LLM 厂商 API 各不相同：参数名不一样、流式协议有差异、Function Calling 格式也不同。如果业务代码直接调某一家的 SDK，换厂商就是灾难。

在备考 Agent 项目里，我对比了 DeepSeek / OpenAI / 智谱：

| 维度 | DeepSeek | OpenAI | 智谱 |
|------|----------|--------|------|
| 中文能力 | 强 | 中 | 强 |
| API 兼容 | OpenAI 兼容 | 原生 | 部分兼容 |
| 成本 | 低 | 高 | 中 |

最终选 DeepSeek，但保留了随时切换的能力。

## LLMWrapper 设计

核心思路：**统一接口，差异下沉**。

```python
class LLMWrapper:
    def __init__(self, provider: str):
        self.provider = provider
        # 复用 HTTP 连接，避免每次新建
        self.session = requests.Session()
        self.timeout = 120  # 统一超时控制

    def chat(self, messages, stream=False, tools=None):
        # 统一入参，内部按 provider 转换
        ...

    def stream_chat(self, messages):
        # SSE 流式，统一成 generator
        ...
```

## 关键点

1. **连接复用**：用 `requests.Session` 复用 HTTP 连接，减少握手开销
2. **超时控制**：统一 120s 超时，避免某家 API 卡死拖垮整个服务
3. **流式统一**：不同厂商的 SSE 格式有差异，Wrapper 内部归一化成 Python generator
4. **Function Calling 适配**：把各家的工具调用格式映射到统一的 JSON Schema

## 小结

适配层的价值在于**把变化隔离在一个文件里**。业务代码只认 `LLMWrapper`，厂商切换改配置即可。
