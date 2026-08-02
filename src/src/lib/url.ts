// 统一处理 base 路径拼接，避免 /MyBlogWeb + projects = /MyBlogWebprojects 的 bug
export function withBase(href: string, base: string): string {
  // href 形如 'projects' 或 'projects/xxx' 或 ''
  const cleanHref = href.replace(/^\/+/, '');
  const cleanBase = base.replace(/\/+$/, '');
  if (!cleanHref) return cleanBase + '/';
  return `${cleanBase}/${cleanHref}`;
}

// 处理 public/ 下的静态资源路径（frontmatter 里写的是 /files/xxx.pdf 这种绝对路径），
// 部署到 GitHub Pages 子路径时需要自动补 base 前缀。
// 外链（http/https）不处理，直接返回。
export function assetUrl(path: string, base: string): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith('mailto:') || path.startsWith('tel:')) return path;
  // 本地资源：去掉开头斜杠后用 withBase 拼接
  return withBase(path, base);
}
