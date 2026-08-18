<template>
  <div class="mx-auto h-full w-[80%] overflow-y-auto pt-8 pb-6">
    <div class="mb-8">
      <h2 class="text-xl font-bold text-gray-900">设置</h2>
      <p class="mt-1 text-sm text-gray-500">管理应用的外观与显示偏好</p>
    </div>

    <div
      class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
    >
      <div
        class="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-6 py-4"
      >
        <PaletteIcon height="1.2em" class="text-green-700" />
        <div>
          <h3 class="text-sm font-semibold text-gray-900">外观</h3>
          <p class="mt-0.5 text-xs text-gray-500">自定义应用的显示偏好</p>
        </div>
      </div>

      <div
        class="flex items-center justify-between border-b border-gray-100 px-6 py-5 transition-colors hover:bg-gray-50"
      >
        <div class="flex items-center gap-3">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-700"
          >
            <TranslateIcon height="1.1em" />
          </div>
          <div>
            <div class="text-sm font-medium text-gray-900">语言</div>
            <div class="mt-0.5 text-xs text-gray-500">界面显示语言</div>
          </div>
        </div>
        <SelectRoot v-model="settings.language">
          <SelectTrigger
            class="inline-flex h-9 w-[150px] cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 shadow-sm outline-none transition-colors hover:border-green-600 focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
          >
            <SelectValue />
            <SelectIcon height="1em" class="text-gray-400" />
          </SelectTrigger>
          <SelectPortal>
            <SelectContent
              position="popper"
              :side-offset="6"
              class="z-[100] min-w-[150px] rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
            >
              <SelectViewport>
                <SelectItem
                  v-for="option in languageOptions"
                  :key="option.value"
                  :value="option.value"
                  class="relative flex h-8 cursor-pointer items-center rounded-md px-7 text-sm text-gray-700 outline-none data-[highlighted]:bg-green-700 data-[highlighted]:text-white"
                >
                  <SelectItemIndicator class="absolute left-2.5">
                    <CheckIcon height="1em" />
                  </SelectItemIndicator>
                  <SelectItemText>{{ option.label }}</SelectItemText>
                </SelectItem>
              </SelectViewport>
            </SelectContent>
          </SelectPortal>
        </SelectRoot>
      </div>

      <div
        class="flex items-center justify-between px-6 py-5 transition-colors hover:bg-gray-50"
      >
        <div class="flex items-center gap-3">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-700"
          >
            <TextSizeIcon height="1.1em" />
          </div>
          <div>
            <div class="text-sm font-medium text-gray-900">字体大小</div>
            <div class="mt-0.5 text-xs text-gray-500">聊天内容的文字大小</div>
          </div>
        </div>
        <SelectRoot v-model="settings.fontSize">
          <SelectTrigger
            class="inline-flex h-9 w-[150px] cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 shadow-sm outline-none transition-colors hover:border-green-600 focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
          >
            <SelectValue />
            <SelectIcon height="1em" class="text-gray-400" />
          </SelectTrigger>
          <SelectPortal>
            <SelectContent
              position="popper"
              :side-offset="6"
              class="z-[100] min-w-[150px] rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
            >
              <SelectViewport>
                <SelectItem
                  v-for="option in fontSizeOptions"
                  :key="option.value"
                  :value="option.value"
                  class="relative flex h-8 cursor-pointer items-center rounded-md px-7 text-sm text-gray-700 outline-none data-[highlighted]:bg-green-700 data-[highlighted]:text-white"
                >
                  <SelectItemIndicator class="absolute left-2.5">
                    <CheckIcon height="1em" />
                  </SelectItemIndicator>
                  <SelectItemText>{{ option.label }}</SelectItemText>
                </SelectItem>
              </SelectViewport>
            </SelectContent>
          </SelectPortal>
        </SelectRoot>
      </div>
    </div>

    <div class="mt-5 flex items-center gap-1.5 text-xs text-gray-400">
      <InfoIcon height="1em" />
      设置会自动保存并实时生效，无需手动确认
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import {
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radix-vue'
import SelectIcon from '@iconify-vue/ep/select'
import CheckIcon from '@iconify-vue/ep/check'
import TranslateIcon from '@iconify-vue/reicon/translate'
import TextSizeIcon from '@iconify-vue/teenyicons/text-outline'
import PaletteIcon from '@iconify-vue/ep/brush-filled'
import InfoIcon from '@iconify-vue/ep/info-filled'
import type { AppFontSize, AppLanguage } from '@/types'

const languageOptions: { value: AppLanguage; label: string }[] = [
  { value: 'zh-CN', label: '中文' },
  { value: 'en-US', label: 'English' },
]

const fontSizeOptions: { value: AppFontSize; label: string }[] = [
  { value: 'small', label: '小' },
  { value: 'medium', label: '中' },
  { value: 'large', label: '大' },
]

const settings = reactive<{ language: AppLanguage; fontSize: AppFontSize }>({
  language: 'zh-CN',
  fontSize: 'medium',
})

let initialized = false

onMounted(async () => {
  const saved = await window.electronAPI.getSettings()
  Object.assign(settings, saved)
  initialized = true
})

// 实时保存：任何字段变更即写入文件，无需保存按钮
watch(settings, (value) => {
  if (initialized) {
    window.electronAPI.saveSettings({ ...value })
  }
})
</script>

<style scoped></style>
