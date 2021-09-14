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

/* 设置屏幕分辨率，当前数据来源于小米 8 */
setScreenMetrics(designedWidth, designedHeight)

/* 进入到微信 APP 中 */
app.startActivity({
  packageName: 'com.tencent.mm',
  className: 'com.tencent.mm.ui.LauncherUI'
})

/* 等待进入微信中 */
depth(0)
  .packageName('com.tencent.mm')
  .waitFor()
sleep(500)

/* 如果当前打开的微信页面不是主页面，则返回到主页面 */
while (!className('android.widget.TextView').text('我').findOne(2000)) back()

/* 确认选择到微信最近对话页面 */
className('android.widget.TextView')
  .text('微信')
  .findOne()
  .parent()
  .click()

/* 切换用一种更加简单的方式进入搜索页面 */
className('android.widget.RelativeLayout')
  .desc('搜索')
  .findOne()
  .click()

/* 在搜索栏中填入微信运动 */
className('android.widget.TextView')
  .text('取消')
  .waitFor()
sleep(250)
className('android.widget.TextView')
  .text('取消')
  .findOne()
  .parent()
  .child(1)
  .setText('微信运动')

/* 在搜索框中输入微信运动并点击出现的微信运动的搜索结果 */
while (true) {
  try {
    className('android.widget.TextView')
      .text('微信运动')
      .findOne()
      .parent()
      .click()
    break
  } catch (e) {
    sleep(250)
  }
}

/* 进入到微信运动对话框页面后点击步数排行榜 */
className('android.widget.TextView')
  .text('步数排行榜')
  .findOne()
  .parent()
  .click()

/* 阻塞等到步数排行榜页面准备好 */
className('android.widget.TextView')
  .textContains('占领了封面')
  .waitFor()

let isFirst = true
let isFoundEnd = false
while (!isFoundEnd) {
  className('android.widget.RelativeLayout')
    .depth(3)
    .find()
    .filter((item) => item.childCount())
    .forEach((item) => {
      if (!isFoundEnd && item.child(0).child(0).text()) {
        if (isFirst) {
          isFirst = false // 跳过自己的微信运动栏
        } else {
          item.child(item.childCount() - 1).click()
        }
      } else {
        isFoundEnd = true
      }
    })

  if (!isFoundEnd) {
    className('android.widget.ListView')
      .depth(2)
      .findOne()
      .scrollForward()
    sleep(250)
  }
}

/* 执行完毕退出程序返回到最开始的桌面 */
for (let i = 0; i < 3; i++) {
  back()
  sleep(250)
}

/* 锁定设备 */
utils.lockDevice()
