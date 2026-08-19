import { ipcMain } from 'electron'
import OpenAI from 'openai'
import { getProviderAdapter } from './providers'
import type { CreateChatProps } from './types'

export function registerChatHandlers() {
  ipcMain.on('start-chat', async (event, props: CreateChatProps) => {
    const { messages, providerName, selectedModel, messageId } = props
    try {
      const adapter = getProviderAdapter(providerName)
      if (!adapter) {
        throw new Error(`Unsupported provider: ${providerName}`)
      }
      const client = new OpenAI({
        baseURL: adapter.baseURL,
        apiKey: adapter.getApiKey(),
      })
      const stream = await client.chat.completions.create({
        model: selectedModel,
        messages,
        stream: true,
      })
      for await (const chunk of stream) {
        const data = adapter.normalizeChunk(chunk)
        event.sender.send('update-message', { messageId, data })
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      event.sender.send('chat-error', { messageId, message })
    }
  })
}
