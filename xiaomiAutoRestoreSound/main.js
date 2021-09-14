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

/* 点亮屏幕 */
utils.lightUpScreen()

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
let rebootIcon = images.read('assets/reboot-icon.jpg') || images.read('xiaomiAutoRestoreSound/assets/reboot-icon.jpg')
utils.findOneByImage(rebootIcon, 0, [260, 1380, 240, 120], 0.8)

// 响铃与静音按钮
let soundNoIcon = images.read('assets/soundno.jpg') || images.read('xiaomiAutoRestoreSound/assets/soundno.jpg')
if (utils.findOneByImage(soundNoIcon, 1000, [600, 770, 220, 230], 0.9)) {
  utils.multipleClicks({
    x: 720,
    y: 888
  }, 3)
} else {
  utils.multipleClicks({
    x: 100,
    y: 100
  }, 3)
}

/* 为了防止程序不能马上退出，在代码的最后加上 exit 语句主动退出 */
exit()
