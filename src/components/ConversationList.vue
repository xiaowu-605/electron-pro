<template>
  <div class="conversaation-list">
    <div
      class="item cursor-pointer border-t border-gray-300 p-2"
      :class="{
        'bg-gray-200 hover:bg-gray-300':
          conversationStore.selectedId === item.id,
        'bg-white hover:bg-gray-200': conversationStore.selectedId !== item.id,
      }"
      v-for="item in items"
      :key="item.id"
    >
      <div @click="toPage(item.id)">
        <div
          class="flex items-center justify-between text-sm leading-8 text-gray-500"
        >
          <span>{{ item.selectModel }}</span>
          <span>{{ dayjs(item.updatedAt).format('YYYY-MM-DD') }}</span>
        </div>
        <h2 class="truncate leading-8 font-semibold">
          {{ item.title }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ConversationProps } from '@/types/index'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { useConversation } from '@/store/conversation'

const router = useRouter()
const conversationStore = useConversation()
defineProps<{ items: ConversationProps[] }>()

const toPage = (id: number) => {
  router.push({
    path: '/Conversation',
    query: {
      id: id.toString(),
    },
  })
  conversationStore.selectedId = id
}
</script>

<style scoped></style>
