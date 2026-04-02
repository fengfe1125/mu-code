import { useState } from 'react'
import { FileNode } from '../types'
import './FileExplorer.css'

interface Props {
  files: FileNode[]
  onFilesChange: (files: FileNode[]) => void
  t: (key: any) => string
}

export default function FileExplorer({ files, onFilesChange, t }: Props) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set())

  const toggleDir = (path: string) => {
    const newExpanded = new Set(expandedDirs)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpandedDirs(newExpanded)
  }

  const createFile = () => {
    const name = prompt(t('newFile'))
    if (!name) return

    const newFile: FileNode = {
      name,
      path: `/${name}`,
      type: 'file',
      content: '',
      language: getLanguage(name)
    }
    onFilesChange([...files, newFile])
  }

  const createFolder = () => {
    const name = prompt(t('newFolder'))
    if (!name) return

    const newFolder: FileNode = {
      name,
      path: `/${name}`,
      type: 'directory',
      children: []
    }
    onFilesChange([...files, newFolder])
  }

  return (
    <div className="file-explorer panel">
      <div className="panel-header">
        <h2 className="panel-title">{t('fileExplorer')}</h2>
        <div className="file-actions">
          <button className="file-action-btn" onClick={createFile} title={t('newFile')}>
            📄
          </button>
          <button className="file-action-btn" onClick={createFolder} title={t('newFolder')}>
            📁
          </button>
        </div>
      </div>

      <div className="file-tree">
        {files.length === 0 ? (
          <div className="empty-files">
            <div className="empty-icon">📂</div>
            <p>{t('noFiles')}</p>
            <p className="hint">{t('clickToCreate')}</p>
          </div>
        ) : (
          files.map(file => (
            <FileNodeItem
              key={file.path}
              node={file}
              depth={0}
              selectedFile={selectedFile}
              onSelect={setSelectedFile}
              expandedDirs={expandedDirs}
              onToggleDir={toggleDir}
            />
          ))
        )}
      </div>

      {selectedFile && (
        <FileEditor
          files={files}
          selectedPath={selectedFile}
          onFilesChange={onFilesChange}
          onClose={() => setSelectedFile(null)}
          t={t}
        />
      )}
    </div>
  )
}

// File Node Item Component
function FileNodeItem({
  node,
  depth,
  selectedFile,
  onSelect,
  expandedDirs,
  onToggleDir
}: {
  node: FileNode
  depth: number
  selectedFile: string | null
  onSelect: (path: string) => void
  expandedDirs: Set<string>
  onToggleDir: (path: string) => void
}) {
  const isExpanded = expandedDirs.has(node.path)
  const isSelected = selectedFile === node.path

  const handleClick = () => {
    if (node.type === 'directory') {
      onToggleDir(node.path)
    } else {
      onSelect(node.path)
    }
  }

  return (
    <>
      <div
        className={`file-node ${node.type} ${isSelected ? 'selected' : ''}`}
        style={{ paddingLeft: depth * 16 + 12 }}
        onClick={handleClick}
      >
        <span className="file-icon">
          {node.type === 'directory' ? (isExpanded ? '📂' : '📁') : getFileIcon(node.name)}
        </span>
        <span className="file-name">{node.name}</span>
      </div>
      {node.type === 'directory' && isExpanded && node.children?.map(child => (
        <FileNodeItem
          key={child.path}
          node={child}
          depth={depth + 1}
          selectedFile={selectedFile}
          onSelect={onSelect}
          expandedDirs={expandedDirs}
          onToggleDir={onToggleDir}
        />
      ))}
    </>
  )
}

// File Editor Component
function FileEditor({
  files,
  selectedPath,
  onFilesChange,
  onClose,
  t
}: {
  files: FileNode[]
  selectedPath: string
  onFilesChange: (files: FileNode[]) => void
  onClose: () => void
  t: (key: any) => string
}) {
  const file = findFile(files, selectedPath)
  const [content, setContent] = useState(file?.content || '')

  const handleSave = () => {
    const updateContent = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(node => {
        if (node.path === selectedPath) {
          return { ...node, content }
        }
        if (node.children) {
          return { ...node, children: updateContent(node.children) }
        }
        return node
      })
    }
    onFilesChange(updateContent(files))
    onClose()
  }

  if (!file) return null

  return (
    <div className="file-editor">
      <div className="editor-header">
        <span className="editor-filename">{file.name}</span>
        <div className="editor-actions">
          <button className="editor-btn save" onClick={handleSave}>{t('save')}</button>
          <button className="editor-btn close" onClick={onClose}>{t('close')}</button>
        </div>
      </div>
      <textarea
        className="editor-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        spellCheck={false}
      />
    </div>
  )
}

// Helper functions
function findFile(nodes: FileNode[], path: string): FileNode | null {
  for (const node of nodes) {
    if (node.path === path) return node
    if (node.children) {
      const found = findFile(node.children, path)
      if (found) return found
    }
  }
  return null
}

function getFileIcon(name: string): string {
  const ext = name.split('.').pop()?.toLowerCase()
  const icons: Record<string, string> = {
    ts: '🔷', tsx: '⚛️', js: '🟨', jsx: '⚛️',
    py: '🐍', rs: '🦀', go: '🐹', java: '☕',
    cpp: '⚡', c: '⚡', css: '🎨', html: '🌐',
    json: '📋', md: '📝', txt: '📄', yml: '⚙️',
    yaml: '⚙️', sh: '🐚', sql: '🗃️'
  }
  return icons[ext || ''] || '📄'
}

function getLanguage(name: string): string {
  const ext = name.split('.').pop()?.toLowerCase()
  const langs: Record<string, string> = {
    ts: 'typescript', tsx: 'typescript', js: 'javascript', jsx: 'javascript',
    py: 'python', rs: 'rust', go: 'go', java: 'java',
    cpp: 'cpp', c: 'c', css: 'css', html: 'html',
    json: 'json', md: 'markdown', yml: 'yaml', yaml: 'yaml',
    sh: 'bash', sql: 'sql'
  }
  return langs[ext || ''] || 'plaintext'
}
