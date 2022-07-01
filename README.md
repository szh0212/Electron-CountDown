# countdown

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Electron  
参考文档 https://github.com/nklayman/vue-cli-plugin-electron-builder
        https://www.electronjs.org/zh/docs/latest

npm i @vue/cli -g --save  安装vue-cli
npm i cnpm -g --save  //  安装cnpm (非必要，用于与npm区分开)
配置镜像地址，避免后续安装依赖及打包时下载文件失败
cnpm set registry https://registry.npm.taobao.org/
cnpm set ELECTRON_BUILDER_BINARIES_MIRROR https://npm.taobao.org/mirrors/electron-builder-binaries/
cnpm set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/
创建项目,添加electron插件
vue create app-name
vue add vue-cli-plugin-electron-builder

### vue.config.js  配置打包相关  
参考文档 https://www.electron.build/configuration/configuration

  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      outputDir: "VueDist",
      builderOptions: {
        appId: "com.example.app",
        productName: "Countdown", //  项目名  也是生成的安装文件名
        copyright: "Copyright©2022", //  版权信息
        directories: {
          output: "./ElectronDist", // 输出文件路径
        },

        win: {
          icon: "./src/icons/favicon.ico", //  文件图标
        },

        nsis: {
          oneClick: false, //  true 全自动安装
          allowToChangeInstallationDirectory: true, //  允许修改安装目录
        },
      },
      // TODO: 不生效
      win: {
        icon: path.join(__dirname, "favicon.ico"), //  桌面图标路径  256 x 256  否则报错
      },
    },
  },

### background.js  
参考文档 https://www.electronjs.org/zh/docs/latest/api/app

createWindow() 创建window对象及使用window 相关方法及配置