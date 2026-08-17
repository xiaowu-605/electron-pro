import { ConversationProps, ProviderProps, MessageProps } from '@/types/index'
export const providers: ProviderProps[] = [
  {
    id: 1,
    name: 'deepseek',
    title: 'DeepSeek',
    desc: '深度求索出品的大模型，性价比高',
    models: ['deepseek-chat', 'deepseek-reasoner'],
    avatar:
      'https://qph.cf2.poecdn.net/main-thumb-pb-3004-50-jougqzjtwfqfyqprxbdwofvnwattmtrg.jpg',
    createdAt: '2026-07-03',
    updatedAt: '2026-07-03',
  },
  {
    id: 2,
    name: 'dashscope',
    title: '阿里灵积',
    desc: '通义千问',
    // https://help.aliyun.com/zh/dashscope/developer-reference/api-details?spm=a2c4g.11186623.0.
    models: ['qwen-turbo', 'qwen-plus', 'qwen-max'],
    avatar:
      'https://qph.cf2.poecdn.net/main-thumb-pb-3004-50-jougqzjtwfqfyqprxbdwofvnwattmtrg.jpg',
    createdAt: '2026-07-03',
    updatedAt: '2026-07-03',
  },
]

export const messagesList: MessageProps[] = [
  {
    id: 1,
    content: '什么是光合作用',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'question',
    status: 'finished',
    conversationId: 1,
  },
  {
    id: 2,
    content: '你的说法很正确，理解的很不错，你的说法很正确，理解的很不错！',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'answer',
    status: 'finished',
    conversationId: 1,
  },
  {
    id: 3,
    content: '请告诉我更多！',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'question',
    status: 'loading',
    conversationId: 2,
  },
  {
    id: 4,
    content: '你的说法很正确，理解的很不错，你的说法很正确，理解的很不错！',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'answer',
    status: 'finished',
    conversationId: 2,
  },
  {
    id: 5,
    content: '还有更多的信息吗！',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'question',
    status: 'streaming',
    conversationId: 3,
  },
  {
    id: 6,
    content: '',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'answer',
    status: 'loading',
    conversationId: 3,
  },
]

export const conversationsList: ConversationProps[] = [
  {
    id: 1,
    selectModel: 'gpt-3.5-turbo',
    updatedAt: '2023-06-01 12:00:00',
    title: '什么是光合作用',
    createdAt: '2023-06-01 12:00:00',
    providerId: 1,
  },
  {
    id: 2,
    selectModel: 'gpt-4',
    updatedAt: '2023-06-02 14:30:00',
    title: 'Conversation 2',
    createdAt: '2023-06-01 12:00:00',
    providerId: 1,
  },
]
