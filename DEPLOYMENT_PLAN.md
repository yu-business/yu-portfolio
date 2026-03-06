# 个人网页上线技术方案

## 目标
将当前静态个人网页（`index.html + styles.css + script.js`）稳定上线，具备：
- 可公网访问
- HTTPS
- 可绑定自定义域名
- 后续易维护

## 推荐方案（首选）
**GitHub Pages + Cloudflare（可选）**

适用原因：
- 你当前是纯静态站点，无后端依赖
- 成本低（可免费）
- 部署快，维护简单
- 可直接使用 Git 工作流迭代页面

---

## 方案 A：GitHub Pages（最快上线）

### 架构
- 代码仓库：GitHub Repo
- 静态托管：GitHub Pages
- 域名：Namecheap / OVH / Gandi 等
- HTTPS：GitHub Pages 自动签发

### 步骤
1. 新建 GitHub 仓库（如 `yu-portfolio-2026`）。
2. 将本地目录 `/home/yhua/projet/pers/yu-portfolio-2026` 推送到仓库。
3. 在 GitHub 仓库设置中开启 Pages：
   - Source: `Deploy from branch`
   - Branch: `main`（root）
4. 获得默认地址：`https://<github-username>.github.io/<repo-name>/`
5. 若用自定义域名（如 `www.yourdomain.com`）：
   - 在 Pages 配置 Custom domain
   - 域名 DNS 添加 `CNAME` 指向 `<github-username>.github.io`
6. 等待证书签发后，启用 HTTPS 强制跳转。

### 优点
- 最少操作即可上线
- 不需要服务器运维

### 注意
- 你当前的联系弹窗使用 `mailto:`，不会从服务器直接发信，而是调用访客本地邮箱客户端。

---

## 方案 B：Netlify / Vercel（更工程化）

### 架构
- GitHub 仓库连接 Netlify 或 Vercel
- 平台自动构建和发布（本项目无构建步骤）
- PR 预览环境（可选）

### 步骤
1. 推送代码到 GitHub。
2. 在 Netlify/Vercel 导入仓库。
3. Build command 留空，Publish directory 为仓库根目录。
4. 绑定域名并配置 DNS。
5. 平台自动启用 HTTPS。

### 优点
- 自动化和预览能力更好
- 后续扩展 API 或 serverless 更方便

---

## 方案 C：VPS + Nginx（可控性最高）

### 架构
- 云服务器（Ubuntu）
- Nginx 托管静态文件
- Certbot 申请 Let's Encrypt 证书

### 适用场景
- 你后续要接后端服务（邮件 API、日志、数据库）
- 需要更多自定义配置

### 成本与维护
- 需要服务器费用和运维（安全更新、监控、备份）

---

## 建议的最终选择
当前阶段建议：
1. **先用 GitHub Pages 上线（1小时内完成）**
2. 需要更专业工作流时迁移到 Netlify/Vercel
3. 只有在你要上后端功能时再上 VPS

---

## 上线后优化清单
1. 增加 `favicon` 和社交分享图（Open Graph）。
2. 增加 `sitemap.xml`、`robots.txt`。
3. 接入基础统计（Plausible / GA4）。
4. 将“联系弹窗”升级为后端邮件发送（Resend / SendGrid + API）。
5. 添加英文/中文切换，提升国际化展示。

---

## 你下一步可直接执行
1. 告诉我你选择 A/B/C 哪个方案。
2. 我可以直接按你选择的方案，继续给你产出：
   - 对应的完整命令清单
   - 需要新增的配置文件
   - 域名 DNS 记录模板
   
---

## 更新后步骤
  cd /home/yhua/projet/pers/yu-portfolio-2026
  cp -f homepage_yhua/index.html script.js styles.css homepage_yhua/ 2>/dev/null
  || true
  git add .
  git commit -m "update homepage"
  git push

