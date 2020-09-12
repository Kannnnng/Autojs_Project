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
utils.stopWhenTimeout(1000 * 60 * 3)

/* 解锁设备 */
utils.unlockDevice('number')

/* 当前设备的一些信息 */
let deviceWidth = device.width
let deviceHeight = device.height
let designedWidth = 1080 // 设计代码时的屏幕宽度
let designedHeight = 2248 // 设计代码时的屏幕高度

/* 设置屏幕分辨率，当前数据来源于小米 8 */
setScreenMetrics(designedWidth, designedHeight)

/* 进入到支付宝 APP 中 */
// app.startActivity({
//   packageName: 'com.eg.android.AlipayGphone',
//   className: 'com.alipay.mobile.quinox.LauncherActivity'
// })

/* 直接进入蚂蚁森林 */
app.startActivity({
  packageName: 'com.eg.android.AlipayGphone',
  action: "VIEW",
  data: "alipayqr://platformapi/startapp?saId=60000002"
})

/* Autojs 打开支付宝提示窗，检测 10 秒钟，超过时间不再检测 */
try {
  packageName('com.eg.android.AlipayGphone')
    .className('android.widget.Button')
    .depth(1)
    .textContains('打开')
    .findOne(10000)
    .click()
} catch (e) {}
  
/* 因为可以直接进入蚂蚁森林，所以下面这段多步骤进入蚂蚁森林的代码就没用了 */
// /* 等待进入支付宝中 */
// depth(0)
//   .packageName('com.eg.android.AlipayGphone')
//   .waitFor()


// /* 如果打开的支付宝不是主页面，则返回到主页面 */
// while (!className('android.widget.TextView').depth(2).text('首页').findOne(500)) {
//   back()
// }

// className('android.widget.TextView')
//   .depth(2)
//   .text('首页')
//   .findOne()
//   .parent()
//   .click()

// idContains('search_button')
//   .findOne()
//   .click()

// idContains('search_input_box')
//   .findOne()
//   .setText('蚂蚁森林')

// className('android.widget.FrameLayout')
//   .depth(1)
//   .desc('搜索')
//   .findOne()
//   .click()

// className('android.widget.TextView')
//   .depth(4)
//   .text('蚂蚁森林')
//   .findOne()
//   .parent()
//   .click()

/* 等待进入蚂蚁森林 */
className('android.view.View')
  .depth(4)
  .waitFor()
sleep(1000)

/* 收集自己的能量 */
let energyBallIcon = images.read('assets/energy-ball.jpg') || images.read('alipayForestAutoCollect/assets/energy-ball.jpg')
images.matchTemplate(images.captureScreen(), energyBallIcon, { region: [0, 430, 1080, 630], threshold: 0.85 }).points.filter((point, index, points) => !points.some((_point, _index) => _index < index && _point.x === point.x && _point.y === point.y)).sort((prev, next) => prev.y - next.y).forEach((point) => {
  /* 对通过图像匹配匹配到的位置进行去重和按照从上到下的顺序排序 */
  /* 多次点击防止触发不了 */
  utils.multipleClicks(point, 3)
  sleep(250)
})

/* 有时收集完能量后会弹出推广提示框，点击其包含的关闭按钮关闭该提示框 */
try {
  className('android.widget.Button')
    .text('关闭')
    .findOne(1000)
    .click()
} catch (e) {}

/* 能量球识别颜色 */
// const ENERGY_BALL_IDENTIFY_COLOR = '#CFFF5E'

/* 找到能量球颜色位置，即找到能量球的位置，相比于图像匹配，颜色匹配速度更快，但有些情况下会匹配到不属于能量球的错误位置，导致一直点击错误位置而不能继续执行，因此换用图像匹配方式 */
// let energyPoint
// let counter = 0
// while (counter++ < 10 && (energyPoint = images.findColor(images.captureScreen(), ENERGY_BALL_IDENTIFY_COLOR, { region: [0, 430, 1080, 630] }))) {
//   click(energyPoint.x, energyPoint.y)
//   sleep(250)
// }

/* 蚂蚁森林刚进入时能量球还不能被正确识别为控件 */
// className('android.widget.Button')
//   .depth(7)
//   .textContains('收集能量')
//   .find()
//   .forEach((item) => {
//     let bounds = item.bounds()
//     click(bounds.centerX, bounds.centerY())
//     sleep(250)
//   })

className('android.view.View')
  .depth(6)
  .text('总排行榜')
  .findOne()
  .click()

className('android.view.View')
  .depth(6)
  .text('查看更多好友')
  .findOne()
  .click()

toastLog('正在进入总排行榜')  

/* 等待进入排行榜 */
let weeklyLeaderboardIcon = images.read('assets/weekly-leaderboard.jpg') || images.read('alipayForestAutoCollect/assets/weekly-leaderboard.jpg')
while (true) {
  if (images.matchTemplate(images.captureScreen(), weeklyLeaderboardIcon, { region: [0, 0, 1080, 500], threshold: 0.8 }).best()) break
  else sleep(1000)
}

toastLog('已经进入排行榜')  

/* 向下滑动寻找可以获取的能量 */
let pickableIcon = images.read('assets/pickable-icon.jpg') || images.read('alipayForestAutoCollect/assets/pickable-icon.jpg')
let isFoundEnd = false
while (!isFoundEnd) {
  images.matchTemplate(images.captureScreen(), pickableIcon, { region: [950, 0] }).points.filter((point, index, points) => !points.some((_point, _index) => _index < index && _point.x === point.x && _point.y === point.y)).sort((prev, next) => prev.y - next.y).forEach((point) => {
    click(point.x - 100, point.y + 80) // 这里的偏移是手动测量后设置的
    
    className('android.widget.Button')
      .textContains('浇水')
      .waitFor()
    
    /* 相比于颜色识别，控件识别更加准确，但是用控件识别速度太慢了！ */
    // let energyPoint
    // let counter = 0
    // while (counter++ < 10 && (energyPoint = images.findColor(images.captureScreen(), ENERGY_BALL_IDENTIFY_COLOR, { region: [0, 430, 1080, 630] }))) {
    //   click(energyPoint.x, energyPoint.y)
    //   sleep(250)
    // }
      
    /* 1.颜色识别因为存在等待获取的能量球标识，所以不能正确识别 */
    /* 2.颜色识别存在识别错误的情况，比如检测到背景颜色与能量球颜色相同时， */
    /* 会不断地点击背景，但背景颜色并不会发生更改，导致一直在点击背景，程序 */
    /* 会卡在这里无法继续向下执行 */
    images.matchTemplate(images.captureScreen(), energyBallIcon, { region: [0, 430, 1080, 630], threshold: 0.85 }).points.filter((point, index, points) => !points.some((_point, _index) => _index < index && _point.x === point.x && _point.y === point.y)).sort((prev, next) => prev.y - next.y).forEach((point) => {
      utils.multipleClicks(point, 3)
      sleep(250)
    })
      
    /* 蚂蚁森林刚进入时能量球还不能被正确识别为控件，因此使用 untilFind 函数 */
    // className('android.widget.Button')
    //   .depth(7)
    //   .textContains('收集能量')
    //   .untilFind()
    //   .forEach((item) => {
    //     let bounds = item.bounds()
    //     click(bounds.centerX(), bounds.centerY())
    //     sleep(250)
    //   })
    
    back()
    className('android.webkit.WebView')
      .depth(3)
      .waitFor()
    sleep(250)
  })

  if (className('android.view.View')
    .text('没有更多了')
    .findOne(250)) isFoundEnd = true

  if (!isFoundEnd) {
    /* 向下滑动的实现方式由模拟滑动改为调用控件滑动方法实现 */
    className('android.webkit.WebView')
      .depth(3)
      .findOne()
      .scrollForward()
    sleep(250)
  }
}

energyBallIcon.recycle()
pickableIcon.recycle()
weeklyLeaderboardIcon.recycle()

/* 执行完毕退出程序返回到最开始的桌面 */
back()
sleep(250)
home()
sleep(250)

/* 锁定设备 */
utils.lockDevice()
