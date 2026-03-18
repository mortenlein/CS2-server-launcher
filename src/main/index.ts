import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { existsSync } from 'fs'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { spawn } from 'child_process'

let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon: join(__dirname, '../../resources/icon.png') } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    if (mainWindow) mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// IPC Handlers
ipcMain.handle('launch-server', async (_, { exePath, gameType, gameMode, map }) => {
  console.log('Launching server...', { exePath, gameType, gameMode, map })
  
  // Firewall rule (requires admin, might fail if not admin)
  spawn('netsh', ['advfirewall', 'firewall', 'add', 'rule', 'name="CS2 Server port"', 'dir=in', 'action=allow', 'protocol=UDP', 'localport=27015'])

  const args = [
    '-dedicated',
    '-usercon',
    `+game_type ${gameType}`,
    `+game_mode ${gameMode}`,
    `+map ${map}`
  ]

  const serverProcess = spawn(exePath, args, {
    detached: true,
    stdio: 'ignore'
  })

  serverProcess.unref()
  return { success: true }
})

ipcMain.handle('select-executable', async () => {
  console.log('IPC: select-executable triggered')
  if (!mainWindow) return null
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{ name: 'Executables', extensions: ['exe'] }]
  })
  console.log('IPC: select-executable result:', result)
  if (result.canceled) return null
  return result.filePaths[0]
})

ipcMain.handle('detect-executable', async () => {
  console.log('IPC: detect-executable triggered')
  const commonPaths = [
    'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Counter-Strike Global Offensive\\game\\bin\\win64\\cs2.exe',
    'C:\\Program Files\\Steam\\steamapps\\common\\Counter-Strike Global Offensive\\game\\bin\\win64\\cs2.exe',
    'D:\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\game\\bin\\win64\\cs2.exe',
    'E:\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\game\\bin\\win64\\cs2.exe'
  ]

  for (const path of commonPaths) {
    if (existsSync(path)) {
      console.log('IPC: detect-executable found:', path)
      return path
    }
  }
  console.log('IPC: detect-executable found nothing')
  return null
})

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
