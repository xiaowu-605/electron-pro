<template>
  <div class="provider-select">
    <SelectRoot>
      <SelectTrigger
        class="flex w-full cursor-pointer items-center justify-between rounded-md border px-3 py-1.5 shadow-sm outline-none data-[placeholder]:text-gray-400"
      >
        <SelectValue placeholder="Select a model..." />
        <DownOutlineIcon height="1em" />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent class="z-[100] rounded-md border bg-white shadow-md">
          <SelectViewport class="p-2">
            <div v-for="provider in items">
              <SelectLabel class="flex h-7 items-center px-6 text-gray-500">
                <!-- <img
                  :src="provider.avatar"
                  :alt="provider.name"
                /> -->
                {{ provider.name }}
              </SelectLabel>
              <SelectGroup>
                <SelectItem
                  v-for="(model, index) in provider.models"
                  :key="index"
                  :value="model"
                  class="relative flex h-7 cursor-pointer items-center rounded px-6 text-green-700 outline-none data-[highlighted]:bg-green-700 data-[highlighted]:text-white"
                >
                  <SelectItemIndicator class="absolute top-2 left-2 w-6">
                    <SelectIcon height="1em" />
                  </SelectItemIndicator>
                  <SelectItemText>{{ model }}</SelectItemText>
                </SelectItem>
              </SelectGroup>
              <SelectSeparator class="my-2 h-[1px] bg-gray-300" />
            </div>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </div>
</template>

<script setup lang="ts">
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radix-vue'
import DownOutlineIcon from '@iconify-vue/teenyicons/down-outline'
import SelectIcon from '@iconify-vue/ep/select'

import { ProviderProps } from '@/types/index'
defineProps<{ items: ProviderProps[] }>()
</script>

<style scoped></style>
