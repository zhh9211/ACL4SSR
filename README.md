# ACL4SSR - Clash / Mihomo 自定义配置转换

针对 Clash / Mihomo 优化的高性能自定义远程订阅转换配置与规则集。支持多机场节点前缀自动识别、智能 Emoji 标记、专属 AI 规则分流及精细化路由控制。

---

## 目录结构

```text
ACL4SSR/
├── config/                     # 远程订阅配置文件（推荐使用）
│   ├── Full.ini                # 完整版（含全量国家/地区分流、自动测速、负载均衡）
│   └── Lite.ini                # 精简版（无国家地区分组，仅保留核心策略）
├── rules/                      # 自定义规则集
│   ├── AI.list                 # AI 平台规则（OpenAI, Claude, Gemini, Copilot, Grok 等）
│   ├── Direct.list             # 个人直连白名单
│   ├── Proxy.list              # 个人代理白名单
│   └── Microsoft.list          # 微软专用服务规则
├── Full_Mannix.ini             # 根目录兼容文件（等同于 config/Full.ini）
├── ACL4SSR_Online_Full_Mannix.ini # 根目录兼容文件
├── ACL4SSR_Online_Mannix.ini   # 根目录兼容文件（等同于 config/Lite.ini）
├── US-AI.list                  # 旧版 AI 规则软兼容
└── update_url.py               # 短链接自动化更新脚本
```

---

## 特性亮点

1. **分流逻辑顺序优化**：
   - `局域网与直连修正` $\to$ `广告净化（REJECT）` $\to$ `专属服务（AI/微软）` $\to$ `个人代理白名单` $\to$ `国内直连（域名/GEOIP）` $\to$ `GFW 规则` $\to$ `最终兜底（未知站点）`。
   - 彻底解决由于代理规则前置导致国内部分站点被误走代理的问题。

2. **现代化 AI 分流**：
   - 独立 `AI.list`，内置 ChatGPT / OpenAI、Anthropic Claude、Google Gemini、Microsoft Copilot、Perplexity、xAI / Grok、Midjourney 等核心全套域名与 WebSocket 节点。
   - US-AI 组默认使用“起飞”，微软组默认直连（`DIRECT`），可在客户端手动切换策略。

3. **智能节点与 Emoji 处理**：
   - **多机场识别**：自动为不同订阅源增加前缀（`大讯-`、`龙猫-`）。
   - **防重叠 Emoji**：自带地区旗帜判断正则，仅为无国旗名称的节点追加 Emoji，保持节点列表整洁。

---

## 订阅转换链接

### 1. 远程配置地址 (GitHub Raw / CDN)

* **完整版 (Full)**：
  ```text
  https://raw.githubusercontent.com/zhh9211/ACL4SSR/main/config/Full.ini
  ```
  *(加速链接: `https://cdn.jsdelivr.net/gh/zhh9211/ACL4SSR@main/config/Full.ini`)*

* **精简版 (Lite)**：
  ```text
  https://raw.githubusercontent.com/zhh9211/ACL4SSR/main/config/Lite.ini
  ```
  *(加速链接: `https://cdn.jsdelivr.net/gh/zhh9211/ACL4SSR@main/config/Lite.ini`)*

### 2. 转换链接模板

将 `{原订阅链接}` 替换为你的机场订阅地址（需 URL 编码）：

* **使用 Dler 转换后端**：
  ```text
  https://api.dler.io/sub?target=clash&udp=true&scv=true&config=https://raw.githubusercontent.com/zhh9211/ACL4SSR/main/config/Full.ini&url={原订阅链接}
  ```

* **使用 subcsub 转换后端**：
  ```text
  https://api.subcsub.com/sub?target=clash&udp=true&scv=true&config=https://raw.githubusercontent.com/zhh9211/ACL4SSR/main/config/Full.ini&url={原订阅链接}
  ```

> **提示**：建议在订阅转换请求中**不要携带** `emoji=true/false` 参数，以便让配置内置的旗帜判定规则生效。

---

## 日常自定义与维护

* **添加直连域名**：编辑 `rules/Direct.list`，填入如 `DOMAIN-SUFFIX,yourdomain.com`。
* **添加代理域名**：编辑 `rules/Proxy.list`，填入目标域名。
* **调整 AI 服务**：编辑 `rules/AI.list`，更新相关平台的 API 或前台访问地址。
* **修改机场识别前缀**：编辑 `config/Full.ini` 与 `config/Lite.ini` 中的 `rename_node=!!GROUPID=...` 规则。
