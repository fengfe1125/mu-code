import http from 'http'
import { URL } from 'url'

const PORT = 3001

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

const server = http.createServer(async (req, res) => {
  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value)
  })

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  const url = new URL(req.url || '/', `http://localhost:${PORT}`)
  
  // Health check
  if (url.pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok' }))
    return
  }

  // Proxy chat completions
  if (url.pathname === '/api/chat' && req.method === 'POST') {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', async () => {
      try {
        const { messages, config } = JSON.parse(body)
        
        if (!config) {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'No config provided' }))
          return
        }

        // Make request to actual API
        const apiUrl = `${config.baseUrl}/v1/chat/completions`
        const apiRes = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.apiKey}`
          },
          body: JSON.stringify({
            model: config.model,
            messages: messages.map((m: any) => ({
              role: m.role,
              content: m.content
            })),
            stream: false
          })
        })

        if (!apiRes.ok) {
          const error = await apiRes.text()
          res.writeHead(apiRes.status, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error }))
          return
        }

        const data = await apiRes.json()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(data))
      } catch (error) {
        console.error('Proxy error:', error)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Proxy error' }))
      }
    })
    return
  }

  // Stream chat completions
  if (url.pathname === '/api/chat/stream' && req.method === 'POST') {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', async () => {
      try {
        const { messages, config } = JSON.parse(body)
        
        if (!config) {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'No config provided' }))
          return
        }

        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        })

        const apiUrl = `${config.baseUrl}/v1/chat/completions`
        const apiRes = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.apiKey}`
          },
          body: JSON.stringify({
            model: config.model,
            messages: messages.map((m: any) => ({
              role: m.role,
              content: m.content
            })),
            stream: true
          })
        })

        const reader = apiRes.body?.getReader()
        if (reader) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            res.write(value)
          }
        }
        res.end()
      } catch (error) {
        console.error('Stream proxy error:', error)
        res.end()
      }
    })
    return
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'Not found' }))
})

server.listen(PORT, () => {
  console.log(`μ code API proxy running on http://localhost:${PORT}`)
})
