import type { ProviderAdapter } from './types'

export const qianfanAdapter: ProviderAdapter = {
  name: 'qianfan',
  baseURL: 'https://qianfan.baidubce.com/v2',
  getApiKey: () => process.env.OPENAI_API_KEY,
  normalizeChunk(chunk) {
    const choice = chunk.choices[0]
    return {
      content: choice?.delta?.content ?? '',
      isEnd: !!choice?.finish_reason,
      finishReason: choice?.finish_reason ?? undefined,
    }
  },
}
