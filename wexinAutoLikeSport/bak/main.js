/* Autojs代码会将所有的模块合并到一个模块中执行，因此使用 const 这类变量 */
/* 声明语句时需要特别注意，在两个模块中用 const 声明同一个变量名会报错！ */
auto.waitFor()
if(!images.requestScreenCapture(false)){
  toast("请求截图权限失败")
  exit()
} else {
  sleep(250)
}

/* 一些常用的当前设备信息 */
let deviceWidth = device.width
let deviceHeight = device.height
let designedWidth = 1080 // 设计代码时的屏幕宽度
let designedHeight = 2248 // 设计代码时的屏幕高度

/* 设置屏幕分辨率，当前数据来源于小米 8 */
setScreenMetrics(designedWidth, designedHeight)

/* 进入到微信 APP 中按返回键调整到微信 APP 的首页页面 */
app.startActivity({
  packageName: "com.tencent.mm",
  className: "com.tencent.mm.ui.LauncherUI"
})

/* 确认选择到微信最近对话页面 */
className('android.widget.RelativeLayout')
  .depth(2) 
  .findOne()
  .findOne(
    className('android.widget.TextView')
      .depth(3)
      .text('微信'))
  .parent()
  .click()
sleep(250)

/* 调整到微信最近对话框的顶部，以便从头开始找 */
let screenshot_1
let screenshot_2
while (true) {
  screenshot_1 = images.toBytes(images.captureScreen(), format = 'jpg', quality = 75)

  className('com.tencent.mm.ui.mogic.WxViewPager')
    .depth(2)
    .findOne()
    .child(0)
    .scrollBackward()
  sleep(500)
  
  screenshot_2 = images.toBytes(images.captureScreen(), format = 'jpg', quality = 75)

  if (images.matchTemplate(images.fromBytes(screenshot_1), images.fromBytes(screenshot_2)).best()) {
    break
  } else {
    for (let i = 0; i < 2; i++) {
      className('com.tencent.mm.ui.mogic.WxViewPager')
        .depth(2)
        .findOne()
        .child(0)
        .scrollBackward()
      sleep(500)
    }
  }
}

/* 微信运动的图片 */
let weixinsportImage = images.read('./weixinsport.jpg') || images.read('wexinAutoLikeSport/weixinsport.jpg')

/* 在微信最近对话列表中一直下滑，直到找到微信运动为止 */
let result
while (true) {
  result = images.matchTemplate(images.captureScreen(), weixinsportImage).best()

  if (result) {
    click(result.point.x + weixinsportImage.getWidth() / 2, result.point.y + weixinsportImage.getHeight() / 2)
    sleep(250)
    break
  } else {
    swipe(deviceWidth / 2, deviceHeight - 300, deviceWidth / 2, 0, 250)
    sleep(250)
  }
}

/* 进入到微信运动对话框页面后点击步数排行榜 */
className('android.widget.TextView')
  .depth(4)
  .text('步数排行榜')
  .findOne()
  .parent()
  .click()

/* 阻塞等到步数排行榜页面准备好 */
className('android.widget.TextView')
  .depth(2)
  .textContains('占领了封面')
  .findOne()

let isFoundEnd = false
while (!isFoundEnd) {
  className('android.widget.ListView')
    .depth(2)
    .findOne()
    .find(
      className('android.widget.RelativeLayout')
        .depth(4)
        .drawingOrder(3))
    .slice(1) // 跳过处于列表最前面的我的运动步数
    .forEach((item) => {
      if (isFoundEnd || item.parent().child(0).text()) {
        isFoundEnd = true
      } else {
        item.click()
        sleep(100)
      }
    })

  swipe(deviceWidth / 2, deviceHeight - 300, deviceWidth / 2, 0, 250)
  sleep(250)
}

/* 读取的所有图片都应该在不使用以后回收其所占用的内存 */
weixinsportImage.recycle()

/* 执行完毕退出程序返回到最开始的桌面 */
for (let i = 0; i < 3; i++) {
  back()
  sleep(500)
}
