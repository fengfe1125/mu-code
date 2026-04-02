# About μ code / 关于 μ code

<div align="center">

![μ code](public/mu.svg)

**一个现代化的 AI 编程助手 / A Modern AI-Powered Coding Assistant**

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/fengfe1125/mu-code?style=social)](https://github.com/fengfe1125/mu-code/stargazers)
[![Last Commit](https://img.shields.io/github/last-commit/fengfe1125/mu-code/main)](https://github.com/fengfe1125/mu-code/commits)

</div>

---

## 🌟 Overview / 概述

### 🇺🇸 English

μ code is a modern AI-powered coding assistant inspired by [claw-code](https://github.com/ultraworkers/claw-code). It features a beautiful dark-themed UI that makes programming tasks intuitive and efficient.

**Key Features:**
- 💬 Intelligent AI chat interface
- 🎨 Beautiful dark theme with cyan accents
- 🔧 Multiple API provider support
- 📁 Built-in file explorer
- ⚙️ Fully customizable settings
- 🌐 Bilingual interface (EN/ZH)

### 🇨🇳 中文

μ code 是一个现代化的 AI 编程助手，灵感来自 [claw-code](https://github.com/ultraworkers/claw-code)。它拥有精美的深色主题 UI，让编程任务变得直观高效。

**主要特性：**
- 💬 智能 AI 聊天界面
- 🎨 精美的深色主题 + 青色强调
- 🔧 支持多种 API 提供商
- 📁 内置文件浏览器
- ⚙️ 完全可自定义设置
- 🌐 中英双语界面

---

## 🎯 Features / 功能

### Core Features / 核心功能

| Feature | Description | 描述 |
|---------|-------------|------|
| 💬 **AI Chat** | Intelligent conversation with AI for coding tasks | 智能 AI 对话，完成编程任务 |
| 🔑 **API Config** | Support for OpenAI, Anthropic, QClaw, Custom APIs | 支持 OpenAI、Anthropic、QClaw、自定义 API |
| 📁 **File Explorer** | Browse and edit files in workspace | 浏览和编辑工作区文件 |
| ⚙️ **Settings** | Customize theme, font size, editor options | 自定义主题、字体大小、编辑器选项 |
| 🌐 **i18n** | Full bilingual support (English & Chinese) | 完整中英双语支持 |

### Supported APIs / 支持的 API

| Provider | Logo | Description | 描述 |
|----------|------|-------------|------|
| **OpenAI** | 🔷 | GPT-4, GPT-4 Turbo, GPT-3.5 | 最先进的语言模型 |
| **Anthropic** | 🟣 | Claude Sonnet, Claude 3 | 安全可靠的 AI |
| **QClaw** | 🟢 | ModelRoute, DeepSeek | 本地化 AI 服务 |
| **Custom** | ⚪ | Bring your own API | 自定义 API 端点 |

---

## 📸 Screenshots / 截图

### Chat Interface / 聊天界面

```
┌─────────────────────────────────────────────────────┐
│  💬 Chat         │ Model: gpt-4o              │
├─────────────────────────────────────────────────────┤
│                                                     │
│     👤 You                                    │
│     How to implement a binary search?              │
│                                                     │
│              μ                                      │
│     Here's a TypeScript implementation:             │
│                                                     │
│     ```typescript                                  │
│     function binarySearch(                          │
│       arr: number[],                                │
│       target: number                                │
│     ): number {                                    │
│       let left = 0;                                │
│       let right = arr.length - 1;                  │
│       while (left <= right) {                      │
│         const mid = Math.floor(...)                │
│       }                                            │
│     }                                              │
│     ```                                            │
│                                                     │
├─────────────────────────────────────────────────────┤
│  [Type a message...                    ]  →        │
└─────────────────────────────────────────────────────┘
```

### API Configuration / API 配置

```
┌─────────────────────────────────────────────────────┐
│  🔑 API Configuration / API 配置                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ ● My OpenAI Config          [Active]        │   │
│  │   Provider: OpenAI                           │   │
│  │   Model: gpt-4o                              │   │
│  │   API Key: ••••••••••••xxxx                  │   │
│  │                             [Activate] [Edit] │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ ○ Claude Config                              │   │
│  │   Provider: Anthropic                        │   │
│  │   Model: claude-sonnet-4                     │   │
│  │                             [Activate] [Edit] │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│                    [+ Add Config]                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Dark Theme UI / 深色主题界面

| Component | Preview | 预览 |
|-----------|---------|------|
| Background | `#0a0a0f` | 深邃黑 |
| Accent | `#00d4aa` | 科技青 |
| Surface | `#12121a` | 卡片背景 |
| Text | `#e8e8ed` | 主文字 |

---

## 🏗️ Tech Stack / 技术栈

| Layer | Technology | 说明 |
|-------|------------|------|
| Frontend | React 18 | UI 框架 |
| Language | TypeScript | 类型安全 |
| Build | Vite | 快速构建 |
| Styling | CSS Variables | 主题系统 |
| Server | Node.js | API 代理 |

### Project Structure / 项目结构

```
mu-code/
├── src/
│   ├── components/          # React components
│   │   ├── Sidebar.tsx       # 侧边导航
│   │   ├── Chat.tsx          # 聊天界面
│   │   ├── FileExplorer.tsx  # 文件浏览器
│   │   ├── ApiConfigPanel.tsx # API 配置
│   │   └── SettingsPanel.tsx # 设置面板
│   ├── App.tsx               # 主应用
│   ├── main.tsx              # 入口文件
│   ├── types.ts              # 类型定义
│   └── i18n.ts               # 国际化
├── server/
│   └── proxy.js              # API 代理服务器
├── public/
│   └── mu.svg                # Logo
└── package.json
```

---

## 🚀 Getting Started / 快速开始

### Prerequisites / 环境要求

- Node.js 18+
- npm or yarn

### Installation / 安装

```bash
# Clone the repository / 克隆仓库
git clone https://github.com/fengfe1125/mu-code.git
cd mu-code

# Install dependencies / 安装依赖
npm install

# Start development server / 启动开发服务器
npm start
```

Visit http://localhost:5173

---

## 📋 Usage Guide / 使用指南

### 1. Configure API / 配置 API

1. Click "🔑 API" in the sidebar
2. Click "+ Add Config"
3. Select provider (OpenAI/Anthropic/QClaw/Custom)
4. Enter your API Key
5. Click "Activate"

### 2. Start Chatting / 开始聊天

1. Click "💬 Chat" in the sidebar
2. Type your question in the input box
3. Press Enter to send
4. Get AI-powered coding assistance!

### 3. Manage Files / 管理文件

1. Click "📁 Files" in the sidebar
2. Create new files/folders with + buttons
3. Click a file to edit
4. Save changes with Save button

---

## 🔮 Roadmap / 路线图

| Status | Feature | 功能 |
|--------|---------|------|
| ✅ Done | Basic chat interface | 基础聊天界面 |
| ✅ Done | API configuration | API 配置 |
| ✅ Done | File explorer | 文件浏览器 |
| ✅ Done | Settings panel | 设置面板 |
| ✅ Done | i18n support | 国际化支持 |
| 🔄 In Progress | Real API integration | 真实 API 集成 |
| 📋 Planned | Streaming response | 流式响应 |
| 📋 Planned | Code highlighting | 代码高亮 |
| 📋 Planned | Electron desktop app | Electron 桌面应用 |
| 📋 Planned | MCP protocol support | MCP 协议支持 |

---

## 🤝 Contributing / 贡献

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

欢迎贡献代码！详情请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。

```bash
# Fork the project / Fork 项目
# Create your branch / 创建分支
git checkout -b feature/amazing-feature

# Commit your changes / 提交更改
git commit -m "Add amazing feature"

# Push to the branch / 推送到分支
git push origin feature/amazing-feature

# Open a Pull Request / 提交 Pull Request
```

---

## 📄 License / 许可证

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

---

## 🙏 Acknowledgments / 致谢

- Inspired by [claw-code](https://github.com/ultraworkers/claw-code)
- Built with [React](https://react.dev/)
- Powered by [Vite](https://vitejs.dev/)

---

<div align="center">

**Made with ❤️ by [fengfe1125](https://github.com/fengfe1125)**

**用 ❤️ 制作 by [fengfe1125](https://github.com/fengfe1125)**

[![GitHub](https://img.shields.io/badge/GitHub-fengfe1125-181717?style=flat-square&logo=github)](https://github.com/fengfe1125)
[![Twitter](https://img.shields.io/badge/Twitter-@fengfe1125-1DA1F2?style=flat-square&logo=twitter)](https://twitter.com/fengfe1125)

</div>
