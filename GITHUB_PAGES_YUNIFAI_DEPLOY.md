# GitHub Pages 完整上线手册（yunifai.com/homepage_yhua）

目标：把你的个人网页上线到
- `https://yunifai.com/homepage_yhua/`（推荐最终使用 HTTPS）
- `http://yunifai.com/homepage_yhua/` 可通过自动跳转到 HTTPS

---

## 0. 先读这个关键限制

GitHub Pages 只能按“域名”做 DNS 映射，**不能只映射某个路径**。

这意味着：
1. 你把 `yunifai.com` 绑定到 GitHub Pages 后，`yunifai.com` 整个域名都会指向 GitHub Pages。
2. 你要的路径 `/homepage_yhua/` 没问题，但它是这个域名下的一个子目录页面。

如果你当前 `yunifai.com` 已经有别的网站在跑，并且你不想影响它，请先停在这里，我给你一套“保留主站 + 只挂载子路径”的反向代理方案。

---

## 1. 准备信息

先准备这 3 个变量：
- GitHub 用户名：`<GH_USER>`
- 仓库名：`<REPO>`（建议：`yunifai-site`）
- 本地项目目录：`/home/yhua/projet/pers/yu-portfolio-2026`

示例：
- `<GH_USER>` = `yourname`
- `<REPO>` = `yunifai-site`

---

## 2. 调整项目结构（确保有 /homepage_yhua/ 路径）

在本地执行：

```bash
cd /home/yhua/projet/pers/yu-portfolio-2026

# 1) 创建目标子目录
mkdir -p homepage_yhua

# 2) 复制当前网页文件到子目录
cp -f index.html styles.css script.js homepage_yhua/

# 3) 可选：根路径自动跳到 /homepage_yhua/
cat > index.html <<'HTML'
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Redirecting...</title>
  <meta http-equiv="refresh" content="0; url=/homepage_yhua/" />
</head>
<body>
  <p>Redirecting to <a href="/homepage_yhua/">/homepage_yhua/</a> ...</p>
</body>
</html>
HTML

# 4) 避免 Jekyll 处理
: > .nojekyll

# 5) 绑定自定义域名
echo "yunifai.com" > CNAME
```

完成后，你的关键文件应是：
- `homepage_yhua/index.html`
- `homepage_yhua/styles.css`
- `homepage_yhua/script.js`
- `index.html`（重定向到 `/homepage_yhua/`）
- `CNAME`
- `.nojekyll`

---

## 3. 初始化 Git 并推送到 GitHub

> 如果目录已经是 git 仓库，跳过 `git init`。

```bash
cd /home/yhua/projet/pers/yu-portfolio-2026

git init

git add .
git commit -m "deploy: prepare GitHub Pages for yunifai.com/homepage_yhua"

git branch -M main
git remote add origin git@github.com:<GH_USER>/<REPO>.git
# 如果你用 HTTPS：
# git remote add origin https://github.com/<GH_USER>/<REPO>.git

git push -u origin main
```

---

## 4. 打开 GitHub Pages

GitHub 仓库页面 -> `Settings` -> `Pages`：
1. `Source` 选 `Deploy from a branch`
2. `Branch` 选 `main`
3. `Folder` 选 `/ (root)`
4. Save

然后在同页面 `Custom domain` 填：
- `yunifai.com`

保存后，等待 Pages 构建成功。

---

## 5. 配置域名 DNS（在你的域名服务商控制台）

为根域 `yunifai.com` 添加/保留以下记录：

A 记录（Host: `@`）
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

AAAA 记录（Host: `@`）
- `2606:50c0:8000::153`
- `2606:50c0:8001::153`
- `2606:50c0:8002::153`
- `2606:50c0:8003::153`

可选（如果你也想支持 `www.yunifai.com`）：
- CNAME（Host: `www`）-> `<GH_USER>.github.io`

注意：
- 若存在冲突的旧 A/AAAA/CNAME 记录，请删掉冲突项。
- DNS 生效通常几分钟到 24 小时。

---

## 6. 启用 HTTPS

回到 GitHub -> `Settings` -> `Pages`：
1. 等待证书签发（可能需要几分钟到 1 小时）
2. 勾选 `Enforce HTTPS`

最终建议访问地址：
- `https://yunifai.com/homepage_yhua/`

---

## 7. 验收清单（一步一步检查）

1. GitHub Pages 状态为 `Your site is live`。
2. 打开：`https://yunifai.com/` 能重定向到 `/homepage_yhua/`。
3. 打开：`https://yunifai.com/homepage_yhua/` 页面正常。
4. 三语切换（FR/EN/中文）正常。
5. 中文名显示为 `华雨`。
6. LinkedIn 跳转到：
   - `https://www.linkedin.com/in/yu-hua-68104220b/`
7. `Me contacter` 弹窗可填写，点击发送会调用本地邮件客户端并发往 `huayubusiness@gmail.com`。

---

## 8. 常见问题排查

### Q1: 打开域名是 404
- 确认 `Settings -> Pages` 的分支是 `main/(root)`。
- 确认仓库根目录有 `index.html`。
- 确认 `CNAME` 文件内容是 `yunifai.com`。

### Q2: 域名打不开但 github.io 地址能打开
- DNS 未生效或记录错误。
- 检查 `@` 的 A/AAAA 是否完整且无冲突。

### Q3: CSS/JS 丢失
- 确保 `homepage_yhua/index.html` 引用 `./styles.css` 与 `./script.js`。
- 确保两个文件和 `index.html` 在同一目录 `homepage_yhua/`。

### Q4: HTTPS 选项灰色
- 先等 DNS 完全生效，再回 GitHub Pages 页面刷新。

---

## 9. 后续更新网页（每次改完执行）

```bash
cd /home/yhua/projet/pers/yu-portfolio-2026

# 日常请直接修改 /homepage_yhua/ 目录下的页面文件
# homepage_yhua/index.html
# homepage_yhua/styles.css
# homepage_yhua/script.js

git add .
git commit -m "update homepage"
git push
```

推送后 GitHub Pages 会自动重新发布。

---

## 10. 最终你会得到的结果

- 个人主页在线地址：`https://yunifai.com/homepage_yhua/`
- 默认语言：法语
- 支持英文/中文切换
- 中文显示名：`华雨`
- 自定义联系弹窗可用
