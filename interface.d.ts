import {
  CreateChatProps,
  OnChatErrorCallback,
  OnUpdateCallback,
} from './types'
export interface IElectronAPI {
  startChat: (props: CreateChatProps) => void
  onUpdateMessage: (callback: OnUpdateCallback) => any
  onChatError: (callback: OnChatErrorCallback) => any
  offChatListeners: () => void
}
declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
