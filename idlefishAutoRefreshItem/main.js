/* Autojs代码会将所有的模块合并到一个模块中执行，因此使用 const 这类变量 */
/* 声明语句时需要特别注意，在两个模块中用 const 声明同一个变量名会报错！ */
auto.waitFor()
if(!images.requestScreenCapture(false)){
  toast("请求截图权限失败")
  exit()
} else {
  sleep(500)
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
utils.unlockDevice('number')

let deviceWidth = device.width
let deviceHeight = device.height
let designedWidth = 1080 // 设计代码时的屏幕宽度
let designedHeight = 2248 // 设计代码时的屏幕高度

/* 设置屏幕分辨率，当前数据来源于小米 8 */
setScreenMetrics(designedWidth, designedHeight)

/* 进入到闲鱼 APP 中按返回键调整到闲鱼 APP 的首页页面 */
app.startActivity({
  packageName: "com.taobao.idlefish",
  className: "com.taobao.fleamarket.home.activity.MainActivity"
})

/* 进入我的页面 */
className('android.widget.RelativeLayout')
  .depth(1)
  .drawingOrder(6)
  .descContains('我的')
  .findOne()
  .click()

/* 点击进入我发布的商品 */
textContains('我发布的')
  .findOne()
  .click()

/* 阻塞等待页面渲染好 */
desc('我的问答')
  .waitFor()
sleep(250)
  
/* 更新擦亮按钮图标 */
let caliangbuttonImage = images.read('./assets/caliangbutton.jpg') ||　images.read('idlefishAutoRefreshItem/assets/caliangbutton.jpg') // 擦亮按钮图片
let endtitleImage = images.read('./assets/endtitle.jpg') ||　images.read('idlefishAutoRefreshItem/assets/endtitle.jpg') // 底部横标图片

let productCaptureScreenImage // Autojs脚本引擎不支持块级作用域
while (true) {
  productCaptureScreenImage = images.captureScreen()

  images.matchTemplate(productCaptureScreenImage, caliangbuttonImage).points.filter((point, index, points) => !points.some((_point, _index) => _index < index && _point.x === point.x && _point.y === point.y)).sort((prev, next) => prev.y - next.y).forEach((point) => {
    longClick(point.x + 86, point.y + 47) // 这里的偏移是手动测量后设置的
    sleep(250)
  })
  
  if (!images.findImage(productCaptureScreenImage, endtitleImage)) {
    swipe(deviceWidth / 2, deviceHeight - 300, deviceWidth / 2, 0, 250)
    sleep(250)
  } else {
    /* 这里暂停是为了让最后一屏按钮点击有更长的反应和生效时间 */
    sleep(1000)
    break
  }
}

/* 读取的所有图片都应该在不使用以后回收其所占用的内存 */
caliangbuttonImage.recycle()
endtitleImage.recycle()

/* 执行完毕退出程序返回到最开始的桌面 */
for (let i = 0; i < 3; i++) {
  back()
  sleep(500)
}

/* 锁定设备 */
utils.lockDevice()
