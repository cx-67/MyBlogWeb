---
title: "学生信息管理系统"
description: "基于 Spring Boot + Redis + Kafka + Docker 的高可扩展学生信息管理平台，分层架构、安全认证、AOP 请求统计与统一异常处理，容器化一键部署。"
cover: "/images/projects/data-screen.svg"
tags: ["Spring Boot", "Redis", "Kafka", "Docker", "JWT", "AOP"]
category: "fullstack"
role: "安全与部署负责人（4 人团队）"
date: 2025-11-01
featured: true
repoUrl: "https://github.com/cx-67/StudentInfo"
order: 90
---

## 项目背景

学生信息管理是高校常见场景，本项目目标是构建一个高可扩展、安全可控的管理平台，实践企业级后端的分层架构、安全认证、缓存与消息队列、容器化部署等核心能力。

## 我的角色

4 人团队，担任**安全与部署负责人**，主导认证授权体系、缓存与消息中间件集成、容器化部署方案。

## 技术架构

- **后端**：Spring Boot + MyBatis/JPA
- **安全**：Spring Security + JWT + Redis
- **缓存与消息**：Redis（缓存热点数据）、Kafka（异步解耦）
- **部署**：Docker + Docker Compose
- **架构**：分层架构 + 接口规范 + AOP

## 核心亮点

### 1. 安全认证体系

Spring Security + JWT + Redis 实现无状态登录，RBAC 角色权限模型，Token 黑名单管理（退出/改密后立即失效）。

### 2. 缓存与异步解耦

Redis 缓存热点数据，**降低数据库查询延迟约 30%**；Kafka 异步解耦日志与消息通知模块，提升系统吞吐能力。

### 3. AOP 统一处理

基于 AOP 实现统一异常处理与操作日志自动记录，业务代码零侵入。

### 4. 容器化一键部署

5 个 Dockerfile + Docker Compose 一键部署，多环境配置分离（dev / test / prod）。

## 交付成果

- 完整的安全认证与权限体系
- 缓存 + 消息队列的性能与解耦实践
- 可复现的一键部署方案
