<template>
  <div class="flex h-screen items-center justify-between">
    <div class="h-full w-[300px] border-r border-gray-300 bg-gray-300">
      <div class="h-[95%] overflow-y-auto">
        <ConversationList :items="items" />
      </div>
      <div class="grid h-[5%] grid-cols-2 gap-2">
        <button
          class="inline-flex h-[32px] h-[100%] cursor-pointer items-center justify-center rounded-[4px] border border-green-700 bg-green-700 px-[15px] py-[8px] text-sm text-white shadow-sm hover:bg-green-700/90"
        >
          <ChatLineIcon
            height="1.2em"
            class="mt-0.5 mr-2"
          />
          新建聊天
        </button>
        <button
          class="hover inline-flex h-[32px] h-[100%] cursor-pointer items-center justify-center rounded-[4px] border border-green-700 bg-green-50 px-[15px] py-[8px] text-sm text-green-700 shadow-sm hover:bg-white/90 hover:text-green-700/80"
        >
          <SettingOutlinedIcon
            height="1.2em"
            class="mt-0.5 mr-2"
          />
          应用设置
        </button>
      </div>
    </div>
    <div class="flex h-full flex-1 items-center">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ConversationProps } from '@/types/index'
import ConversationList from '@/components/ConversationList.vue'
import ChatLineIcon from '@iconify-vue/reicon/chat-line'
import SettingOutlinedIcon from '@iconify-vue/weui/setting-outlined'
import { ProviderProps } from '@/types/index'
import providers from '@/data/providers.json'

let items = ref<ConversationProps[]>([
  {
    id: 1,
    selectModel: 'gpt-3.5-turbo',
    updateAt: '2023-06-01 12:00:00',
    title: '为什么么么么么么么么么么么么么么么么么么么么么么么么么么么么么么么',
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
  {
    id: 3,
    selectModel: 'gpt-4',
    updateAt: '2023-06-02 14:30:00',
    title: 'Conversation 2',
    createAt: '2023-06-01 12:00:00',
    providerId: 1,
  },
  {
    id: 4,
    selectModel: 'gpt-4',
    updateAt: '2023-06-02 14:30:00',
    title: 'Conversation 2',
    createAt: '2023-06-01 12:00:00',
    providerId: 1,
  },
  {
    id: 5,
    selectModel: 'gpt-4',
    updateAt: '2023-06-02 14:30:00',
    title: 'Conversation 2',
    createAt: '2023-06-01 12:00:00',
    providerId: 1,
  },
  {
    id: 6,
    selectModel: 'gpt-4',
    updateAt: '2023-06-02 14:30:00',
    title: 'Conversation 2',
    createAt: '2023-06-01 12:00:00',
    providerId: 1,
  },
  {
    id: 7,
    selectModel: 'gpt-4',
    updateAt: '2023-06-02 14:30:00',
    title: 'Conversation 2',
    createAt: '2023-06-01 12:00:00',
    providerId: 1,
  },
])
</script>

<style scoped></style>
