import { Session } from '../types'
import { Language } from '../i18n'
import './Sidebar.css'

type TranslationKey = keyof import('../i18n').typeof import('../i18n').translations.en

interface Props {
  sessions: Session[]
  activeSessionId: string | null
  onSelectSession: (id: string) => void
  onCreateSession: () => void
  onDeleteSession: (id: string) => void
  activeView: 'chat' | 'files' | 'settings' | 'api'
  onSetActiveView: (view: 'chat' | 'files' | 'settings' | 'api') => void
  collapsed: boolean
  onToggleCollapse: () => void
  t: (key: TranslationKey) => string
}

export default function Sidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onCreateSession,
  onDeleteSession,
  activeView,
  onSetActiveView,
  collapsed,
  onToggleCollapse,
  t
}: Props) {
  const navItems = [
    { id: 'chat' as const, icon: '💬', label: t('chat') },
    { id: 'files' as const, icon: '📁', label: t('files') },
    { id: 'settings' as const, icon: '⚙️', label: t('settings') },
    { id: 'api' as const, icon: '🔑', label: t('api') }
  ]

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">μ</span>
          {!collapsed && <span className="logo-text">code</span>}
        </div>
        <button className="collapse-btn" onClick={onToggleCollapse}>
          {collapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => onSetActiveView(item.id)}
            title={item.label}
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && <span className="nav-label">{item.label}</span>}
          </button>
        ))}
      </nav>
      
      {activeView === 'chat' && !collapsed && (
        <div className="sessions-section">
          <div className="section-header">
            <span>{t('sessions')}</span>
            <button className="new-session-btn" onClick={onCreateSession} title={t('newChat')}>
              +
            </button>
          </div>
          <div className="sessions-list">
            {sessions.length === 0 ? (
              <div className="no-sessions">{t('noSessions')}</div>
            ) : (
              sessions.map(session => (
                <div
                  key={session.id}
                  className={`session-item ${activeSessionId === session.id ? 'active' : ''}`}
                  onClick={() => onSelectSession(session.id)}
                >
                  <span className="session-name">{session.name}</span>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteSession(session.id)
                    }}
                    title={t('delete')}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      
      <div className="sidebar-footer">
        {!collapsed && (
          <div className="version">{t('version')}</div>
        )}
      </div>
    </aside>
  )
}
