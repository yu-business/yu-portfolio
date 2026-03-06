# Deployment Trace - yunifai.com/homepage_yhua

Date: 2026-03-06
Workspace: /home/yhua/projet/pers/yu-portfolio-2026

## Step 1 - Initial audit
- Confirmed project files exist (index.html, styles.css, script.js).
- Confirmed directory was NOT a git repository yet.

## Step 2 - Prepare GitHub Pages path structure
Actions executed:
1. Created subdirectory: `homepage_yhua/`
2. Copied website files:
   - `homepage_yhua/index.html`
   - `homepage_yhua/styles.css`
   - `homepage_yhua/script.js`
3. Replaced root `index.html` with redirect page to `/homepage_yhua/`.
4. Created `.nojekyll`.
5. Created `CNAME` with value `yunifai.com`.

Verification:
- Root now contains `.nojekyll`, `CNAME`, `homepage_yhua/`, redirect `index.html`.
- `homepage_yhua/` contains the deployed website files.

## Step 3 - Pending (needs user credentials/platform access)
- Initialize git and push to GitHub remote repository.
- Enable GitHub Pages (main/root).
- Configure custom domain `yunifai.com` in repository settings.
- Configure DNS at domain provider.
- Enable Enforce HTTPS and verify URL.


## Step 4 - Local git repository setup
Actions executed:
1. Created `.gitignore` (ignoring `.idea/`, `.DS_Store`).
2. Initialized git repository.
3. Added all files and created initial commit:
   - Commit: `43d6c46`
   - Message: `prepare GitHub Pages deploy for yunifai.com/homepage_yhua`
4. Renamed branch to `main`.

Verification:
- `git status` shows clean branch `main`.

## Step 5 - Blocked waiting for user-provided platform data
Required to continue end-to-end deployment:
1. GitHub username and target repository name (or full repo URL).
2. Confirmation whether `yunifai.com` currently hosts another website that must remain active.
3. DNS provider name (Cloudflare/Namecheap/GoDaddy/etc.) and whether user has dashboard access.

## Step 6 - Connect and push to GitHub repository
User provided:
- Repo URL: `https://github.com/yu-business/yu-portfolio`
- Domain status: no existing website to preserve
- DNS provider: AWS Route 53 (user has console access)

Actions executed:
1. Added git remote `origin` to repository URL.
2. Attempted HTTPS push -> failed due non-interactive auth (`could not read Username`).
3. Switched remote to SSH: `git@github.com:yu-business/yu-portfolio.git`.
4. Detected local SSH key files exist (`~/.ssh/id_rsa`).
5. Added GitHub host key into `~/.ssh/known_hosts` using `ssh-keyscan`.
6. Retried push over SSH -> failed with `Permission denied (publickey)`.

Current blocker:
- Local SSH key is not authorized on GitHub account/repository yet.

Next required user action:
- Either add local public key (`~/.ssh/id_rsa.pub`) to GitHub account SSH keys,
  OR provide HTTPS Personal Access Token flow for push.

## Step 7 - GitHub push after SSH key setup
User action completed:
- SSH key added to GitHub account.

Action executed:
- `git push -u origin main`

Result:
- Push succeeded.
- Remote branch `main` created and tracking set.

## Step 8 - Tooling capability check on runner
Checks executed:
- `gh` CLI availability -> not installed.
- `aws` CLI availability -> not installed.

Impact:
- GitHub Pages settings and Route53 DNS changes cannot be executed directly from this runner.
- These two parts must be done in web consoles by user.

Required user console actions (now):
1. GitHub repo `yu-business/yu-portfolio` -> Settings -> Pages
   - Source: Deploy from a branch
   - Branch: `main`, Folder: `/ (root)`
   - Custom domain: `yunifai.com`
2. Route53 hosted zone `yunifai.com`:
   - Add A records for `@` to:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Add AAAA records for `@` to:
     - 2606:50c0:8000::153
     - 2606:50c0:8001::153
     - 2606:50c0:8002::153
     - 2606:50c0:8003::153
3. Back to GitHub Pages, wait certificate issuance.
4. Enable `Enforce HTTPS`.

After user confirms completion, run final validation on URLs.

## Step 9 - GitHub Pages domain status reported by user
User reported GitHub Pages status:
- Custom domain: `yunifai.com`
- Status: `DNS valid for primary`
- Additional warning: `www.yunifai.com is improperly configured` (InvalidDNSError)

Interpretation:
- Primary target domain `yunifai.com` is correctly configured.
- Only `www` subdomain is missing or misconfigured.
- This does NOT block serving from `yunifai.com`.

## Step 10 - Live site verification by user
User confirmed:
- `https://yunifai.com/homepage_yhua/` displays the personal webpage successfully.

Conclusion:
- Deployment target achieved.
- Site is live on custom domain path.

## Step 11 - Push rejection fix (non-fast-forward)
Issue reported by user:
- Shell syntax error due to line break before `|| true`.
- `git push` rejected: remote had newer commits.

Actions executed:
1. Checked local status/log.
2. Fetched remote updates: `git fetch origin`.
3. Observed divergence: local ahead 1, behind 2.
4. Rebased local branch on top of remote main: `git rebase origin/main`.
5. Pushed successfully: `git push origin main`.

Result:
- Remote `main` updated to commit `d71b6d9`.
- User update is now published.

## Step 12 - Diagnose browser ERR_CERT_COMMON_NAME_INVALID
User reported Chrome warning:
- "Votre connexion n'est pas privee"
- `net::ERR_CERT_COMMON_NAME_INVALID`

Live checks executed:
1. DNS resolution for `yunifai.com`:
   - A: 185.199.108.153 / .109.153 / .110.153 / .111.153
   - AAAA: 2606:50c0:8000::153 / ::8001::153 / ::8002::153 / ::8003::153
   => DNS points correctly to GitHub Pages.
2. DNS for `www.yunifai.com`:
   - CNAME: `yu-business.github.io.`
3. TLS certificate served by `yunifai.com:443` currently:
   - Subject CN: `*.github.io`
   - SAN: `*.github.com`, `*.github.io`, etc.
   - DOES NOT include `yunifai.com`.
4. CAA check:
   - No restrictive CAA record found.

Interpretation:
- Routing is correct.
- Custom certificate issuance/attachment for `yunifai.com` is not active yet on GitHub Pages side.

## Step 13 - URL path migration to /homepage/yhua/
User request:
- Change URL from `https://yunifai.com/homepage_yhua/` to `https://yunifai.com/homepage/yhua/`.

Actions executed:
1. Created nested directory `homepage/yhua/`.
2. Copied live site files into nested target path:
   - `homepage/yhua/index.html`
   - `homepage/yhua/styles.css`
   - `homepage/yhua/script.js`
3. Added compatibility redirect from old path:
   - `homepage_yhua/index.html` -> redirects to `/homepage/yhua/`.
4. Added helper redirect:
   - `homepage/index.html` -> redirects to `/homepage/yhua/`.
5. Updated root redirect:
   - `/index.html` now redirects to `/homepage/yhua/`.

Expected behavior after deploy:
- New canonical URL: `https://yunifai.com/homepage/yhua/`
- Old URL still works and redirects to new URL.
