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

/* 直接进入蚂蚁森林 */
app.startActivity({
  packageName: 'com.eg.android.AlipayGphone',
  data: 'alipayqr://platformapi/startapp?saId=60000002',
  action: 'VIEW',
})

/* Autojs 打开支付宝提示窗，检测 0.5 秒钟，超过时间不再检测 */
/* 这一步跟当前的运行环境有关，可能出现也可能不出现，所以检测 */
/* 时间尽量缩短，加快程序执行速度 */
try {
  packageName('com.eg.android.AlipayGphone')
    .className('android.widget.Button')
    .depth(1)
    .textContains('打开')
    .findOne(50)
    .click()
} catch (e) {}

/* 等待进入蚂蚁森林 */
let avatarIcon =
  images.read('assets/avatar.png') ||
  images.read('alipayForestAutoCollect/assets/avatar.png')
utils.findOneByImage(avatarIcon, 0, [590, 220, 341, 185])

/* 收集自己的能量 */
let energyBallIcon =
  images.read('assets/energy-ball.png') ||
  images.read('alipayForestAutoCollect/assets/energy-ball.png')
images
  .matchTemplate(images.captureScreen(), energyBallIcon, {
    region: [0, 430, 1080, 630],
    threshold: IMAGE_MATCHING_SIMILARITY_THRESHOLD,
  })
  .points.filter(
    (point, index, points) =>
      !points.some(
        (_point, _index) =>
          _index < index && _point.x === point.x && _point.y === point.y,
      ),
  )
  .sort((prev, next) => prev.y - next.y)
  .forEach((point) => {
    /* 对通过图像匹配匹配到的位置进行去重和按照从上到下的顺序排序 */
    /* 多次点击防止触发不了 */
    utils.multipleClicks(point, 3)
    sleep(50)
    utils.multipleClicks(point, 3)
    sleep(50)
  })

let findEnergyIcon =
  images.read('assets/find-energy.png') ||
  images.read('alipayForestAutoCollect/assets/find-energy.png') // 找能量图标
let isStop = false // 退出标志位，当没有能量可收取时设置为 true，退出找能量的无限循环
let lastEnergyNumber = null // 上一个朋友的能量值，用来跟当前朋友的能量值比较，用来确定页面加载完成
while (!isStop) {
  let findEnergyIconPoint = utils.findOneByImage(
    findEnergyIcon,
    0,
    [710, 1450, 367, 235],
  )
  lastEnergyNumber = className('android.view.View')
    .textMatches(/\d+g/)
    .depth(11)
    .findOne()
    .text()

  /* 点击找能量按钮 */
  utils.multipleClicks(
    {
      x: findEnergyIconPoint.x + findEnergyIcon.getWidth() / 2,
      y: findEnergyIconPoint.y + findEnergyIcon.getHeight() / 2,
    },
    3,
  )

  /* 等待页面加载完成 */
  let temp = null
  while (true) {
    /* 没有能量可收取，将推出标志位设置为 true */
    if (isStop) break
    else if (
      (temp = className('android.view.View')
        .textMatches(/\d+g/)
        .depth(11)
        .findOne(100)) &&
      lastEnergyNumber !== temp.text()
    ) {
      sleep(100)
      break
    } else if (
      className('android.view.View').text('返回蚂蚁森林>').findOne(100)
    ) {
      isStop = true
    } else sleep(100)
  }

  /* 收取能量 */
  if (!isStop) {
    /* 准备好收取能量之前，等待 500 毫秒，使截图内容更准确 */
    sleep(300)

    images
      .matchTemplate(images.captureScreen(), energyBallIcon, {
        region: [0, 430, 1080, 630],
        threshold: IMAGE_MATCHING_SIMILARITY_THRESHOLD,
      })
      .points.filter(
        (point, index, points) =>
          !points.some(
            (_point, _index) =>
              _index < index && _point.x === point.x && _point.y === point.y,
          ),
      )
      .sort((prev, next) => prev.y - next.y)
      .forEach((point) => {
        utils.multipleClicks(point, 3)
        sleep(50)
        utils.multipleClicks(point, 3)
        sleep(50)
      })

    /* 点到提醒收取的能量球时，会出现提醒好友收能量的对话框，需要取消这个对话框，才能继续 */
    let dialog = className('android.view.View')
      .text('知道了 去提醒')
      .findOne(500)
    if (dialog) {
      dialog.parent().child(0).click()
    }
  }
}

avatarIcon.recycle()
energyBallIcon.recycle()
findEnergyIcon.recycle()

/* 执行完毕退出程序返回到最开始的桌面 */
back()
sleep(250)
back()
sleep(250)
home()
sleep(250)

/* 锁定设备 */
utils.lockDevice()
