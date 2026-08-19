import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import fs from 'fs/promises'
import started from 'electron-squirrel-startup'
import OpenAI from 'openai'
import dotenv from 'dotenv'
import { getProviderAdapter } from './providers'
import { loadSettings, registerSettingsHandlers } from './settings'
dotenv.config()

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit()
}

const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  ipcMain.on('start-chat', async (event, props) => {
    const { messages, providerName, selectedModel, messageId } = props
    try {
      const adapter = getProviderAdapter(providerName)
      if (!adapter) {
        throw new Error(`Unsupported provider: ${providerName}`)
      }
      const client = new OpenAI({
        baseURL: adapter.baseURL,
        apiKey: adapter.getApiKey(),
      })
      const stream = await client.chat.completions.create({
        model: selectedModel,
        messages,
        stream: true,
      })
      for await (const chunk of stream) {
        const data = adapter.normalizeChunk(chunk)
        mainWindow.webContents.send('update-message', { messageId, data })
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      mainWindow.webContents.send('chat-error', { messageId, message })
    }
  })

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    )
  }

  // Open the DevTools. 开发环境才打开
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools()
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  await loadSettings()
  registerSettingsHandlers()
  createWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
