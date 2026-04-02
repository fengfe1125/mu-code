import { useState } from 'react'
import { APIConfig } from '../types'
import './ApiConfigPanel.css'

interface Props {
  configs: APIConfig[]
  activeConfigId: string | null
  onConfigsChange: (configs: APIConfig[]) => void
  onActiveChange: (id: string) => void
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

export default function ApiConfigPanel({ configs, activeConfigId, onConfigsChange, onActiveChange }: Props) {
  const [editingConfig, setEditingConfig] = useState<APIConfig | null>(null)
  const [showForm, setShowForm] = useState(false)

  const createNewConfig = () => {
    const newConfig: APIConfig = {
      id: Date.now().toString(),
      name: 'New API Config',
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
    if (!confirm('Are you sure you want to delete this configuration?')) return
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
    
    // Auto-fill base URL when provider changes
    if (field === 'provider') {
      const provider = PROVIDER_OPTIONS.find(p => p.value === value)
      if (provider && provider.baseUrl) {
        updated.baseUrl = provider.baseUrl
      }
      // Set default model
      const models = MODEL_PRESETS[value as string] || []
      if (models.length > 0) {
        updated.model = models[0]
      }
    }
    
    setEditingConfig(updated)
  }

  return (
    <div className="api-panel panel">
      <div className="panel-header">
        <h2 className="panel-title">API Configuration</h2>
        <button className="add-btn" onClick={createNewConfig}>
          + Add Config
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
                  <span className="config-provider">{config.provider}</span>
                </div>
                <div className="config-status">
                  {activeConfigId === config.id && (
                    <span className="active-badge">Active</span>
                  )}
                </div>
              </div>
              
              <div className="config-details">
                <div className="detail-row">
                  <span className="detail-label">Model:</span>
                  <span className="detail-value">{config.model || 'Not set'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Base URL:</span>
                  <span className="detail-value">{config.baseUrl || 'Not set'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">API Key:</span>
                  <span className="detail-value">
                    {config.apiKey ? '••••••••' + config.apiKey.slice(-4) : 'Not set'}
                  </span>
                </div>
              </div>

              <div className="config-actions">
                {activeConfigId !== config.id && (
                  <button 
                    className="action-btn activate"
                    onClick={() => activateConfig(config.id)}
                  >
                    Activate
                  </button>
                )}
                <button 
                  className="action-btn edit"
                  onClick={() => editConfig(config)}
                >
                  Edit
                </button>
                <button 
                  className="action-btn delete"
                  onClick={() => deleteConfig(config.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {showForm && editingConfig && (
          <div className="config-form-overlay">
            <div className="config-form">
              <div className="form-header">
                <h3>{configs.find(c => c.id === editingConfig.id) ? 'Edit Configuration' : 'New Configuration'}</h3>
                <button className="close-btn" onClick={() => setShowForm(false)}>×</button>
              </div>

              <div className="form-body">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={editingConfig.name}
                    onChange={(e) => updateEditingField('name', e.target.value)}
                    placeholder="e.g., My OpenAI Config"
                  />
                </div>

                <div className="form-group">
                  <label>Provider</label>
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
                  <label>API Key</label>
                  <input
                    type="password"
                    value={editingConfig.apiKey}
                    onChange={(e) => updateEditingField('apiKey', e.target.value)}
                    placeholder="sk-..."
                  />
                </div>

                <div className="form-group">
                  <label>Base URL</label>
                  <input
                    type="text"
                    value={editingConfig.baseUrl}
                    onChange={(e) => updateEditingField('baseUrl', e.target.value)}
                    placeholder="https://api.example.com"
                  />
                </div>

                <div className="form-group">
                  <label>Model</label>
                  {MODEL_PRESETS[editingConfig.provider]?.length > 0 ? (
                    <select
                      value={editingConfig.model}
                      onChange={(e) => updateEditingField('model', e.target.value)}
                    >
                      {MODEL_PRESETS[editingConfig.provider].map(model => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                      <option value="_custom">Custom...</option>
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
                <button className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="save-btn" onClick={saveConfig}>Save Configuration</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
