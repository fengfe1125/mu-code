export const translations = {
  en: {
    // Sidebar
    chat: 'Chat',
    files: 'Files',
    settings: 'Settings',
    api: 'API',
    sessions: 'Sessions',
    newChat: 'New chat',
    noSessions: 'No sessions yet',
    version: 'v1.0.0',

    // Chat
    howCanIHelp: 'How can I help you code today?',
    askToWrite: 'Ask me to write, debug, or explain code. I can also help with file operations and running commands.',
    you: 'You',
    muCode: 'μ code',
    thinking: 'Thinking...',
    sendMessage: 'Send a message...',
    pressEnter: 'Press Enter to send, Shift+Enter for new line',

    // File Explorer
    fileExplorer: 'File Explorer',
    newFile: 'New file',
    newFolder: 'New folder',
    noFiles: 'No files in workspace',
    clickToCreate: 'Click the buttons above to create files or folders',
    save: 'Save',
    close: 'Close',

    // Settings
    appearance: 'Appearance',
    theme: 'Theme',
    dark: 'Dark',
    light: 'Light',
    fontSize: 'Font Size',
    editor: 'Editor',
    tabSize: 'Tab Size',
    spaces: 'spaces',
    wordWrap: 'Word Wrap',
    lineNumbers: 'Line Numbers',
    autoSave: 'Auto Save',
    on: 'On',
    off: 'Off',
    about: 'About',
    muCodeAi: 'AI-powered coding assistant',

    // API Config
    apiConfig: 'API Configuration',
    addConfig: 'Add Config',
    editConfig: 'Edit Configuration',
    newConfig: 'New Configuration',
    name: 'Name',
    provider: 'Provider',
    apiKey: 'API Key',
    baseUrl: 'Base URL',
    model: 'Model',
    custom: 'Custom',
    activate: 'Activate',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    saveConfig: 'Save Configuration',
    active: 'Active',
    notSet: 'Not set',
    deleteConfirm: 'Are you sure you want to delete this configuration?',

    // Providers
    openai: 'OpenAI',
    anthropic: 'Anthropic',
    qclaw: 'QClaw',

    // Empty states
    emptyChatTitle: 'μ code',
    emptyChatSubtitle: 'AI-powered coding assistant',
    startNewChat: 'Start a new chat',

    // Errors
    error: 'Error',
    noApiConfig: 'No API configuration selected',
    apiError: 'API error',
  },
  zh: {
    // Sidebar
    chat: '聊天',
    files: '文件',
    settings: '设置',
    api: 'API',
    sessions: '会话',
    newChat: '新建聊天',
    noSessions: '暂无会话',
    version: 'v1.0.0',

    // Chat
    howCanIHelp: '今天我能帮你写什么代码？',
    askToWrite: '可以让我写代码、调试、解释代码。我还可以帮助文件操作和运行命令。',
    you: '你',
    muCode: 'μ code',
    thinking: '思考中...',
    sendMessage: '发送消息...',
    pressEnter: '按 Enter 发送，Shift+Enter 换行',

    // File Explorer
    fileExplorer: '文件浏览器',
    newFile: '新建文件',
    newFolder: '新建文件夹',
    noFiles: '工作区没有文件',
    clickToCreate: '点击上方按钮创建文件或文件夹',
    save: '保存',
    close: '关闭',

    // Settings
    appearance: '外观',
    theme: '主题',
    dark: '深色',
    light: '浅色',
    fontSize: '字体大小',
    editor: '编辑器',
    tabSize: 'Tab 大小',
    spaces: '空格',
    wordWrap: '自动换行',
    lineNumbers: '行号',
    autoSave: '自动保存',
    on: '开',
    off: '关',
    about: '关于',
    muCodeAi: 'AI 智能编程助手',

    // API Config
    apiConfig: 'API 配置',
    addConfig: '添加配置',
    editConfig: '编辑配置',
    newConfig: '新建配置',
    name: '名称',
    provider: '提供商',
    apiKey: 'API 密钥',
    baseUrl: '接口地址',
    model: '模型',
    custom: '自定义',
    activate: '激活',
    edit: '编辑',
    delete: '删除',
    cancel: '取消',
    saveConfig: '保存配置',
    active: '已激活',
    notSet: '未设置',
    deleteConfirm: '确定要删除此配置吗？',

    // Providers
    openai: 'OpenAI',
    anthropic: 'Anthropic',
    qclaw: 'QClaw',

    // Empty states
    emptyChatTitle: 'μ code',
    emptyChatSubtitle: 'AI 智能编程助手',
    startNewChat: '开始新聊天',

    // Errors
    error: '错误',
    noApiConfig: '请先选择 API 配置',
    apiError: 'API 请求失败',
  }
}

export type Language = 'en' | 'zh'
export type TranslationKey = keyof typeof translations.en
