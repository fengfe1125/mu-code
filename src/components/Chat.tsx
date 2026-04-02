import { useState, useRef, useEffect } from 'react'
import { Session, APIConfig, Message, ToolCall } from '../types'
import './Chat.css'

interface Props {
  session: Session
  apiConfig?: APIConfig
  onUpdateMessages: (messages: Message[]) => void
}

export default function Chat({ session, apiConfig, onUpdateMessages }: Props) {
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
      const response = await callAPI(messages, apiConfig)
      
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
          ? { ...m, content: `Error: ${errorMessage}`, status: 'error' as const }
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
          {apiConfig?.model || 'No model selected'}
        </div>
      </div>

      <div className="messages-container">
        {session.messages.length === 0 ? (
          <div className="welcome">
            <div className="welcome-icon">μ</div>
            <h3>How can I help you code today?</h3>
            <p>Ask me to write, debug, or explain code. I can also help with file operations and running commands.</p>
          </div>
        ) : (
          session.messages.map(message => (
            <MessageBubble key={message.id} message={message} />
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
            placeholder="Send a message..."
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
        <div className="input-hint">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  )
}

// Message Bubble Component
function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  const isPending = message.status === 'pending'

  return (
    <div className={`message ${message.role} ${message.status || ''}`}>
      <div className="message-avatar">
        {isUser ? '👤' : 'μ'}
      </div>
      <div className="message-content">
        <div className="message-header">
          <span className="message-role">{isUser ? 'You' : 'μ code'}</span>
          <span className="message-time">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>
        <div className="message-text">
          {isPending ? (
            <span className="typing">Thinking...</span>
          ) : (
            <MarkdownContent content={message.content} />
          )}
        </div>
        {message.toolCalls && message.toolCalls.length > 0 && (
          <div className="tool-calls">
            {message.toolCalls.map(tool => (
              <ToolCallBlock key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Markdown Content Renderer
function MarkdownContent({ content }: { content: string }) {
  // Simple markdown rendering
  const renderContent = content
    .split('\n')
    .map((line, i) => {
      // Code blocks
      if (line.startsWith('```')) {
        return null // Handle separately
      }
      // Headers
      if (line.startsWith('### ')) {
        return <h4 key={i}>{line.slice(4)}</h4>
      }
      if (line.startsWith('## ')) {
        return <h3 key={i}>{line.slice(3)}</h3>
      }
      if (line.startsWith('# ')) {
        return <h2 key={i}>{line.slice(2)}</h2>
      }
      // Bold
      if (line.includes('**')) {
        const parts = line.split(/(\*\*.*?\*\*)/g)
        return (
          <p key={i}>
            {parts.map((part, j) => 
              part.startsWith('**') ? 
                <strong key={j}>{part.slice(2, -2)}</strong> : 
                part
            )}
          </p>
        )
      }
      // Code inline
      if (line.includes('`')) {
        const parts = line.split(/(`[^`]+`)/g)
        return (
          <p key={i}>
            {parts.map((part, j) => 
              part.startsWith('`') ? 
                <code key={j}>{part.slice(1, -1)}</code> : 
                part
            )}
          </p>
        )
      }
      // Regular paragraph
      return line.trim() ? <p key={i}>{line}</p> : null
    })

  return <div className="markdown-content">{renderContent}</div>
}

// Tool Call Block
function ToolCallBlock({ tool }: { tool: ToolCall }) {
  return (
    <div className={`tool-call ${tool.status}`}>
      <div className="tool-header">
        <span className="tool-icon">🔧</span>
        <span className="tool-name">{tool.name}</span>
        <span className="tool-status">{tool.status}</span>
      </div>
      <div className="tool-args">
        <pre>{JSON.stringify(tool.arguments, null, 2)}</pre>
      </div>
      {tool.result && (
        <div className="tool-result">
          <pre>{tool.result}</pre>
        </div>
      )}
    </div>
  )
}

// API Call Function
async function callAPI(messages: Message[], config?: APIConfig): Promise<string> {
  if (!config) {
    throw new Error('No API configuration selected')
  }

  // For demo purposes, return a mock response
  // In production, this would make actual API calls
  if (config.provider === 'qclaw') {
    // Simulate API call to QClaw ModelRoute
    await new Promise(resolve => setTimeout(resolve, 1000))
    return `I'm ready to help you with your coding tasks. Here's what I can do:

- **Write code** in any programming language
- **Debug and fix** existing code
- **Explain** complex concepts
- **Refactor** and optimize code
- **Generate tests** for your functions
- **Work with files** in your workspace

What would you like me to help you with?`
  }

  // For other providers, make actual API calls
  const response = await fetch(`${config.baseUrl}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: config.model,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content
      }))
    })
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}
