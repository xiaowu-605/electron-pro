import type { ProviderAdapter } from './types'
import { deepseekAdapter } from './deepseek'
import { qianfanAdapter } from './qianfan'

const adapters: Record<string, ProviderAdapter> = {
  deepseek: deepseekAdapter,
  qianfan: qianfanAdapter,
}

export function getProviderAdapter(name: string): ProviderAdapter | undefined {
  return adapters[name]
}

export type { ProviderAdapter, ProviderChunk } from './types'
export { deepseekAdapter, qianfanAdapter }
