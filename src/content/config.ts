import { defineCollection, z } from 'astro:content';

// 全栈项目集合
const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // 项目封面图（放在 public/images/projects/ 下，填路径如 /images/projects/xxx.png）
    cover: z.string().optional(),
    // 技术栈彩色标签
    tags: z.array(z.string()).default([]),
    // 项目分类：fullstack / frontend / backend / tool 等
    category: z.string().default('fullstack'),
    // 我在项目中的角色
    role: z.string().default('独立开发'),
    // 项目时间
    date: z.coerce.date(),
    // 是否精选（首页展示）
    featured: z.boolean().default(false),
    // 线上地址
    liveUrl: z.string().url().optional(),
    // 源码地址
    repoUrl: z.string().url().optional(),
    // 相关文档（PDF/Word 等，放在 public/files/ 下，如 /files/xxx.pdf）
    documents: z
      .array(
        z.object({
          name: z.string(),
          path: z.string(),
        })
      )
      .default([]),
    // 外部链接（飞书 Wiki / 在线文档等）
    externalDocs: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().url(),
        })
      )
      .default([]),
    // 排序权重（越大越靠前）
    order: z.number().default(0),
  }),
});

// 文章集合
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, posts };
