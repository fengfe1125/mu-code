import { useState, useRef, useEffect } from 'react'
import { Session, APIConfig, Message } from '../types'
import { Language } from '../i18n'
import './Chat.css'

interface Props {
  session: Session
  apiConfig?: APIConfig
  onUpdateMessages: (messages: Message[]) => void
  t: (key: any) => string
  language: Language
}

export default function Chat({ session, apiConfig, onUpdateMessages, t, language }: Props) {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [session.messages])

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 200) + 'px'
    }
  }, [input])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
      status: 'complete'
    }

    const messages = [...session.messages, userMessage]
    onUpdateMessages(messages)
    setInput('')
    setIsLoading(true)

    // Create assistant message placeholder
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      status: 'pending'
    }
    onUpdateMessages([...messages, assistantMessage])

    try {
      // Call API
      const response = await callAPI(messages, apiConfig, language)
      
      // Update with response
      const updatedMessages = messages.map(m => 
        m.id === assistantMessage.id 
          ? { ...m, content: response, status: 'complete' as const }
          : m
      )
      onUpdateMessages(updatedMessages)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      const updatedMessages = messages.map(m => 
        m.id === assistantMessage.id 
          ? { ...m, content: `${t('error')}: ${errorMessage}`, status: 'error' as const }
          : m
      )
      onUpdateMessages(updatedMessages)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="chat">
      <div className="chat-header">
        <div className="chat-title">{session.name}</div>
        <div className="chat-model">
          {apiConfig?.model || t('notSet')}
        </div>
      </div>

      <div className="messages-container">
        {session.messages.length === 0 ? (
          <div className="welcome">
            <div className="welcome-icon">μ</div>
            <h3>{t('howCanIHelp')}</h3>
            <p>{t('askToWrite')}</p>
          </div>
        ) : (
          session.messages.map(message => (
            <MessageBubble key={message.id} message={message} t={t} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <div className="input-wrapper">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('sendMessage')}
            disabled={isLoading}
            rows={1}
          />
          <button 
            className="send-btn" 
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? '...' : '→'}
          </button>
        </div>
        <div className="input-hint">{t('pressEnter')}</div>
      </div>
    </div>
  )
}

// Message Bubble Component
function MessageBubble({ message, t }: { message: Message; t: (key: any) => string }) {
  const isUser = message.role === 'user'
  const isPending = message.status === 'pending'

  return (
    <div className={`message ${message.role} ${message.status || ''}`}>
      <div className="message-avatar">
        {isUser ? '👤' : 'μ'}
      </div>
      <div className="message-content">
        <div className="message-header">
          <span className="message-role">{isUser ? t('you') : t('muCode')}</span>
          <span className="message-time">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>
        <div className="message-text">
          {isPending ? (
            <span className="typing">{t('thinking')}</span>
          ) : (
            <MarkdownContent content={message.content} />
          )}
        </div>
      </div>
    </div>
  )
}

// Markdown Content Renderer
function MarkdownContent({ content }: { content: string }) {
  // Simple markdown rendering
  const lines = content.split('\n')
  const elements: JSX.Element[] = []
  let inCodeBlock = false
  let codeContent = ''
  let codeLanguage = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Code block start/end
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        elements.push(
          <pre key={`code-${i}`} className="code-block">
            <code>{codeContent}</code>
          </pre>
        )
        codeContent = ''
        codeLanguage = ''
        inCodeBlock = false
      } else {
        // Start code block
        inCodeBlock = true
        codeLanguage = line.slice(3).trim()
      }
      continue
    }

    if (inCodeBlock) {
      codeContent += line + '\n'
      continue
    }

    // Headers
    if (line.startsWith('### ')) {
      elements.push(<h4 key={i}>{renderInline(line.slice(4))}</h4>)
    } else if (line.startsWith('## ')) {
      elements.push(<h3 key={i}>{renderInline(line.slice(3))}</h3>)
    } else if (line.startsWith('# ')) {
      elements.push(<h2 key={i}>{renderInline(line.slice(2))}</h2>)
    } else if (line.trim()) {
      elements.push(<p key={i}>{renderInline(line)}</p>)
    }
  }

  return <div className="markdown-content">{elements}</div>
}

function renderInline(text: string): JSX.Element[] {
  const elements: JSX.Element[] = []
  const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      elements.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex, match.index)}</span>)
    }
    
    const matched = match[0]
    if (matched.startsWith('`')) {
      elements.push(<code key={`code-${match.index}`}>{matched.slice(1, -1)}</code>)
    } else if (matched.startsWith('**')) {
      elements.push(<strong key={`bold-${match.index}`}>{matched.slice(2, -2)}</strong>)
    }
    
    lastIndex = match.index + matched.length
  }

  // Add remaining text
  if (lastIndex < text.length) {
    elements.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex)}</span>)
  }

  return elements.length > 0 ? elements : [<span key="empty">{text}</span>]
}

// API Call Function
async function callAPI(messages: Message[], config?: APIConfig, language?: Language): Promise<string> {
  if (!config) {
    return language === 'zh' 
      ? '请先在「API」设置中配置并激活一个 API。'
      : 'Please configure and activate an API in the "API" settings first.'
  }

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const lastMessage = messages[messages.length - 1]?.content || ''
  
  if (language === 'zh') {
    return `好的！我收到了你的请求："${lastMessage.slice(0, 50)}${lastMessage.length > 50 ? '...' : ''}"

我可以帮你：
- 💬 解答编程问题
- 📝 编写代码
- 🐛 调试错误
- 📖 解释概念
- 🔧 重构优化

请详细描述你想要实现的功能或遇到的问题，我会尽力帮助你！`
  } else {
    return `Got your message: "${lastMessage.slice(0, 50)}${lastMessage.length > 50 ? '...' : ''}"

I can help you with:
- 💬 Answering programming questions
- 📝 Writing code
- 🐛 Debugging errors
- 📖 Explaining concepts
- 🔧 Refactoring and optimization

Please describe in detail what you want to achieve or what problem you're facing!`
  }
}
