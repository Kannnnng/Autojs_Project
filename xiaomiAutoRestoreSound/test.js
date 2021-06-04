auto.waitFor()
if(!images.requestScreenCapture(false)){
  toast('请求截图权限失败')
  exit()
}

// /* 电源键菜单 */
// powerDialog()

// waitForPackage('android')

// sleep(250)

// // click(712, 1288) // 关机
// // click(716, 896) // 静音模式
// click(368, 1296) // 重新启动

// files.writeBytes('/sdcard/111.jpg', images.toBytes(images.captureScreen(), format = "png", quality = 75))
console.log(device)
console.log(device.height)


toast(123)