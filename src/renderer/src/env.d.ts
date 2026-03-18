import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface ElectronAPI {
    selectExecutable: () => Promise<string | null>
    detectExecutable: () => Promise<string | null>
  }

  interface Window {
    electron: ElectronAPI
    api: {
      launchServer: (config: {
        exePath: string
        gameType: string
        gameMode: string
        map: string
      }) => Promise<{ success: boolean; error?: string }>
      selectExecutable: () => Promise<string | null>
      detectExecutable: () => Promise<string | null>
    }
  }
}
