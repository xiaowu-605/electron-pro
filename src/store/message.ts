import { ref } from 'vue'
import { defineStore } from 'pinia'
import { db } from '@/db'
import {
  ChatErrorData,
  MessageProps,
  MessageStatus,
  UpdatgedStreamData,
} from '@/types'

export const useMessageStore = defineStore('message', () => {
  let items = ref<MessageProps[]>([])

  const fetchMessageByConversation = async (conversationId: number) => {
    const conversations = await db.messages.where({ conversationId }).toArray()
    items.value = conversations
  }

  const createMessage = async (createdData: Omit<MessageProps, 'id'>) => {
    const newMessageId = await db.messages.add(createdData)
    items.value.push({ id: newMessageId, ...createdData })
    return newMessageId
  }
  const getLastQuestion = (conversationId: number) => {
    return items.value.findLast(
      (item) =>
        item.conversationId === conversationId && item.type === 'question',
    )
  }

  const updateMessage = async (streamData: UpdatgedStreamData) => {
    const { messageId, data } = streamData
    const currentMessage = items.value.find((item) => item.id === messageId)
    if (currentMessage) {
      const updatedData = {
        status: data.isEnd ? 'finished' : ('streaming' as MessageStatus),
        updatedAt: new Date().toISOString(),
        ...(!data.isEnd && { content: currentMessage.content + data.content }),
      }
      await db.messages.update(messageId, updatedData)
      const index = items.value.findIndex((item) => item.id === messageId)
      if (index !== -1) {
        items.value[index] = { ...items.value[index], ...updatedData }
      }
    }
  }

  const failMessage = async (errorData: ChatErrorData) => {
    const { messageId, message } = errorData
    const currentMessage = items.value.find((item) => item.id === messageId)
    if (currentMessage) {
      const updatedData = {
        status: 'finished' as MessageStatus,
        content:
          currentMessage.content || `请求失败：${message}`,
        updatedAt: new Date().toISOString(),
      }
      await db.messages.update(messageId, updatedData)
      const index = items.value.findIndex((item) => item.id === messageId)
      if (index !== -1) {
        items.value[index] = { ...items.value[index], ...updatedData }
      }
    }
  }
  return {
    items,
    fetchMessageByConversation,
    createMessage,
    getLastQuestion,
    updateMessage,
    failMessage,
  }
})
