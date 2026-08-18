import {
  AppSettings,
  CreateChatProps,
  OnChatErrorCallback,
  OnSettingsChangedCallback,
  OnUpdateCallback,
} from './types'
export interface IElectronAPI {
  startChat: (props: CreateChatProps) => void
  onUpdateMessage: (callback: OnUpdateCallback) => any
  onChatError: (callback: OnChatErrorCallback) => any
  offChatListeners: () => void
  getSettings: () => Promise<AppSettings>
  saveSettings: (settings: AppSettings) => Promise<AppSettings>
  onSettingsChanged: (callback: OnSettingsChangedCallback) => any
}
declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
