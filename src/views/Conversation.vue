<template>
  <div
    v-if="conversation"
    class="flex h-[5%] items-center justify-between border-b border-gray-300 bg-gray-200 px-3"
  >
    <h3 class="font-semibold text-gray-900">{{ conversation.title }}</h3>
    <span class="text-sm text-gray-500">{{ conversation.updateAt }}</span>
  </div>
  <div class="mx-auto h-[80%] w-[80%] overflow-y-auto pt-2">
    <MessageList :messages="filteredMessages" />
  </div>
  <div class="mx-auto flex h-[15%] w-[80%] items-center">
    <MessageInput v-model="inputValue" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import MessageInput from '@/components/MessageInput.vue'
import MessageList from '@/components/MessageList.vue'
import { MessageProps, ConversationProps } from '@/types'
import { messagesList, conversationsList } from '@/data/index'
import { useRoute } from 'vue-router'
const route = useRoute()

const messages = messagesList
const filteredMessages = ref<MessageProps[]>([])
let inputValue = ref<string>('')
let conversationId = ref<number | null>(null)
// 顶部title信息
const conversation = ref<ConversationProps>()

watch(
  () => route.query.id,
  (id) => {
    conversationId.value = Number(id)
    if (conversationId.value === null) {
      return []
    }
    filteredMessages.value = messages.filter(
      (message) => message.conversationId === conversationId.value,
    )
    conversation.value = conversationsList.find(
      (conv) => conv.id === conversationId.value,
    )
  },
  { immediate: true },
)
</script>
