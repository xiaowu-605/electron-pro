import type OpenAI from 'openai'
import type { NormalizedStreamChunk } from '@/types'

export type ProviderChunk = OpenAI.Chat.Completions.ChatCompletionChunk

export interface ProviderAdapter {
  name: string
  baseURL: string
  getApiKey: () => string | undefined
  normalizeChunk: (chunk: ProviderChunk) => NormalizedStreamChunk
}
