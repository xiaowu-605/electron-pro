<template>
  <div class="mx-auto h-full w-[80%]">
    <div class="flex h-[85%] items-center">
      <ProviderSelect
        :items="providers"
        v-model="currentProvider"
      />
    </div>
    <div class="flex h-[15%] items-center">
      <MessageInput
        v-model="inputValue"
        @create="createConversation"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { ProviderProps } from '@/types/index'
import ProviderSelect from '@/components/ProviderSelect.vue'
import MessageInput from '@/components/MessageInput.vue'
// import { providers } from '@/data/index'
import { db } from '@/db'
import { useRouter } from 'vue-router'
import { useConversation } from '@/store/conversation'

const router = useRouter()
const conversationStore = useConversation()

let currentProvider = ref<string>('')
let inputValue = ref<string>('')
let providers = ref<ProviderProps[]>([])

onMounted(async () => {
  providers.value = await db.providers.toArray()
})
const modeInfo = computed(() => {
  const [providerId, selectModel] = currentProvider.value.split('/')
  return {
    providerId: Number(providerId),
    selectModel,
  }
})
const createConversation = async (question: string) => {
  const { providerId, selectModel } = modeInfo.value
  const currentDate = new Date().toISOString()
  const createData = {
    title: question,
    providerId,
    selectModel,
    updatedAt: currentDate,
    createdAt: currentDate,
  }
  const conversationId = await conversationStore.createConversation(createData)
  const messageId = await db.messages.add({
    conversationId,
    content: question,
    createdAt: currentDate,
    updatedAt: currentDate,
    type: 'question',
  })
  router.push({
    path: '/Conversation',
    query: { id: conversationId, init: messageId },
  })
}
</script>

<style scoped></style>
