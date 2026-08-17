<template>
  <div class="flex w-full items-center">
    <div class="h-[60px] flex-1">
      <input
        v-model="inputValue"
        type="text"
        placeholder="请输入内容"
        class="h-full w-full rounded-[4px] border border-gray-300 px-2 text-sm focus:border-green-700 focus:ring-1 focus:outline-none"
      />
    </div>
    <div
      @click="create"
      class="flex h-[60px] w-[120px] cursor-pointer items-center justify-center rounded-[4px] border border-green-700 bg-green-700 text-white"
    >
      发送
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputValue = defineModel<string>()
const emit = defineEmits<{
  (e: 'create', question: string): void
}>()
const create = () => {
  if (inputValue.value?.trim()) {
    emit('create', inputValue.value.trim())
    inputValue.value = ''
  }
}
</script>

<style scoped></style>
