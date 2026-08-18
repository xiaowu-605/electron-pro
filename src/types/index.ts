export interface ConversationProps {
  id: number
  title: string
  selectModel: string
  createdAt: string
  updatedAt: string
  providerId: number
}

export interface ProviderProps {
  id: number
  name: string
  title?: string
  desc?: string
  avatar?: string
  createdAt: string
  updatedAt: string
  models: string[]
}

export type MessageStatus = 'loading' | 'streaming' | 'finished'
export interface MessageProps {
  id: number
  content: string
  type: 'question' | 'answer'
  conversationId: number
  status?: MessageStatus
  createdAt: string
  updatedAt: string
}

export interface ChatMessageProps {
  role: string
  content: string
}
export interface CreateChatProps {
  messages: ChatMessageProps[]
  providerName: string
  selectedModel: string
  messageId: number
}

export interface NormalizedStreamChunk {
  content: string
  reasoning?: string
  isEnd: boolean
  finishReason?: string
}

export interface UpdatgedStreamData {
  messageId: number
  data: NormalizedStreamChunk
}

export interface ChatErrorData {
  messageId: number
  message: string
}

export type OnUpdateCallback = (data: UpdatgedStreamData) => void
export type OnChatErrorCallback = (data: ChatErrorData) => void

export type AppLanguage = 'zh-CN' | 'en-US'
export type AppFontSize = 'small' | 'medium' | 'large'

export interface AppSettings {
  language: AppLanguage
  fontSize: AppFontSize
}

export type OnSettingsChangedCallback = (settings: AppSettings) => void
