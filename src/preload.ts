// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'
import {
  AppSettings,
  CreateChatProps,
  OnChatErrorCallback,
  OnSettingsChangedCallback,
  OnUpdateCallback,
} from '@/types'

contextBridge.exposeInMainWorld('electronAPI', {
  // 发送给主进程的消息
  startChat: (props: CreateChatProps) => ipcRenderer.send('start-chat', props),
  onUpdateMessage: (callback: OnUpdateCallback) =>
    ipcRenderer.on('update-message', (_event, data) => callback(data)),
  onChatError: (callback: OnChatErrorCallback) =>
    ipcRenderer.on('chat-error', (_event, data) => callback(data)),
  offChatListeners: () => {
    ipcRenderer.removeAllListeners('update-message')
    ipcRenderer.removeAllListeners('chat-error')
  },
  getSettings: () => ipcRenderer.invoke('get-settings'),
  saveSettings: (settings: AppSettings) =>
    ipcRenderer.invoke('save-settings', settings),
  onSettingsChanged: (callback: OnSettingsChangedCallback) =>
    ipcRenderer.on('settings-changed', (_event, data) => callback(data)),
})
