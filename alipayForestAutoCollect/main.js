/* Autojs代码会将所有的模块合并到一个模块中执行，因此使用 const 这类变量 */
/* 声明语句时需要特别注意，在两个模块中用 const 声明同一个变量名会报错！ */
auto.waitFor()
if(!images.requestScreenCapture(false)){
  toast('请求截图权限失败')
  exit()
} else {
  sleep(250)
}

/* 防止多个相同的程序同时执行 */
engines.all().slice(1).forEach((script) => {
  if (script.getSource().getName().includes(engines.myEngine().getSource().getName())) {
    script.forceStop()
    sleep(250)
  }
})

/* 引入工具箱 */
let utils = require('utils.js') || require('alipayForestAutoCollect/utils.js')

/* 解锁设备 */
utils.unlockDevice()

/* 当前设备的一些信息 */
let deviceWidth = device.width
let deviceHeight = device.height
let designedWidth = 1080 // 设计代码时的屏幕宽度
let designedHeight = 2248 // 设计代码时的屏幕高度

/* 设置屏幕分辨率，当前数据来源于小米 8 */
setScreenMetrics(designedWidth, designedHeight)

/* 能量球识别颜色 */
const ENERGY_BALL_IDENTIFY_COLOR = '#CFFF5E'

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
className('android.widget.Button')
  .depth(7)
  .text('背包')
  .waitFor()

/* 通过识别能量球图像来点击相对应位置 */
let energyIcon = images.read('assets/energy-icon.jpg') || images.read('alipayForestAutoCollect/assets/energy-icon.jpg')
images.matchTemplate(images.captureScreen(), energyIcon, { region: [0, 430, 1080, 630], threshold: 0.6 }).points.filter((point, index, points) => !points.some((_point, _index) => _index < index && _point.x === point.x && _point.y === point.y)).sort((prev, next) => prev.y - next.y).forEach((point) => {
  click(point.x + 60, point.y - 50)
  sleep(250)
})

/* 找到能量球颜色位置，即找到能量球的位置，相比于图像匹配，颜色匹配速度更快，但有些情况下会匹配到不属于能量球的错误位置，导致一直点击错误位置而不能继续执行，因此换用图像匹配方式 */
// let point
// while (point = images.findColor(images.captureScreen(), ENERGY_BALL_IDENTIFY_COLOR, { region: [0, 430, 1080, 630] })) {
//   click(point.x, point.y)
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
  .textContains('总排行榜')
  .findOne()
  .click()

className('android.view.View')
  .depth(6)
  .textContains('查看更多好友')
  .findOne()
  .click()

className('android.view.View')
  .depth(10)
  .text('李小龙')
  .waitFor()
sleep(250)

/* 向下滑动寻找可以获取的能量 */
let pickableIcon = images.read('assets/pickable-icon.jpg') || images.read('alipayForestAutoCollect/assets/pickable-icon.jpg')
let isFoundEnd = false
while (!isFoundEnd) {
  /* 颜色识别因为存在等待获取的能量球标识，所以不能正确识别 */
  // let pickableUserPoint
  // while (pickableUserPoint = images.findColor(images.captureScreen(), PICKABLE_IDENTIFY_COLOR, { region: [950, 0] })) {
  //   click(pickableUserPoint.x, pickableUserPoint.y)

  //   className('android.widget.TextView')
  //     .depth(1)
  //     .textContains('的蚂蚁森林')
  //     .waitFor()
  //   sleep(250)
    
  //   let point
  //   while (point = images.findColor(images.captureScreen(), ENERGY_BALL_IDENTIFY_COLOR, { region: [0, 430, 1080, 630] })) {
  //     click(point.x, point.y)
  //     sleep(250)
  //   }

  //   back()
  //   className('android.widget.TextView')
  //     .depth(1)
  //     .text('蚂蚁森林')
  //     .waitFor()
  //   sleep(250)
  // }
  
  images.matchTemplate(images.captureScreen(), pickableIcon, { region: [950, 0] }).points.filter((point, index, points) => !points.some((_point, _index) => _index < index && _point.x === point.x && _point.y === point.y)).sort((prev, next) => prev.y - next.y).forEach((point) => {
    click(point.x - 100, point.y + 80) // 这里的偏移是手动测量后设置的
  
    className('android.widget.Button')
      .depth(7)
      .text('浇水')
      .waitFor()
    sleep(100)
    
    /* 相比于颜色识别，控件识别更加准确，但是用控件识别速度太慢了！ */
    // let energyPoint
    // while (energyPoint = images.findColor(images.captureScreen(), ENERGY_BALL_IDENTIFY_COLOR, { region: [0, 430, 1080, 630] })) {
    //   click(energyPoint.x, energyPoint.y)
    //   sleep(250)
    // }

    images.matchTemplate(images.captureScreen(), energyIcon, { region: [0, 430, 1080, 630], threshold: 0.6 }).points.filter((point, index, points) => !points.some((_point, _index) => _index < index && _point.x === point.x && _point.y === point.y)).sort((prev, next) => prev.y - next.y).forEach((point) => {
      click(point.x + 60, point.y - 50)
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

    className('android.view.View')
      .depth(8)
      .text('总排行榜')
      .waitFor()
    sleep(250)
  })

  if (className('android.view.View')
    .depth(7)
    .text('没有更多了')
    .findOne(100)) isFoundEnd = true

  if (!isFoundEnd) {
    /* 向下滑动的实现方式由模拟滑动改为调用空间滑动方法实现 */
    // swipe(deviceWidth / 2, deviceHeight - 300, deviceWidth / 2, 300, 250)
    className('android.webkit.WebView')
      .depth(3)
      .findOne()
      .scrollForward()
    sleep(250)
  }
}

energyIcon.recycle()
pickableIcon.recycle()

/* 执行完毕退出程序返回到最开始的桌面 */
back()
sleep(250)
home()
sleep(250)

/* 锁定设备 */
utils.lockDevice()
