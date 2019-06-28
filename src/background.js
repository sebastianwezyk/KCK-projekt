'use strict'

import { app, protocol, BrowserWindow, globalShortcut } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', secure: true }])

function createWindow () {
  // Create the browser window.
 const screen = require('electron').screen;
    const display = screen.getPrimaryDisplay();
    const area = display.bounds;
    const x=-7;
    const y=0;
  win = new BrowserWindow({ width: area.width/3, height: area.height,x, y, icon:'public/favicon.ico', webPreferences: {
    nodeIntegration: true,
  } })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    //devtols off
 //   if (!process.env.IS_TEST) win.webContents.openDevTools()
 // } else {
 //   createProtocol('app')
 //   // Load the index.html when not in development
 //  win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {

  //funkcja łukowa do klawisza
  const klawisz = globalShortcut.register('CommandOrControl+K', () => {

  if(win.isMinimized()){
    win.maximize();
 } else win.minimize();
   })

if (!klawisz) {
  console.log('registration failed')

}


  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
     installVueDevtools()    //await wywalone bo funcja nie jest asynchroniczna
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
