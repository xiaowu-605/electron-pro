<template>
  <div class="flex h-screen items-center justify-between">
    <div class="h-full w-[300px] border-r border-gray-300 bg-gray-300">
      <div class="h-[95%] overflow-y-auto">
        <ConversationList :items="items" />
      </div>
      <div class="grid h-[5%] grid-cols-2 gap-2">
        <button
          @click="toPage('/')"
          class="inline-flex h-[32px] h-[100%] cursor-pointer items-center justify-center rounded-[4px] border border-green-700 bg-green-700 px-[15px] py-[8px] text-sm text-white shadow-sm hover:bg-green-700/90"
        >
          <ChatLineIcon
            height="1.2em"
            class="mt-0.5 mr-2"
          />
          新建聊天
        </button>
        <button
          @click="toPage('/Setting')"
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
    <div class="h-full flex-1">
      <Button
        color="purple"
        size="large"
        plain
        loading
        >hello wwww</Button
      >
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ConversationProps } from '@/types/index'
import ConversationList from '@/components/ConversationList.vue'
import Button from '@/components/Button.vue'
import ChatLineIcon from '@iconify-vue/reicon/chat-line'
import SettingOutlinedIcon from '@iconify-vue/weui/setting-outlined'
import { conversationsList } from '@/data/index'
import { useRouter } from 'vue-router'

const router = useRouter()

let items = ref<ConversationProps[]>(conversationsList)

function toPage(path: string) {
  router.push({ path })
}
</script>

<style scoped></style>
