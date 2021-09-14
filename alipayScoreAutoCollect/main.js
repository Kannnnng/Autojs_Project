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

/* 超时停止检测线程，当前功能限定在半分钟之内完成 */
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

/* 进入到支付宝 APP 中 */
app.startActivity({
  packageName: 'com.eg.android.AlipayGphone',
  className: 'com.alipay.mobile.quinox.LauncherActivity'
})

/* 等待进入支付宝中 */
depth(0)
  .packageName('com.eg.android.AlipayGphone')
  .waitFor()

/* 如果打开的支付宝不是主页面，则返回到主页面 */
while (!className('android.widget.TextView').text('首页').findOne(2000)) back()

utils.multipleClicksForElement(className('android.widget.TextView')
  .text('我的')
  .findOne()
  .parent(), 3)

className('android.support.v7.widget.RecyclerView')
  .depth(1)
  .waitFor()
sleep(2000)

const memberIcon = images.read('assets/member.png') || images.read('alipayScoreAutoCollect/assets/member.png')
while (true) {
  let memberIconPoint = null
  if (memberIconPoint = images.findImage(images.captureScreen(), memberIcon, { region: [0, 0, 1080, 700], threshold: 0.95 })) {
    utils.multipleClicks({
      x: memberIconPoint.x + memberIcon.getWidth() / 2,
      y: memberIconPoint.y + memberIcon.getHeight() / 2,
    }, 3)
    break
  }
  else sleep(500)
}

utils.multipleClicksForElement(text('全部领取')
  .findOne(2000), 3)

utils.multipleClicksForElement(className('android.view.View')
  .textMatches(/每日签到/)
  .findOne()
  .parent(), 1)

className('android.view.View')
  .textContains('明天签到 +')
  .waitFor()

// if (!className('android.view.View').textContains('已连续签到').findOne(500)) {
//   utils.multipleClicksForElement(className('android.view.View')
//     .text('签到领积分')
//     .findOne(500), 3)
// }

back()

// utils.multipleClicksForElement(className('android.view.View')
//   .text('我的家')
//   .findOne()
//   .parent(), 3)

className('android.widget.ImageButton')
  .desc('更多')
  .depth(1)
  .findOne()
  .click()

className('android.view.View')
  .text('家庭共享积分')
  .waitFor()
sleep(500)

utils.multipleClicksForElement(className('android.view.View')
  .textMatches(/\+\d/)
  .find(), 3, true)

// /* 黄金会员以上（含）的界面不适用下面的代码 */
// className('android.view.View')
//   .textMatches(/点击领取|可用积分/)
//   .waitFor()
// sleep(250)

// /* 点击不同的积分类型 */
// /* Autojs 的 Javascript 引擎不能正确解析 [xx, xx] 生成数组的方式，需要用原始的 Array() 构造函数方式实现 */
// Array('到店支付', '签到', '公交地铁出行', '转账到户').forEach(function (type) {
//   className('android.view.View')
//     .text(type)
//     .find()
//     .forEach(function (item) {
//       item.parent().click()
//       item.parent().click()
//       item.parent().click()
//       sleep(100)
//     })
// })

/* 释放导入的图片资源 */
memberIcon.recycle()

/* 执行完毕退出程序返回到最开始的桌面 */
back()
sleep(250)
back()
sleep(250)
home()
sleep(250)

/* 锁定设备 */
utils.lockDevice()
