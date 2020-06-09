/* Autojs代码会将所有的模块合并到一个模块中执行，因此使用 const 这类变量 */
/* 声明语句时需要特别注意，在两个模块中用 const 声明同一个变量名会报错！ */
auto.waitFor()
if(!images.requestScreenCapture(false)){
  toast('请求截图权限失败')
  exit()
} else {
  sleep(250)
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

/* 电源键菜单 */
powerDialog()

/* 等待电源菜单弹出 */
waitForPackage('android')

/* 选择不同的语句执行不同的操作 */
sleep(1000)
// click(712, 1288) // 关机
// click(716, 896) // 静音模式
click(368, 1296) // 重新启动
