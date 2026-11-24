import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

function imageGenerationProxy(apiKey) {
  return {
    name: 'manga-mart-image-generation-proxy',
    configureServer(server) {
      server.middlewares.use('/api/generate-image', async (request, response, next) => {
        if (request.method !== 'POST') {
          next()
          return
        }

        if (!apiKey) {
          response.statusCode = 500
          response.setHeader('Content-Type', 'application/json')
          response.end(JSON.stringify({ error: 'CODEX_API_KEY is not configured.' }))
          return
        }

        try {
          const chunks = []
          for await (const chunk of request) chunks.push(chunk)
          const body = Buffer.concat(chunks)
          const upstream = await fetch('http://127.0.0.1:8317/v1/images/edits', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': request.headers['content-type'] || 'application/octet-stream',
            },
            body,
          })

          response.statusCode = upstream.status
          response.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json')
          response.end(Buffer.from(await upstream.arrayBuffer()))
        } catch (error) {
          response.statusCode = 502
          response.setHeader('Content-Type', 'application/json')
          response.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Image proxy request failed.' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss(), imageGenerationProxy(env.CODEX_API_KEY)],
  }
})
