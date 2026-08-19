# VChat

基于 Electron + Vue 3 的桌面端 AI 聊天应用，支持多模型提供商、流式对话、会话持久化与中英文切换。

## 功能特性

- **多提供商支持**：内置 DeepSeek、千帆适配器，通过统一接口可快速扩展更多模型
- **流式输出**：回答实时渲染，DeepSeek 支持 reasoning（思维链）内容展示
- **会话管理**：会话与消息通过 Dexie（IndexedDB）本地持久化，重启不丢失
- **多语言**：内置中文 / 英文，vue-i18n 管理文案
- **设置持久化**：语言、字号等设置保存至用户数据目录 `settings.json`（临时文件 + rename 原子写入，防损坏）

## 技术栈

| 层 | 技术 |
| --- | --- |
| 桌面框架 | Electron 43 + Electron Forge 7（Vite 插件） |
| 前端 | Vue 3.5 + vue-router（hash 模式）+ Pinia |
| UI | Tailwind CSS 4 + radix-vue + @iconify-vue |
| 数据 | Dexie（IndexedDB）+ JSON 文件（设置） |
| AI 接入 | openai SDK（兼容协议）+ 适配器模式 |
| 构建 | Vite 5（main / preload / renderer 三入口）+ TypeScript |

## 环境要求

- Node.js ≥ 20（开发环境为 v24）
- pnpm ≥ 11

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

> ⚠️ pnpm 11 与 Electron Forge 存在兼容性坑，本项目已在 `pnpm-workspace.yaml` 中配置好（`nodeLinker: hoisted`、`blockExoticSubdeps: false`、`allowBuilds`）。若安装后仍缺 electron 二进制，手动执行：
>
> ```bash
> ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/ node node_modules/electron/install.js
> ```

### 2. 配置环境变量

复制 `.env` 并填入 API Key：

```bash
# DeepSeek 适配器
DEEPSEEK_API_KEY=sk-xxx

# 千帆适配器
OPENAI_API_KEY=xxx

# 发布 GitHub Release 时使用（可选）
GITHUB_TOKEN=ghp_xxx
```

> 主进程与 forge 构建脚本通过 dotenv 读取 `.env`，该文件已被 gitignore。

### 3. 启动开发

```bash
pnpm start
```

开发模式会自动打开 DevTools。

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `pnpm start` | 启动开发环境 |
| `pnpm package` | 打包应用（不生成安装包） |
| `pnpm make` | 生成分平台安装包 |
| `pnpm publish` | 发布到 GitHub Release（默认 draft + pre-release） |
| `pnpm lint` | ESLint 检查 |

打包目标：Windows（Squirrel .exe）、macOS（ZIP）、Linux（DEB / RPM），Windows 安装包图标与元信息见 [forge.config.ts](forge.config.ts)。

## 项目结构

```
src/
├── main.ts              # 主进程入口（窗口创建、注册 IPC）
├── preload.ts           # contextBridge 暴露 window.electronAPI
├── chat.ts              # 聊天 IPC：start-chat / update-message / chat-error
├── settings.ts          # 设置读写（userData/settings.json）
├── db.ts                # Dexie 数据库（providers / conversations / messages）
├── providers/           # 模型提供商适配器
│   ├── types.ts         # ProviderAdapter 接口定义
│   ├── deepseek.ts      # DeepSeek（含 reasoning_content 归一化）
│   └── qianfan.ts       # 百度千帆
├── data/                # 种子数据（首次启动写入 providers）
├── views/               # 页面：Home / Conversation / Setting
├── components/          # 通用组件（消息列表、输入框等）
├── store/               # Pinia stores
├── locales/             # i18n 文案（zh-CN / en-US）
├── types/               # 共享类型定义
└── router/              # 路由（hash 模式，打包后可直接 file:// 加载）
```

构建配置：[forge.config.ts](forge.config.ts)（打包 / 发布）、[vite.main.config.ts](vite.main.config.ts)、[vite.preload.config.ts](vite.preload.config.ts)、[vite.renderer.config.ts](vite.renderer.config.ts)

## 架构说明

### 进程模型与 IPC

```
渲染进程 (Vue) ──start-chat──▶ 主进程 (chat.ts)
    ▲                              │ 创建 OpenAI 兼容客户端
    │ ◀──update-message（流式分片）──┤
    │ ◀──chat-error（异常）──────────┘
```

- 渲染进程通过 `window.electronAPI.startChat({ messages, providerName, selectedModel, messageId })` 发起请求
- 主进程根据 `providerName` 查找适配器，用 openai SDK 以流式方式请求，逐块回传
- API Key 只存在于主进程环境变量，渲染进程不接触

### 提供商适配器

每个提供商实现 [ProviderAdapter](src/providers/types.ts) 接口，屏蔽不同厂商的差异：

| 职责 | 说明 |
| --- | --- |
| `baseURL` | OpenAI 兼容端点 |
| `getApiKey()` | 从环境变量读取 Key |
| `normalizeChunk()` | 将厂商原始分片归一化为统一结构（content / reasoning / isEnd / finishReason） |

新增提供商步骤：

1. 在 `src/providers/` 下新建适配器文件并实现 `ProviderAdapter`
2. 在 `src/providers/index.ts` 的 `adapters` 中注册
3. （可选）在 `src/data/index.ts` 的种子数据中添加模型信息
4. 在 `.env` 中添加对应的 API Key

### 数据存储

- **会话 / 消息 / 提供商**：Dexie（IndexedDB），表结构见 [db.ts](src/db.ts)
- **应用设置**：`app.getPath('userData')/settings.json`，先写临时文件再 rename，避免写入中途崩溃导致损坏

## 常见问题

### pnpm install 报 `ERR_PNPM_EXOTIC_SUBDEP`

pnpm 11 的已知 bug（#10331），需在全局配置 `pnpm config` 所在目录的 `config.yaml` 中设置：

```yaml
blockExoticSubdeps: false
```

### 启动报 `Cannot find module 'lodash'`

pnpm 将 electron-winstaller 的依赖 lodash 按 optional 处理，未装入 node_modules。解决：`pnpm add lodash` 安装为直接依赖。

### 打包时 electron 二进制下载慢

`.npmrc` 与 [forge.config.ts](forge.config.ts) 已配置 npmmirror 镜像。

## License

MIT
