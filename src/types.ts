// API Configuration Types
export interface APIConfig {
  id: string
  name: string
  provider: 'openai' | 'anthropic' | 'custom' | 'qclaw'
  apiKey: string
  baseUrl: string
  model: string
  isActive: boolean
}

// Message Types
export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  toolCalls?: ToolCall[]
  status?: 'pending' | 'streaming' | 'complete' | 'error'
}

// Tool Types
export interface Tool {
  name: string
  description: string
  parameters: Record<string, any>
}

export interface ToolCall {
  id: string
  name: string
  arguments: Record<string, any>
  result?: string
  status: 'pending' | 'running' | 'complete' | 'error'
}

// File Types
export interface FileNode {
  name: string
  path: string
  type: 'file' | 'directory'
  children?: FileNode[]
  content?: string
  language?: string
}

// Session Types
export interface Session {
  id: string
  name: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
  workingDirectory?: string
}

// Settings Types
export interface Settings {
  theme: 'dark' | 'light'
  fontSize: number
  tabSize: number
  wordWrap: boolean
  autoSave: boolean
  showLineNumbers: boolean
}

// App State
export interface AppState {
  sessions: Session[]
  activeSessionId: string | null
  files: FileNode[]
  apiConfigs: APIConfig[]
  activeApiConfigId: string | null
  settings: Settings
  isLoading: boolean
  error: string | null
}
