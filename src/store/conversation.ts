import { defineStore } from 'pinia'
import { ConversationProps } from '@/types'
import { ref, computed } from 'vue'
import { db } from '@/db'
export const useConversation = defineStore('conversation', () => {
  let items = ref<ConversationProps[]>([])
  let selectedId = ref<number>(-1)

  const fetchConversations = async () => {
    const conversations = await db.conversations.toArray()
    items.value = conversations
  }

  const createConversation = async (
    createData: Omit<ConversationProps, 'id'>,
  ) => {
    const newCId = await db.conversations.add(createData)
    items.value.push({
      id: newCId,
      ...createData,
    })
    return newCId
  }

  const getConversationById = (id: number) => {
    return items.value.find((item) => item.id === id)
  }
  return {
    items,
    selectedId,
    fetchConversations,
    createConversation,
    getConversationById,
  }
})
