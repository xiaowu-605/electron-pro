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

export interface CreateChatProps {
  messags: { role: string; content: string }[]
  providerName: string
  selectedModel: string
  messageId: number
}

export interface UpdatgedStreamData {
  messageId: number
  data: {
    is_end: boolean
    result: string
  }
}

export type OnUpdateCallback = (data: UpdatgedStreamData) => void
