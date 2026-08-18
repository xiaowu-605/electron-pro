import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createAppI18n } from './locales'
import './index.css'
import 'highlight.js/styles/github-dark.min.css'

async function bootstrap() {
  // 挂载前先读持久化设置，用保存的语言初始化 i18n
  const settings = await window.electronAPI.getSettings()
  const i18n = createAppI18n(settings.language)

  const app = createApp(App)
  const pinia = createPinia()
  app.use(router).use(pinia).use(i18n).mount('#app')
}

bootstrap()
