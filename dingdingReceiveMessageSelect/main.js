/* Autojs代码会将所有的模块合并到一个模块中执行，因此使用 const 这类变量 */
/* 声明语句时需要特别注意，在两个模块中用 const 声明同一个变量名会报错！ */
auto.waitFor()
if(!images.requestScreenCapture(false)){
  toast('请求截图权限失败')
  exit()
}

/* 引入工具箱 */
let utils
let uniq
try {
  utils = require('utils/main.js')
  uniq = require('dingdingReceiveMessageSelect/node_modules/uniq/uniq.js')
} catch (e) {
  utils = require('../utils/main.js')
  uniq = require('./node_modules/uniq/uniq.js')
}

/* 防止当前代码被重复执行 */
utils.stopRepeatExecution()

/* 超时停止检测线程，当前功能限定在半分钟之内完成 */
utils.stopWhenTimeout(1000 * 60 * 0.5)

/* 解锁设备 */
utils.unlockDevice()

/* 当前设备的一些信息 */
let deviceWidth = device.width
let deviceHeight = device.height
let designedWidth = 1080 // 设计代码时的屏幕宽度
let designedHeight = 2248 // 设计代码时的屏幕高度

/* 设置屏幕分辨率，当前数据来源于小米 8 */
setScreenMetrics(designedWidth, designedHeight)

/* 进入到支付宝 APP 中 */
app.startActivity({
  packageName: 'com.alibaba.android.rimet',
  className: 'com.alibaba.android.rimet.biz.LaunchHomeActivity'
})

/* 等待进入支付宝中 */
depth(0)
  .packageName('com.alibaba.android.rimet')
  .waitFor()

/* 如果打开的支付宝不是主页面，则返回到主页面 */
while (!className('android.widget.TextView').text('消息').findOne(1000)) back()

utils.multipleClicksForElement(className('android.widget.Button')
  .text('搜索')
  .findOne(), 3)

className('android.widget.EditText')
  .text('搜索')
  .waitFor()
sleep(500)

className('android.widget.EditText')
  .text('搜索')
  .findOne()
  .setText('工作通知:浙政钉')

className('android.widget.TextView')
  .textContains('工作通知:浙政钉')
  .findOne()
  .parent()
  .click()

className('android.widget.ImageView')
  .desc('筛选')
  .findOne()
  .click()

className('android.widget.TextView')
  .text('选择需要筛选的微应用')
  .waitFor()

  
let messageTypes = []
let previousFirstItemText = ''
/* 程序退出时将获取到的数据保存下来 */
events.on('exit', () => {
  log(uniq(messageTypes))
})
do {
  previousFirstItemText = className('android.widget.ListView')
    .findOne()
    .child(0)
    .child(0)
    .text()

  className('android.widget.ListView')
    .findOne()
    .children()
    .forEach(function (item) {
      messageTypes.push(item.child(0).text())
    })
  
  scrollForward()
  sleep(250)
} while (previousFirstItemText !== className('android.widget.ListView').findOne().child(0).child(0).text())

exit()
/* 执行完毕退出程序返回到最开始的桌面 */
back()
sleep(250)
back()
sleep(250)
home()
sleep(250)

/* 锁定设备 */
utils.lockDevice()
