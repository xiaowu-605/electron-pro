<template>
  <div class="conversaation-list">
    <div
      class="item cursor-pointer border-t border-gray-300 bg-white p-2 hover:bg-gray-100"
      v-for="item in items"
      :key="item.id"
    >
      <div @click="toPage(item.id)">
        <div
          class="flex items-center justify-between text-sm leading-8 text-gray-500"
        >
          <span>{{ item.selectModel }}</span>
          <span>{{ item.updateAt }}</span>
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
const router = useRouter()
defineProps<{ items: ConversationProps[] }>()

const toPage = (id: number) => {
  router.push({
    path: '/Conversation',
    query: {
      id: id.toString(),
    },
  })
}
</script>

<style scoped></style>
