"use strict";

import {
  app,
  Tray,
  Menu,
  protocol,
  BrowserWindow,
  globalShortcut,
} from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";

const path = require("path");
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

let win;
let tray = null;

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "favicon.ico"), //  不生效

    resizable: false,
    maximizable: false,
    transparent: true,
    frame: false,

    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info

      devTools: false,
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
  });

  // 注册快捷键
  app.whenReady().then(() => {
    const showWin = globalShortcut.register("Alt + S", () => {
      win && win.isVisible() ? win.hide() : win.show();
    });

    if (!showWin) {
      console.log("Alt + S, registration failed");
    }

    console.log(
      "Alt + S registerStatus:",
      globalShortcut.isRegistered("Alt + S")
    );
    const quitApp = globalShortcut.register("Alt + Q", () => {
      app.quit();
    });

    if (!quitApp) {
      console.log("Alt + Q, registration failed");
    }

    console.log(
      "Alt + Q registerStatus:",
      globalShortcut.isRegistered("Alt + Q")
    );
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
    win.setIgnoreMouseEvents(true); //  设置不触发鼠标事件

    // 关闭默认菜单
    win.setMenu(null);
    // 窗口关闭的监听
    win.on("closed", (event) => {
      win = null;
    });
    // 触发关闭时触发
    win.on("close", (event) => {
      // 截获 close 默认行为
      event.preventDefault();
      // 点击关闭时触发close事件，我们按照之前的思路在关闭时，隐藏窗口，隐藏任务栏窗口
      win.hide();
      win.setSkipTaskbar(true);
    });
    // 触发显示时触发
    win.on("show", () => {});
    // 触发隐藏时触发
    win.on("hide", () => {});

    // 新建托盘
    tray = new Tray(path.join(__dirname, "favicon.ico")); //  指向public文件夹下的具体.ico文件
    // 托盘名称
    tray.setToolTip("今天是周五吗");
    // 托盘菜单
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "显示",
        click: () => {
          win.show();
        },
      },
      {
        label: "退出",
        click: () => {
          win.destroy();
        },
      },
    ]);
    // 载入托盘菜单
    tray.setContextMenu(contextMenu);
    // 双击触发
    tray.on("double-click", () => {
      // 双击通知区图标实现应用的显示或隐藏
      win.isVisible() ? win.hide() : win.show();
      // win.isVisible() ? win.setSkipTaskbar(false) : win.setSkipTaskbar(true);
    });

    win.setSkipTaskbar(true); //  创建完成隐藏任务栏
    win.setOpacity(0.3);
  }
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

app.on("will-quit", () => {
  // 注销快捷键
  // globalShortcut.unregister('CommandOrControl+X')

  // 注销所有快捷键
  globalShortcut.unregisterAll();
});
