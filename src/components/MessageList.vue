<template>
  <div
    class="message-list"
    ref="_messageListRef"
  >
    <div
      class="message-item mb-3"
      v-for="message in messages"
      :key="message.id"
    >
      <div
        class="flex"
        :class="{ 'justify-end': message.type === 'question' }"
      >
        <div>
          <div
            class="mb-2 text-sm text-gray-500"
            :class="{ 'text-right': message.type === 'question' }"
          >
            {{ dayjs(message.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
          <div
            class="message-question rounded-md bg-green-700 p-2 text-white"
            v-if="message.type === 'question'"
          >
            {{ message.content }}
          </div>
          <div
            class="message-question rounded-md bg-gray-200 p-2 text-gray-700"
            v-else
          >
            <template v-if="message.status === 'loading'">
              <ThreeDotsBounceIcon height="1em" />
            </template>
            <template v-else>
              <div
                class="prose prose-pre:p-0 prose-slate prose-headings:my-2 prose-li:my-0 prose-ul:my-1 prose-p:my-1"
              >
                <VueMarkdown
                  :source="message.content"
                  :plugins="plugins"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MessageProps } from '@/types'
import ThreeDotsBounceIcon from '@iconify-vue/svg-spinners/3-dots-bounce'
import dayjs from 'dayjs'
import VueMarkdown from 'vue-markdown-render'
import markdownItHighlightjs from 'markdown-it-highlightjs'

const plugins = [markdownItHighlightjs]
const _messageListRef = ref<HTMLDivElement>()
defineProps<{
  messages: MessageProps[]
}>()

defineExpose({
  _messageListRef,
})
</script>

<style scoped></style>
