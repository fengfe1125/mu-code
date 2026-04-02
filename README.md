# μ code

<div align="center">

![μ code logo](public/mu.svg)

**一个现代化的 AI 编程助手**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/mu-code.svg?style=social)](https://github.com/YOUR_USERNAME/mu-code/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/mu-code.svg)](https://github.com/YOUR_USERNAME/mu-code/issues)

**English** | [中文文档](#中文文档)

---

一个灵感来自 [claw-code](https://github.com/ultraworkers/claw-code) 的 AI 编程助手，拥有精美的现代化 UI 界面。

An AI-powered coding assistant inspired by [claw-code](https://github.com/ultraworkers/claw-code), featuring a beautiful modern UI.

</div>

---

## Features / 特性

### 🇺🇸 English

- 💬 **Intelligent Chat** - Complete programming tasks through AI conversations
- 🎨 **Beautiful Interface** - Dark theme with modern design
- 🔧 **API Configuration** - Support for OpenAI, Anthropic, QClaw, and custom APIs
- 📁 **File Management** - Built-in file explorer and editor
- ⚙️ **Settings Panel** - Customize theme, fonts, and more
- 🚀 **Real-time Response** - Streaming response support

### 🇨🇳 中文

- 💬 **智能对话** - 与 AI 助手对话完成编程任务
- 🎨 **精美界面** - 深色主题，现代化设计
- 🔧 **API 配置** - 支持 OpenAI、Anthropic、QClaw 等多种 API
- 📁 **文件管理** - 内置文件浏览器和编辑器
- ⚙️ **设置面板** - 可自定义主题、字体等
- 🚀 **实时响应** - 支持流式响应

---

## Tech Stack / 技术栈

| Component | Technology |
|-----------|------------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Server | Node.js Proxy |
| Styling | CSS Variables |

---

## Quick Start / 快速开始

### 🇺🇸 English

```bash
# Install dependencies
npm install

# Start development server (frontend + proxy)
npm start

# Or start separately
npm run dev:server  # Start API proxy
npm run dev         # Start frontend
```

Visit http://localhost:5173

### 🇨🇳 中文

```bash
# 安装依赖
npm install

# 启动开发服务器（前端 + 代理）
npm start

# 或者分别启动
npm run dev:server  # 启动 API 代理
npm run dev         # 启动前端
```

访问 http://localhost:5173

---

## API Configuration / API 配置

### 🇺🇸 English

1. Click "🔑 API" in the left sidebar
2. Click "+ Add Config" to add a new configuration
3. Select provider (OpenAI, Anthropic, QClaw, or Custom)
4. Fill in API Key and model name
5. Click "Activate" to activate the configuration

### 🇨🇳 中文

1. 点击左侧导航栏的 "🔑 API"
2. 点击 "+ Add Config" 添加新配置
3. 选择提供商（OpenAI、Anthropic、QClaw 或自定义）
4. 填写 API Key 和模型名称
5. 点击 "Activate" 激活配置

### Supported Providers / 支持的提供商

| Provider | Base URL | Models |
|----------|----------|--------|
| OpenAI | `https://api.openai.com` | gpt-4o, gpt-4-turbo, gpt-3.5-turbo |
| Anthropic | `https://api.anthropic.com` | claude-sonnet-4, claude-3.5-sonnet, claude-3-haiku |
| QClaw | `https://aiarea.qclaw.qq.com` | qclaw/modelroute, qclaw/deepseek-r1 |
| Custom | *Your URL* | *Your models* |

---

## Project Structure / 项目结构

```
mu-code/
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx          # Left navigation sidebar
│   │   ├── Chat.tsx             # Chat interface
│   │   ├── FileExplorer.tsx     # File browser
│   │   ├── ApiConfigPanel.tsx   # API configuration panel
│   │   └── SettingsPanel.tsx    # Settings panel
│   ├── App.tsx                  # Main application
│   ├── main.tsx                 # Entry point
│   └── types.ts                 # TypeScript definitions
├── server/
│   └── proxy.js                 # API proxy server
├── public/
│   └── mu.svg                   # Logo
└── package.json
```

---

## Screenshots / 截图

*(Coming soon / 即将推出)*

---

## Roadmap / 路线图

- [ ] Real API integration / 真实 API 集成
- [ ] Tool system (file read/write, code execution) / 工具系统
- [ ] Streaming response (SSE) / 流式响应
- [ ] Code syntax highlighting / 代码语法高亮
- [ ] Electron desktop app / Electron 桌面应用
- [ ] MCP protocol support / MCP 协议支持
- [ ] Multi-language support / 多语言支持

---

## Contributing / 贡献

Contributions are welcome! Please feel free to submit a Pull Request.

欢迎贡献代码！请随时提交 Pull Request。

---

## License / 许可证

[MIT License](LICENSE)

---

## Acknowledgments / 致谢

Inspired by [claw-code](https://github.com/ultraworkers/claw-code)

灵感来自 [claw-code](https://github.com/ultraworkers/claw-code)

---

<div align="center">

**Made with ❤️ by [YOUR_USERNAME]**

**用 ❤️ 制作 by [YOUR_USERNAME]**

</div>
