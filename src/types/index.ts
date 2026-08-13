export interface ConversationProps {
  id: number
  title: string
  selectModel: string
  createAt: string
  updateAt: string
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
