import { useState } from 'react'
import { APIConfig } from '../types'
import './ApiConfigPanel.css'

interface Props {
  configs: APIConfig[]
  activeConfigId: string | null
  onConfigsChange: (configs: APIConfig[]) => void
  onActiveChange: (id: string) => void
  t: (key: any) => string
}

const PROVIDER_OPTIONS = [
  { value: 'openai', label: 'OpenAI', baseUrl: 'https://api.openai.com' },
  { value: 'anthropic', label: 'Anthropic', baseUrl: 'https://api.anthropic.com' },
  { value: 'qclaw', label: 'QClaw', baseUrl: 'https://aiarea.qclaw.qq.com' },
  { value: 'custom', label: 'Custom', baseUrl: '' }
]

const MODEL_PRESETS: Record<string, string[]> = {
  openai: ['gpt-4o', 'gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo'],
  anthropic: ['claude-sonnet-4-20250514', 'claude-3-5-sonnet-20241022', 'claude-3-haiku-20240307'],
  qclaw: ['qclaw/modelroute', 'qclaw/deepseek-r1', 'qclaw/claude-sonnet-4'],
  custom: []
}

export default function ApiConfigPanel({ configs, activeConfigId, onConfigsChange, onActiveChange, t }: Props) {
  const [editingConfig, setEditingConfig] = useState<APIConfig | null>(null)
  const [showForm, setShowForm] = useState(false)

  const createNewConfig = () => {
    const newConfig: APIConfig = {
      id: Date.now().toString(),
      name: t('newConfig'),
      provider: 'custom',
      apiKey: '',
      baseUrl: '',
      model: '',
      isActive: false
    }
    setEditingConfig(newConfig)
    setShowForm(true)
  }

  const editConfig = (config: APIConfig) => {
    setEditingConfig({ ...config })
    setShowForm(true)
  }

  const saveConfig = () => {
    if (!editingConfig) return

    const existing = configs.find(c => c.id === editingConfig.id)
    if (existing) {
      onConfigsChange(configs.map(c => c.id === editingConfig.id ? editingConfig : c))
    } else {
      onConfigsChange([...configs, editingConfig])
    }
    setShowForm(false)
    setEditingConfig(null)
  }

  const deleteConfig = (id: string) => {
    if (!confirm(t('deleteConfirm'))) return
    onConfigsChange(configs.filter(c => c.id !== id))
    if (activeConfigId === id) {
      onActiveChange(configs.find(c => c.id !== id)?.id || '')
    }
  }

  const activateConfig = (id: string) => {
    onConfigsChange(configs.map(c => ({
      ...c,
      isActive: c.id === id
    })))
    onActiveChange(id)
  }

  const updateEditingField = <K extends keyof APIConfig>(field: K, value: APIConfig[K]) => {
    if (!editingConfig) return
    
    let updated = { ...editingConfig, [field]: value }
    
    if (field === 'provider') {
      const provider = PROVIDER_OPTIONS.find(p => p.value === value)
      if (provider && provider.baseUrl) {
        updated.baseUrl = provider.baseUrl
      }
      const models = MODEL_PRESETS[value as string] || []
      if (models.length > 0) {
        updated.model = models[0]
      }
    }
    
    setEditingConfig(updated)
  }

  const getProviderLabel = (provider: string): string => {
    const option = PROVIDER_OPTIONS.find(p => p.value === provider)
    return option?.label || provider
  }

  return (
    <div className="api-panel panel">
      <div className="panel-header">
        <h2 className="panel-title">{t('apiConfig')}</h2>
        <button className="add-btn" onClick={createNewConfig}>
          + {t('addConfig')}
        </button>
      </div>

      <div className="panel-content">
        <div className="config-list">
          {configs.map(config => (
            <div 
              key={config.id} 
              className={`config-card ${activeConfigId === config.id ? 'active' : ''}`}
            >
              <div className="config-header">
                <div className="config-info">
                  <span className="config-name">{config.name}</span>
                  <span className="config-provider">{getProviderLabel(config.provider)}</span>
                </div>
                <div className="config-status">
                  {activeConfigId === config.id && (
                    <span className="active-badge">{t('active')}</span>
                  )}
                </div>
              </div>
              
              <div className="config-details">
                <div className="detail-row">
                  <span className="detail-label">{t('model')}:</span>
                  <span className="detail-value">{config.model || t('notSet')}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">{t('baseUrl')}:</span>
                  <span className="detail-value">{config.baseUrl || t('notSet')}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">{t('apiKey')}:</span>
                  <span className="detail-value">
                    {config.apiKey ? '••••••••' + config.apiKey.slice(-4) : t('notSet')}
                  </span>
                </div>
              </div>

              <div className="config-actions">
                {activeConfigId !== config.id && (
                  <button 
                    className="action-btn activate"
                    onClick={() => activateConfig(config.id)}
                  >
                    {t('activate')}
                  </button>
                )}
                <button 
                  className="action-btn edit"
                  onClick={() => editConfig(config)}
                >
                  {t('edit')}
                </button>
                <button 
                  className="action-btn delete"
                  onClick={() => deleteConfig(config.id)}
                >
                  {t('delete')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {showForm && editingConfig && (
          <div className="config-form-overlay">
            <div className="config-form">
              <div className="form-header">
                <h3>{configs.find(c => c.id === editingConfig.id) ? t('editConfig') : t('newConfig')}</h3>
                <button className="close-btn" onClick={() => setShowForm(false)}>×</button>
              </div>

              <div className="form-body">
                <div className="form-group">
                  <label>{t('name')}</label>
                  <input
                    type="text"
                    value={editingConfig.name}
                    onChange={(e) => updateEditingField('name', e.target.value)}
                    placeholder="e.g., My OpenAI Config"
                  />
                </div>

                <div className="form-group">
                  <label>{t('provider')}</label>
                  <select
                    value={editingConfig.provider}
                    onChange={(e) => updateEditingField('provider', e.target.value as APIConfig['provider'])}
                  >
                    {PROVIDER_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>{t('apiKey')}</label>
                  <input
                    type="password"
                    value={editingConfig.apiKey}
                    onChange={(e) => updateEditingField('apiKey', e.target.value)}
                    placeholder="sk-..."
                  />
                </div>

                <div className="form-group">
                  <label>{t('baseUrl')}</label>
                  <input
                    type="text"
                    value={editingConfig.baseUrl}
                    onChange={(e) => updateEditingField('baseUrl', e.target.value)}
                    placeholder="https://api.example.com"
                  />
                </div>

                <div className="form-group">
                  <label>{t('model')}</label>
                  {MODEL_PRESETS[editingConfig.provider]?.length > 0 ? (
                    <select
                      value={editingConfig.model}
                      onChange={(e) => updateEditingField('model', e.target.value)}
                    >
                      {MODEL_PRESETS[editingConfig.provider].map(model => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={editingConfig.model}
                      onChange={(e) => updateEditingField('model', e.target.value)}
                      placeholder="model-name"
                    />
                  )}
                </div>
              </div>

              <div className="form-footer">
                <button className="cancel-btn" onClick={() => setShowForm(false)}>{t('cancel')}</button>
                <button className="save-btn" onClick={saveConfig}>{t('saveConfig')}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
