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
// images.matchTemplate(images.captureScreen(), rebootConfirmIcon, { region: [0, 920, 1080, 600], threshold: 0.75 }).points.filter((point, index, points) => !points.some((_point, _index) => _index < index && _point.x === point.x && _point.y === point.y)).sort((prev, next) => prev.y - next.y).forEach((point) => {
//   longClick(point.x, point.y)
// })
const memberIcon = images.read('assets/reboot-icon.jpg') || images.read('xiaomiAutoReboot/assets/reboot-icon.jpg')
console.log(images.findImage(images.captureScreen(), memberIcon, { threshold: 0.95 }))

toastLog('完成')