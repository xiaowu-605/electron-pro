import { app, BrowserWindow, ipcMain } from 'electron'
import fs from 'fs/promises'
import path from 'node:path'
import type { AppSettings } from './types'

const DEFAULT_SETTINGS: AppSettings = {
  language: 'zh-CN',
  fontSize: 'medium',
}

let settings: AppSettings = { ...DEFAULT_SETTINGS }

const settingsFilePath = () =>
  path.join(app.getPath('userData'), 'settings.json')

export async function loadSettings(): Promise<AppSettings> {
  try {
    const raw = await fs.readFile(settingsFilePath(), 'utf-8')
    const parsed = JSON.parse(raw) as Partial<AppSettings>
    settings = { ...DEFAULT_SETTINGS, ...parsed }
  } catch {
    // 文件不存在或损坏时回退默认值
    settings = { ...DEFAULT_SETTINGS }
  }
  return settings
}

export async function saveSettings(
  next: AppSettings,
): Promise<AppSettings> {
  settings = { ...DEFAULT_SETTINGS, ...next }
  const file = settingsFilePath()
  const tmp = `${file}.tmp`
  // 先写临时文件再 rename，避免写入中途崩溃导致文件损坏
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(tmp, JSON.stringify(settings, null, 2), 'utf-8')
  await fs.rename(tmp, file)
  return settings
}

export function registerSettingsHandlers() {
  ipcMain.handle('get-settings', () => settings)
  ipcMain.handle('save-settings', async (_event, next: AppSettings) => {
    const saved = await saveSettings(next)
    for (const win of BrowserWindow.getAllWindows()) {
      win.webContents.send('settings-changed', saved)
    }
    return saved
  })
}
