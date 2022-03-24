const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: 'SWTOR Gear calculator',
        appId: 'calculator.com',
        win: {
          target: ['nsis'],
          icon: 'src/assets/icon.png'
        },
        nsis: {
          installerIcon: 'src/assets/favicon.ico',
          uninstallerIcon: 'src/assets/favicon.ico',
          uninstallDisplayName: 'Unistall SWTOR Gear calculator',
          oneClick: true
        }
      }
    }
  }
})
