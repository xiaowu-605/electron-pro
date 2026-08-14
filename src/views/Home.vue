<template>
  <div class="mx-auto h-full w-[80%]">
    <div class="flex h-[85%] items-center">
      <ProviderSelect
        :items="providerItems"
        v-model="selectedModel"
      />
    </div>
    <div class="flex h-[15%] items-center">
      <MessageInput v-model="inputValue" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ProviderProps } from '@/types/index'
import ProviderSelect from '@/components/ProviderSelect.vue'
import MessageInput from '@/components/MessageInput.vue'
import { providers } from '@/data/index'

let selectedModel = ref<string>('')
let inputValue = ref<string>('')
let providerItems: ProviderProps[] = providers
</script>

<style scoped></style>
