import { CreateChatProps, OnUpdateCallback } from './types'
export interface IElectronAPI {
  startChat: (props: CreateChatProps) => void
  onUpdateMessage: (callback: OnUpdateCallback) => any
}
declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
