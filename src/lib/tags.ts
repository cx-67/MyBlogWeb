/**
 * 全局标签颜色系统 — 权威源
 *
 * 设计原则：
 * 1. 同一个 tag 名称无论出现在哪里（首页技术栈、项目卡片、文章卡片、列表、详情页）
 *    都返回相同的颜色类。
 * 2. 优先使用 TAG_COLOR_MAP 中的预定义颜色（人工控制，符合视觉语义）。
 * 3. 未在映射表中的 tag，使用基于字符串哈希的稳定回退（不依赖位置/顺序）。
 *
 * 5 色莫兰迪对应类（定义在 global.css）：
 *   tag-1: 莫兰迪粉
 *   tag-2: 鼠尾草绿
 *   tag-3: 雾蓝
 *   tag-4: 淡紫灰
 *   tag-5: 暖杏
 */

// 预定义的核心 tag 颜色映射
// 按语义分组：语言/框架/AI/数据/方法论/产品/研究
const TAG_COLOR_MAP: Record<string, 1 | 2 | 3 | 4 | 5> = {
  // ===== 编程语言 ===== (tag-2 绿色)
  'Python': 2,
  'C++': 2,
  'JavaScript': 2,
  'TypeScript': 2,

  // ===== 后端框架 ===== (tag-3 雾蓝)
  'Flask': 3,
  'Spring Boot': 3,
  'Django': 3,
  'Vue3': 3,

  // ===== 前端/小程序 ===== (tag-4 淡紫)
  '微信小程序': 4,
  '云开发': 4,

  // ===== AI/大模型 ===== (tag-1 莫兰迪粉，核心)
  'LLM': 1,
  'Agent': 1,
  'RAG': 1,
  'ReAct': 1,
  'ChromaDB': 1,
  '大模型': 1,
  'Prompt Engineering': 1,
  'AI办公': 1,

  // ===== 数据/中间件 ===== (tag-3 雾蓝)
  'Redis': 3,
  'Kafka': 3,
  'Docker': 3,
  'JWT': 3,
  'AOP': 3,

  // ===== 工程方法 ===== (tag-5 暖杏)
  '工程化': 5,
  '全栈': 5,
  '系统设计': 5,
  '选型': 5,

  // ===== 算法/数据结构 ===== (tag-2 绿色)
  'LeetCode': 2,
  '算法': 2,
  '数据结构': 2,

  // ===== 业务/产品/研究 ===== (tag-4 淡紫)
  '行业研究': 4,
  '技术采纳生命周期': 4,
  '竞品分析': 4,
  '产品设计': 4,
  '商业模式画布': 4,
  '移情图': 4,
  '售前': 4,
  '产品思维': 4,
  '行业认知': 4,
};

/**
 * 根据 tag 名称获取颜色类后缀（1-5）
 */
export function getTagColor(tag: string): 1 | 2 | 3 | 4 | 5 {
  // 优先查映射表
  if (tag in TAG_COLOR_MAP) {
    return TAG_COLOR_MAP[tag];
  }

  // 回退：基于字符串哈希的稳定算法（djb2 变体）
  // 确保同一个 tag 永远映射到同一个颜色
  let hash = 5381;
  for (let i = 0; i < tag.length; i++) {
    hash = ((hash << 5) + hash) + tag.charCodeAt(i);
    hash = hash & hash; // 转为 32 位整数
  }
  return ((Math.abs(hash) % 5) + 1) as 1 | 2 | 3 | 4 | 5;
}

/**
 * 生成完整的 tag class 字符串
 * @param tag 标签名称
 * @param extra 额外的 class（默认空）
 */
export function tagClass(tag: string, extra: string = ''): string {
  const base = `tag tag-${getTagColor(tag)}`;
  return extra ? `${base} ${extra}` : base;
}
