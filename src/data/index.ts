import { ConversationProps, ProviderProps, MessageProps } from '@/types/index'
export const providers: ProviderProps[] = [
  {
    id: 1,
    name: 'OpenAI',
    title: 'OpenAI',
    desc: 'OpenAI is an AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity.',
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/OpenAI_Logo.svg/2560px-OpenAI_Logo.svg.png',
    createdAt: '2015-12-11 00:00:00',
    updatedAt: '2026-08-01 00:00:00',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4.1', 'o3'],
  },
  {
    id: 2,
    name: 'Anthropic',
    title: 'Anthropic',
    desc: 'Anthropic is an AI safety company based in San Francisco, focused on building reliable, interpretable, and steerable AI systems.',
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Anthropic_logo.svg/2560px-Anthropic_logo.svg.png',
    createdAt: '2021-01-01 00:00:00',
    updatedAt: '2026-08-01 00:00:00',
    models: ['claude-opus-4-7', 'claude-sonnet-4-6', 'claude-haiku-4-5'],
  },
  {
    id: 3,
    name: 'Google DeepMind',
    title: 'Google DeepMind',
    desc: 'Google DeepMind is an AI research lab building next-generation AI systems, including the Gemini family of multimodal models.',
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Google_DeepMind_logo.svg/2560px-Google_DeepMind_logo.svg.png',
    createdAt: '2010-09-01 00:00:00',
    updatedAt: '2026-08-01 00:00:00',
    models: ['gemini-2.5-pro', 'gemini-2.5-flash', 'gemini-3-pro'],
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
    updateAt: '2023-06-01 12:00:00',
    title: '什么是光合作用',
    createAt: '2023-06-01 12:00:00',
    providerId: 1,
  },
  {
    id: 2,
    selectModel: 'gpt-4',
    updateAt: '2023-06-02 14:30:00',
    title: 'Conversation 2',
    createAt: '2023-06-01 12:00:00',
    providerId: 1,
  },
]
