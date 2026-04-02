import { Session } from '../types'
import './Sidebar.css'

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
  onToggleCollapse
}: Props) {
  const navItems = [
    { id: 'chat' as const, icon: '💬', label: 'Chat' },
    { id: 'files' as const, icon: '📁', label: 'Files' },
    { id: 'settings' as const, icon: '⚙️', label: 'Settings' },
    { id: 'api' as const, icon: '🔑', label: 'API' }
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
            <span>Sessions</span>
            <button className="new-session-btn" onClick={onCreateSession} title="New chat">
              +
            </button>
          </div>
          <div className="sessions-list">
            {sessions.length === 0 ? (
              <div className="no-sessions">No sessions yet</div>
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
                    title="Delete"
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
          <div className="version">v1.0.0</div>
        )}
      </div>
    </aside>
  )
}
