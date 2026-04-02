import { Settings } from '../types'
import { Language } from '../i18n'
import './SettingsPanel.css'

interface Props {
  settings: Settings
  onSettingsChange: (settings: Settings) => void
  t: (key: any) => string
  language: Language
  onLanguageChange: (lang: Language) => void
}

export default function SettingsPanel({ 
  settings, 
  onSettingsChange, 
  t,
  language,
  onLanguageChange
}: Props) {
  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  return (
    <div className="settings-panel panel">
      <div className="panel-header">
        <h2 className="panel-title">{t('settings')}</h2>
      </div>

      <div className="panel-content">
        <section className="settings-section">
          <h3>{t('appearance')}</h3>
          
          <div className="setting-item">
            <label>语言 / Language</label>
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
            >
              <option value="zh">中文</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="setting-item">
            <label>{t('theme')}</label>
            <select
              value={settings.theme}
              onChange={(e) => updateSetting('theme', e.target.value as 'dark' | 'light')}
            >
              <option value="dark">{t('dark')}</option>
              <option value="light">{t('light')}</option>
            </select>
          </div>

          <div className="setting-item">
            <label>{t('fontSize')}</label>
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
          <h3>{t('editor')}</h3>
          
          <div className="setting-item">
            <label>{t('tabSize')}</label>
            <select
              value={settings.tabSize}
              onChange={(e) => updateSetting('tabSize', parseInt(e.target.value))}
            >
              <option value="2">2 {t('spaces')}</option>
              <option value="4">4 {t('spaces')}</option>
            </select>
          </div>

          <div className="setting-item toggle">
            <label>{t('wordWrap')}</label>
            <button
              className={`toggle-btn ${settings.wordWrap ? 'active' : ''}`}
              onClick={() => updateSetting('wordWrap', !settings.wordWrap)}
            >
              {settings.wordWrap ? t('on') : t('off')}
            </button>
          </div>

          <div className="setting-item toggle">
            <label>{t('lineNumbers')}</label>
            <button
              className={`toggle-btn ${settings.showLineNumbers ? 'active' : ''}`}
              onClick={() => updateSetting('showLineNumbers', !settings.showLineNumbers)}
            >
              {settings.showLineNumbers ? t('on') : t('off')}
            </button>
          </div>

          <div className="setting-item toggle">
            <label>{t('autoSave')}</label>
            <button
              className={`toggle-btn ${settings.autoSave ? 'active' : ''}`}
              onClick={() => updateSetting('autoSave', !settings.autoSave)}
            >
              {settings.autoSave ? t('on') : t('off')}
            </button>
          </div>
        </section>

        <section className="settings-section">
          <h3>{t('about')}</h3>
          <div className="about-info">
            <div className="about-logo">μ</div>
            <div className="about-text">
              <h4>μ code</h4>
              <p>{t('muCodeAi')}</p>
              <p className="version">{t('version')}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
