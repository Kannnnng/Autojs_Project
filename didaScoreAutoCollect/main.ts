/* Autojs代码会将所有的模块合并到一个模块中执行，因此使用 const 这类变量 */
/* 声明语句时需要特别注意，在两个模块中用 const 声明同一个变量名会报错！ */
auto.waitFor()
if (!images.requestScreenCapture(false)) {
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
utils.stopWhenTimeout(1000 * 60 * 2)

/* 解锁设备 */
utils.unlockDevice()

/* 降低手机亮度 */
utils.reduceBrightnessAndRecoverBeforeExit()

/* 当前设备的一些信息 */
let deviceWidth = device.width
let deviceHeight = device.height
let designedWidth = 1080 // 设计代码时的屏幕宽度
let designedHeight = 2248 // 设计代码时的屏幕高度

/* 图像匹配相似度阈值， 0.94 是临界值，设置 0.9，提供一定的误识别空间 */
/* 使用 PNG 图像做图像匹配源以后，正确识别率大大提高，因此可提高相似度阈值 */
const IMAGE_MATCHING_SIMILARITY_THRESHOLD = 0.95

/* 设置屏幕分辨率，当前数据来源于小米 8 */
setScreenMetrics(designedWidth, designedHeight)

/* 进入到滴答打车 APP 中 */
app.launchPackage('com.didapinche.booking')

/* 等待进入滴答打车 */
selector()
  .packageName('com.didapinche.booking')
  .depth(0)
  .waitFor()

/* 不在首页的跳转到首页 */
while (!selector().className('android.widget.TextView').text('输入市内、城际目的地').findOne(1500)) back()

/* 用两秒钟的时间点击跳过开头可能跳出来的广告 */
sleep(500)
for (let i = 0; i < 3; i++) {
  let temp = selector()
    .className('android.widget.FrameLayout')
    .depth(0)
    .findOne(500)
  if (temp?.childCount() === 2) {
    temp.child(1).click()
    break
  } else {
    sleep(500)
  }
}

/* 等待页面刷新好 */
selector()
  .className('android.widget.ScrollView')
  .depth(2)
  .waitFor()

/* 点击头像进入个人主页 */
selector()
  .className('android.widget.FrameLayout')
  .depth(1)
  .findOne()
  .children()
  .some((() => {
    let isNextFound = false
    return (child: UiObject) => {
      if (isNextFound) {
        child.click()
        return true
      }
      if (child.className() === 'android.widget.ScrollView') {
        isNextFound = true
      }
      return false
    }
  })())

selector()
  .className('android.widget.TextView')
  .text('天天福利')
  .waitFor()

selector()
  .className('android.widget.TextView')
  .text('天天福利')
  .findOne()
  .parent()
  .click()

selector()
  .className('android.widget.TextView')
  .text('立即签到')
  .findOne(2000)
  ?.click()

/* 执行完毕退出程序返回到最开始的桌面 */
back()
sleep(250)
back()
sleep(250)
back()
sleep(250)
home()
sleep(250)

/* 锁定设备 */
utils.lockDevice()
