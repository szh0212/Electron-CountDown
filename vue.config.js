const path = require("path");

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      outputDir: "VueDist",
      author: "szh",
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
});
