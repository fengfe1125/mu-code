import { useState, useEffect } from 'react'
import { Session, APIConfig, FileNode, Settings } from './types'
import { translations, Language } from './i18n'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import FileExplorer from './components/FileExplorer'
import SettingsPanel from './components/SettingsPanel'
import ApiConfigPanel from './components/ApiConfigPanel'
import './App.css'

// Default settings
const defaultSettings: Settings = {
  theme: 'dark',
  fontSize: 14,
  tabSize: 2,
  wordWrap: true,
  autoSave: true,
  showLineNumbers: true
}

// Default API configs
const defaultApiConfigs: APIConfig[] = [
  {
    id: 'qclaw-default',
    name: 'QClaw ModelRoute',
    provider: 'qclaw',
    apiKey: '',
    baseUrl: 'https://aiarea.qclaw.qq.com',
    model: 'qclaw/modelroute',
    isActive: true
  }
]

function App() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
  const [files, setFiles] = useState<FileNode[]>([])
  const [apiConfigs, setApiConfigs] = useState<APIConfig[]>(defaultApiConfigs)
  const [activeApiConfigId, setActiveApiConfigId] = useState<string>('qclaw-default')
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [activeView, setActiveView] = useState<'chat' | 'files' | 'settings' | 'api'>('chat')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [language, setLanguage] = useState<Language>('zh')

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem('mu-code-state')
    if (saved) {
      try {
        const state = JSON.parse(saved)
        if (state.apiConfigs) setApiConfigs(state.apiConfigs)
        if (state.settings) setSettings({ ...defaultSettings, ...state.settings })
        if (state.activeApiConfigId) setActiveApiConfigId(state.activeApiConfigId)
        if (state.language) setLanguage(state.language)
      } catch (e) {
        console.error('Failed to load saved state:', e)
      }
    }
  }, [])

  // Save state
  useEffect(() => {
    const state = {
      apiConfigs,
      settings,
      activeApiConfigId,
      language
    }
    localStorage.setItem('mu-code-state', JSON.stringify(state))
  }, [apiConfigs, settings, activeApiConfigId, language])

  // Translation helper
  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key] || key
  }

  // Create new session
  const createSession = () => {
    const newSession: Session = {
      id: Date.now().toString(),
      name: `${t('chat')} ${sessions.length + 1}`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setSessions([...sessions, newSession])
    setActiveSessionId(newSession.id)
  }

  // Delete session
  const deleteSession = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id))
    if (activeSessionId === id) {
      setActiveSessionId(sessions.find(s => s.id !== id)?.id || null)
    }
  }

  // Get active session
  const activeSession = sessions.find(s => s.id === activeSessionId)

  // Update session messages
  const updateSessionMessages = (sessionId: string, messages: Session['messages']) => {
    setSessions(sessions.map(s => 
      s.id === sessionId 
        ? { ...s, messages, updatedAt: new Date() }
        : s
    ))
  }

  // Get active API config
  const activeApiConfig = apiConfigs.find(c => c.id === activeApiConfigId)

  return (
    <div className="app">
      <Sidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={setActiveSessionId}
        onCreateSession={createSession}
        onDeleteSession={deleteSession}
        activeView={activeView}
        onSetActiveView={setActiveView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        t={t}
      />
      
      <main className="main-content">
        {activeView === 'chat' && (
          activeSession ? (
            <Chat
              session={activeSession}
              apiConfig={activeApiConfig}
              onUpdateMessages={(messages) => updateSessionMessages(activeSession.id, messages)}
              t={t}
              language={language}
            />
          ) : (
            <div className="empty-state">
              <div className="empty-icon">μ</div>
              <h2>{t('emptyChatTitle')}</h2>
              <p>{t('emptyChatSubtitle')}</p>
              <button className="btn-primary" onClick={createSession}>
                {t('startNewChat')}
              </button>
            </div>
          )
        )}
        
        {activeView === 'files' && (
          <FileExplorer
            files={files}
            onFilesChange={setFiles}
            t={t}
          />
        )}
        
        {activeView === 'settings' && (
          <SettingsPanel
            settings={settings}
            onSettingsChange={setSettings}
            t={t}
            language={language}
            onLanguageChange={setLanguage}
          />
        )}
        
        {activeView === 'api' && (
          <ApiConfigPanel
            configs={apiConfigs}
            activeConfigId={activeApiConfigId}
            onConfigsChange={setApiConfigs}
            onActiveChange={setActiveApiConfigId}
            t={t}
          />
        )}
      </main>
    </div>
  )
}

export default App
