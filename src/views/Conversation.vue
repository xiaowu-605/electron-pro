<template>
  <div
    v-if="conversation"
    class="flex h-[5%] items-center justify-between border-b border-gray-300 bg-gray-200 px-3"
  >
    <h3 class="font-semibold text-gray-900">{{ conversation.title }}</h3>
    <span class="text-sm text-gray-500">{{ conversation.updatedAt }}</span>
  </div>
  <div class="mx-auto h-[80%] w-[80%] overflow-y-auto pt-2">
    <MessageList
      :messages="filteredMessages"
      ref="messageListRef"
    />
  </div>
  <div class="mx-auto flex h-[15%] w-[80%] items-center">
    <MessageInput
      v-model="inputValue"
      @create="messageInputChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, computed, nextTick } from 'vue'
import MessageInput from '@/components/MessageInput.vue'
import MessageList from '@/components/MessageList.vue'
import {
  MessageProps,
  ConversationProps,
  UpdatgedStreamData,
  MessageStatus,
} from '@/types'
// import { messagesList, conversationsList } from '@/data/index'
import { db } from '@/db'
import { useRoute } from 'vue-router'
import { useConversation } from '@/store/conversation'
import { useMessageStore } from '@/store/message'

const route = useRoute()
const conversationStore = useConversation()
const messageStore = useMessageStore()

// const messages = messagesList
const filteredMessages = computed(() => messageStore.items)

const sendedMessages = computed(() =>
  filteredMessages.value
    .filter((message) => message.status !== 'loading')
    .map((message) => {
      return {
        role: message.type === 'question' ? 'user' : 'assistant',
        content: message.content,
      }
    }),
)

let inputValue = ref<string>('')
let conversationId = ref<number | null>(
  route.query.id ? Number(route.query.id) : null,
)

const initMessageId = parseInt(route.query.init as string)
let lastQuestion = computed(() =>
  messageStore.getLastQuestion(conversationId.value as number),
)
const creatingInitialMessage = async () => {
  const createdData: Omit<MessageProps, 'id'> = {
    content: '',
    conversationId: conversationId.value as number,
    type: 'answer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'loading',
  }
  const newMessageId = await messageStore.createMessage(createdData)
  await scrollToEnd()
  if (conversation.value) {
    const provider = await db.providers
      .where({
        id: conversation.value.providerId,
      })
      .first()
    // 发送给主进程的消息
    if (provider) {
      window.electronAPI.startChat({
        messages: sendedMessages.value,
        providerName: provider.name,
        selectedModel: conversation.value.selectModel,
        messageId: newMessageId,
      })
    }
  }
}

// 顶部title信息
const conversation = computed(() => {
  return conversationStore.getConversationById(conversationId.value as number)
})

const initData = async () => {
  await messageStore.fetchMessageByConversation(conversationId.value as number)
}

watch(
  () => route.query.id,
  async (id) => {
    conversationId.value = Number(id)
    if (conversationId.value === null) {
      return []
    }
    await scrollToEnd()
    initData()
  },
  { immediate: true },
)
onMounted(async () => {
  await initData()
  await scrollToEnd()
  if (initMessageId) {
    await creatingInitialMessage()
  }
  window.electronAPI.onUpdateMessage(async (steamData: UpdatgedStreamData) => {
    messageStore.updateMessage(steamData)
    await scrollToEnd()
  })
})

async function messageInputChange(question: string) {
  if (question) {
    const date = new Date().toISOString()
    await messageStore.createMessage({
      content: question,
      conversationId: conversationId.value as number,
      createdAt: date,
      updatedAt: date,
      type: 'question',
    })
    creatingInitialMessage()
  }
}
const messageListRef = ref()
async function scrollToEnd() {
  await nextTick()
  if (messageListRef.value) {
    messageListRef.value._messageListRef.scrollIntoView({
      block: 'end',
      behavior: 'instant',
    })
  }
}
</script>
