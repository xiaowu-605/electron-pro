<template>
  <div class="message-list">
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
            {{ message.createdAt }}
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
              {{ message.content }}
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MessageProps } from '@/types'
import ThreeDotsBounceIcon from '@iconify-vue/svg-spinners/3-dots-bounce'

defineProps<{
  messages: MessageProps[]
}>()
</script>

<style scoped></style>
