/* Autojs代码会将所有的模块合并到一个模块中执行，因此使用 const 这类变量 */
/* 声明语句时需要特别注意，在两个模块中用 const 声明同一个变量名会报错！ */
auto.waitFor()
if(!images.requestScreenCapture(false)){
  toast('请求截图权限失败')
  exit()
}

/* 引入工具箱 */
let utils
try {
  utils = require('utils/main.js')
} catch (e) {
  utils = require('../utils/main.js')
}

/* 防止当前代码被重复执行 */
utils.stopRepeatExecution()

/* 超时停止检测线程 */
utils.stopWhenTimeout(1000 * 60 * 0.5)

/* 解锁设备 */
utils.unlockDevice()

/* 降低手机亮度 */
utils.reduceBrightnessAndRecoverBeforeExit()

/* 当前设备的一些信息 */
let deviceWidth = device.width
let deviceHeight = device.height
let designedWidth = 1080 // 设计代码时的屏幕宽度
let designedHeight = 2248 // 设计代码时的屏幕高度

/* 设置屏幕分辨率，当前数据来源于小米 8 */
setScreenMetrics(designedWidth, designedHeight)

/* 电源键菜单 */
powerDialog()
sleep(1000)

/* 等待电源菜单弹出 */
let rebootIcon = images.read('assets/reboot-icon.jpg') || images.read('xiaomiAutoReboot/assets/reboot-icon.jpg')
let rebootButtonPosition = utils.findOneByImage(rebootIcon, 0, [123, 1250, 500, 321], 0.9)

click(rebootButtonPosition.x + rebootIcon.getWidth() / 2, rebootButtonPosition.y - 140) // 重新启动

/* 等待重新启动页面弹出 */
let rebootConfirmIcon = images.read('assets/reboot-confirm.jpg') || images.read('xiaomiAutoReboot/assets/reboot-confirm.jpg')
let rebootConfirmButtonPosition = utils.findOneByImage(rebootConfirmIcon, 0, [140, 752, 780, 717], 0.9)

click(rebootConfirmButtonPosition.x + rebootConfirmIcon.getWidth() / 2, rebootConfirmButtonPosition.y - 180) // 确认重新启动

/* 为了防止程序不能马上退出，在代码的最后加上 exit 语句主动退出 */
exit()
