import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN'
import enUS from './en-US'
import type { AppLanguage } from '@/types'

export function createAppI18n(language: AppLanguage) {
  return createI18n({
    legacy: false,
    locale: language,
    fallbackLocale: 'zh-CN',
    messages: {
      'zh-CN': zhCN,
      'en-US': enUS,
    },
  })
}

export type I18nInstance = ReturnType<typeof createAppI18n>
