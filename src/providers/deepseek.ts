import type { ProviderAdapter, ProviderChunk } from './types'

type DeepSeekDelta = ProviderChunk['choices'][number]['delta'] & {
  reasoning_content?: string
}

export const deepseekAdapter: ProviderAdapter = {
  name: 'deepseek',
  baseURL: 'https://api.deepseek.com/v1',
  getApiKey: () => process.env.DEEPSEEK_API_KEY,
  normalizeChunk(chunk) {
    const choice = chunk.choices[0]
    const delta = choice?.delta as DeepSeekDelta | undefined
    return {
      content: delta?.content ?? '',
      reasoning: delta?.reasoning_content,
      isEnd: !!choice?.finish_reason,
      finishReason: choice?.finish_reason ?? undefined,
    }
  },
}
