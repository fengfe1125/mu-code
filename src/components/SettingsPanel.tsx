import { Settings } from '../types'
import './SettingsPanel.css'

interface Props {
  settings: Settings
  onSettingsChange: (settings: Settings) => void
}

export default function SettingsPanel({ settings, onSettingsChange }: Props) {
  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  return (
    <div className="settings-panel panel">
      <div className="panel-header">
        <h2 className="panel-title">Settings</h2>
      </div>

      <div className="panel-content">
        <section className="settings-section">
          <h3>Appearance</h3>
          
          <div className="setting-item">
            <label>Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => updateSetting('theme', e.target.value as 'dark' | 'light')}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          <div className="setting-item">
            <label>Font Size</label>
            <div className="setting-input">
              <input
                type="range"
                min="12"
                max="24"
                value={settings.fontSize}
                onChange={(e) => updateSetting('fontSize', parseInt(e.target.value))}
              />
              <span>{settings.fontSize}px</span>
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h3>Editor</h3>
          
          <div className="setting-item">
            <label>Tab Size</label>
            <select
              value={settings.tabSize}
              onChange={(e) => updateSetting('tabSize', parseInt(e.target.value))}
            >
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
            </select>
          </div>

          <div className="setting-item toggle">
            <label>Word Wrap</label>
            <button
              className={`toggle-btn ${settings.wordWrap ? 'active' : ''}`}
              onClick={() => updateSetting('wordWrap', !settings.wordWrap)}
            >
              {settings.wordWrap ? 'On' : 'Off'}
            </button>
          </div>

          <div className="setting-item toggle">
            <label>Line Numbers</label>
            <button
              className={`toggle-btn ${settings.showLineNumbers ? 'active' : ''}`}
              onClick={() => updateSetting('showLineNumbers', !settings.showLineNumbers)}
            >
              {settings.showLineNumbers ? 'On' : 'Off'}
            </button>
          </div>

          <div className="setting-item toggle">
            <label>Auto Save</label>
            <button
              className={`toggle-btn ${settings.autoSave ? 'active' : ''}`}
              onClick={() => updateSetting('autoSave', !settings.autoSave)}
            >
              {settings.autoSave ? 'On' : 'Off'}
            </button>
          </div>
        </section>

        <section className="settings-section">
          <h3>About</h3>
          <div className="about-info">
            <div className="about-logo">μ</div>
            <div className="about-text">
              <h4>μ code</h4>
              <p>AI-powered coding assistant</p>
              <p className="version">Version 1.0.0</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
