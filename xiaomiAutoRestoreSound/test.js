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
// console.log(device)
// console.log(device.height)
// point={300.0, 1428.0}, similarity=0.8788648843765259  非锁屏
// point={300.0, 1428.0}, similarity=0.8482397198677063  锁屏
let rebootIcon = images.read('assets/reboot-icon.jpg') || images.read('xiaomiAutoRestoreSound/assets/reboot-icon.jpg')
console.log(images.matchTemplate(images.captureScreen(), rebootIcon, { region: [260, 1380, 240, 120], threshold: 0.5}))
// point={690.0, 848.0}, similarity=0.9623988270759583   锁屏
// let soundNoIcon = images.read('assets/soundno.jpg') || images.read('xiaomiAutoRestoreSound/assets/soundno.jpg')
// console.log(images.matchTemplate(images.captureScreen(), soundNoIcon, { region: [600, 770, 220, 230], threshold: 0.5}))


toast(123)