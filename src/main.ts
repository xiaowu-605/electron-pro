import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import fs from 'fs/promises'
import started from 'electron-squirrel-startup'
import OpenAI from 'openai'
import dotenv from 'dotenv'
import { UpdatgedStreamData } from './types'
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
    let baseURL =
      providerName === 'qianfan'
        ? 'https://qianfan.baidubce.com/v2'
        : 'https://api.deepseek.com/v1'

    let apiKey =
      providerName === 'qianfan'
        ? process.env.OPENAI_API_KEY
        : process.env.DEEPSEEK_API_KEY
    const openai = new OpenAI({
      baseURL,
      apiKey,
    })
    const stream = await openai.chat.completions.create({
      model: selectedModel,
      messages,
      stream: true,
    })
    for await (const chunk of stream) {
      const content = {
        messageId,
        data: {
          is_end: chunk.choices[0]?.finish_reason,
          result: chunk.choices[0]?.delta?.content ?? '',
        },
      }
      // 返回给渲染进程
      mainWindow.webContents.send('update-message', content)
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

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

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
