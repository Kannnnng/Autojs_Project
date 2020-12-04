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
utils.stopWhenTimeout(1000 * 60 * 3)

/* 解锁设备 */
utils.unlockDevice()

/* 当前设备的一些信息 */
let deviceWidth = device.width
let deviceHeight = device.height
let designedWidth = 1080 // 设计代码时的屏幕宽度
let designedHeight = 2248 // 设计代码时的屏幕高度

/* 设置屏幕分辨率，当前数据来源于小米 8 */
setScreenMetrics(designedWidth, designedHeight)

/* 直接进入蚂蚁森林 */
app.startActivity({
  packageName: 'com.eg.android.AlipayGphone',
  action: "VIEW",
  data: "alipayqr://platformapi/startapp?saId=60000002"
})

/* Autojs 打开支付宝提示窗，检测 0.5 秒钟，超过时间不再检测 */
/* 这一步跟当前的运行环境有关，可能出现也可能不出现，所以检测 */
/* 时间尽量缩短，加快程序执行速度 */
try {
  packageName('com.eg.android.AlipayGphone')
    .className('android.widget.Button')
    .depth(1)
    .textContains('打开')
    .findOne(500)
    .click()
} catch (e) {}
  
/* 等待进入蚂蚁森林 */
let avatarIcon = images.read('assets/avatar.jpg') || images.read('alipayForestAutoCollect/assets/avatar.jpg')
while (!images.findImage(images.captureScreen(), avatarIcon, { region: [0, 0, 1080, 430], threshold: 0.95 })) sleep(500)

/* 收集自己的能量 */
let energyBallIcon = images.read('assets/energy-ball.jpg') || images.read('alipayForestAutoCollect/assets/energy-ball.jpg')
images.matchTemplate(images.captureScreen(), energyBallIcon, { region: [0, 430, 1080, 630], threshold: 0.94 }).points.filter((point, index, points) => !points.some((_point, _index) => _index < index && _point.x === point.x && _point.y === point.y)).sort((prev, next) => prev.y - next.y).forEach((point) => {
  /* 对通过图像匹配匹配到的位置进行去重和按照从上到下的顺序排序 */
  /* 多次点击防止触发不了 */
  utils.multipleClicks(point, 3)
  sleep(50)
  utils.multipleClicks(point, 3)
  sleep(50)
})

let findEnergyIcon = images.read('assets/find-energy.jpg') || images.read('alipayForestAutoCollect/assets/find-energy.jpg')
let getEndIcon = images.read('assets/get-end.jpg') || images.read('alipayForestAutoCollect/assets/get-end.jpg')
let energyCompetitionIcon = images.read('assets/energy-competition.jpg') || images.read('alipayForestAutoCollect/assets/energy-competition.jpg')
let isStop = false // 退出标志位，当没有能量可收取时设置为 true，退出找能量的无限循环
let lastEnergyNumber = null
while (!isStop) {
  let findEnergyIconPoint = null
  if (findEnergyIconPoint = images.findImage(images.captureScreen(), findEnergyIcon, { region: [0, 1450, 1080, 200], threshold: 0.95 })) {
    lastEnergyNumber = className('android.view.View').textMatches(/\d+g/).depth(11).findOne().text()
    
    /* 点击找能量按钮 */
    findEnergyIconPoint = findEnergyIconPoint.point
    utils.multipleClicks({
      x: findEnergyIconPoint.x + findEnergyIcon.getWidth() / 2,
      y: findEnergyIconPoint.y + findEnergyIcon.getHeight() / 2,
    }, 3)

    /* 等待页面加载完成 */
    let temp = null
    while (true) {
      /* 没有能量可收取，将推出标志位设置为 true */
      if (isStop) break
      else if ((temp = className('android.view.View').textMatches(/\d+g/).depth(11).findOne(500)) && (lastEnergyNumber !== temp.text())) break
      else if (images.findImage(images.captureScreen(), getEndIcon, { region: [0, 1450, 1080, 200], threshold: 0.95 })) { isStop = true }
      else sleep(500)
    }

    while (!isStop && !images.findImage(images.captureScreen(), energyCompetitionIcon, { region: [0, 1633], threshold: 0.8 })) sleep(500)

    if (!isStop) {
      /* 收取能量 */
      images.matchTemplate(images.captureScreen(), energyBallIcon, { region: [0, 430, 1080, 630], threshold: 0.94 }).points.filter((point, index, points) => !points.some((_point, _index) => _index < index && _point.x === point.x && _point.y === point.y)).sort((prev, next) => prev.y - next.y).forEach((point) => {
        utils.multipleClicks(point, 3)
        sleep(50)
        utils.multipleClicks(point, 3)
        sleep(50)
      })
    }
  } else {
    sleep(500)
  }
}

avatarIcon.recycle()
energyBallIcon.recycle()
findEnergyIcon.recycle()
getEndIcon.recycle()
energyCompetitionIcon.recycle()

/* 执行完毕退出程序返回到最开始的桌面 */
back()
sleep(250)
back()
sleep(250)
home()
sleep(250)

/* 锁定设备 */
utils.lockDevice()
