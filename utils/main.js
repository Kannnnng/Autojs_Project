let deviceWidth = device.width
let deviceHeight = device.height
let designedWidth = 1080 // 设计代码时的屏幕宽度
let designedHeight = 2248 // 设计代码时的屏幕高度
const lockscreenNumberMap = [ // 锁屏时数字密码按键的位置
  [540, 1875],
  [290, 1335],
  [540, 1335],
  [790, 1335],
  [290, 1515],
  [540, 1515],
  [790, 1515],
  [290, 1695],
  [540, 1695],
  [790, 1695],
]

let isNeedLockScreen = false // 是否需要息屏，如果程序运行前屏幕亮，则程序运行完成后不需要息屏

/* 设置屏幕分辨率，当前数据来源于小米 8 */
setScreenMetrics(designedWidth, designedHeight)

/* 统一设置 */
const config = {
  findOneByImageTimeGap: 250 // 图像匹配等待函数的检测时间间隔，以毫秒为单位
}

/* 点亮屏幕，返回 true 表示正常点亮，返回 false 表示原本就是亮的，也同时意味着手机没有锁屏 */
function lightUpScreen() {
  while (true) {
    if (device.isScreenOn() && currentPackage() !== 'com.android.systemui') {
      isNeedLockScreen = false

      if (confirm('设定的程序即将执行')) return false
      else exit()
    } else {
      isNeedLockScreen = true

      device.wakeUpIfNeeded()
      sleep(500)

      /* 执行唤醒操作后查看是否真正唤醒了，如果没有则继续执行唤醒动作 */
      if (device.isScreenOn()) break
    }
  }

  return true
}

/**
  * 解锁设备
  * @param {'number' | 'gesture'} type 锁屏类型，主要有 number 数字锁和 gesture 手势锁
  */
function unlockDevice(type) {
  if (isLostPhone()) exit()

  /* 默认为数字锁，因为 Autojs 不支持默认值语法，所以使用原始的初始值设置方式 */
  type = type || 'number'
  /* 点亮屏幕，返回 false 表示手机原本就是亮的，没有锁屏，也就不需要解锁 */
  if (!lightUpScreen()) return

  /* 阻塞等待手机被唤醒 */
  /* 1.充电时不显示上滑解锁而显示当前正在快速充电，无法进行后面的步骤 */
  /* 2.等到一秒应该换成等到当前活动应用 */
  /* 3.不能通过判断当前处于活动状态的应用知道是否进行下一步，很大概率上会判断错误，所以用最简单的办法，延迟时间 */
  // sleep(250)

  /* 下滑手势呼出状态栏 */
  // swipe(deviceWidth / 2, 10, deviceWidth / 2, deviceHeight * 2 / 3, 250)
  /* 这里改用直接显示快速设置 API */
  quickSettings()

  /* 点击设置按钮，呼出解锁页面 */
  desc('设置').findOne().click()

  /* 阻塞等待解锁页面出现 */
  text('返回').findOne()
  sleep(500)

  if (type === 'gesture') {
    /* 复杂手势解锁，与设置的具体手势有关，具体的坐标位置信息依赖于手机分辨率 */
    gesture(750, [541, 1329], [253, 1612], [832, 1616], [536, 1900])

  } else if (type === 'number') {
    /* 数字解锁 */
    [1,3,1,3].forEach((item) => {
      click(lockscreenNumberMap[item][0], lockscreenNumberMap[item][1])
      sleep(50)
    })
  } else {
    /* 没有匹配到对应的解锁方式，直接退出 */
    exit()
  }

  /* 等待成功解锁后进入手机设置页面 */
  waitForActivity('com.android.settings.MiuiSettings')
  sleep(250)

  /* 从设置页面返回到主页，直到发现锁屏快捷按键，并在此之后统一等待 500 毫秒，让页面缓冲好 */
  home()
  waitForPackage('com.miui.home')
  sleep(250)
}

/* 锁定设备，适用于手机处于正常开启状态，且桌面首页要有锁屏快捷方式 */
function lockDevice() {
  /* 需要点击两次 HOME 键才能保证一定会退到主界面 */
  home()
  sleep(250)
  home()

  if (isNeedLockScreen) {
    className('android.widget.TextView')
      .text('锁屏')
      .findOne()
      .parent()
      .click()
  }

  /* 锁屏后一般情况下需要停止程序运行 */
  exit()
}

/* 防止相同代码重复执行，当同一程序被多次同时运行时，停掉除本程序之外的其他程序 */
function stopRepeatExecution() {
  engines.all().slice(0, -1).forEach((script) => {
    if (script.getSource().getName().includes(engines.myEngine().getSource().getName())) {
      script.forceStop()
      sleep(250)
    }
  })
}

/* 超时停止，超过设置的超时时间 timeout 自动停止当前程序，已毫秒为单位 */
function stopWhenTimeout(timeout) {
  /* 超时时间无效时，不做任何操作 */
  if (!timeout) return

  let thread = threads.start(function() {
    setTimeout(function () {
      /* 调用这一句时程序并不会马上终止，后面的代码仍然有可能执行 */
      engines.myEngine().forceStop()

      /* 程序强制停止时返回桌面 */
      home()

      /* 确保程序停止 */
      exit()
    }, timeout)
  })

  thread.waitFor()

  return thread
}

/* 点击同一个地方 counter 次 */
function multipleClicks(point, counter) {
  for (let i = 0; i < counter; i++) {
    click(point.x, point.y)
  }
}

/* 点击同一个地方 counter 次，控件专用，isManual 表示是否通过模拟方式实现点击操作 */
function multipleClicksForElement(element, counter, isManual) {
  if (element) {
    if (element.forEach) {
      element.forEach((item) => { multipleClicksForElement(item, counter, isManual) })
    } else if (isManual && element.bounds) {
      const bounds = element.bounds()
      multipleClicks({
        x: bounds.centerX(),
        y: bounds.centerY(),
      }, counter)
    } else if (element.clickable() && element.click) {
      for (let i = 0; i < counter; i++) {
        element.click()
      }
    } else {
      throw new Error('点击当前选中的控件失败！')
    }
  }
}

/**
  * 等待函数，需要事先申请截图权限
  * @param {Image} image 待匹配的图像模板
  * @param {Number} timeout 超时时间，以毫秒为单位，不设置或设置为 0 表示不限时间
  * @param {Array} region 匹配图像的区域
  * @param {Number} threshold 匹配图像的阈值
  * @return {Point} 返回匹配到的图像的具体位置
  */
function findOneByImage(image, timeout, region, threshold) {
  threshold = threshold || 0.95

  /* 匹配结果 */
  let resultPoints = null

  if (image) {
    if (timeout) {
      let totalCount = Math.round(timeout / config.findOneByImageTimeGap)
      while (totalCount-- && !(resultPoints = images.findImage(images.captureScreen(), image, { region: region, threshold: threshold }))) sleep(config.findOneByImageTimeGap)
    } else {
      while (!(resultPoints = images.findImage(images.captureScreen(), image, { region: region, threshold: threshold }))) sleep(config.findOneByImageTimeGap)
    }
  } else {
    throw new Error('findOneByImage 函数的输入图像无效！')
  }

  return resultPoints
}

/**
  * 代码执行检测，发现代码不执行后执行指定操作
  * @param {Object} flag 标志
  * @param {Number} flag.flag 代码执行标志，一定时间内不变化则表明代码执行被阻塞了
  * @return {Object} 返回代码检测线程的 ID
  */
function codeExecutionDetector(flag, callback) {
  let prevFlag = null

  let thread = threads.start(function() {
    setTimeout(function F() {
      if (prevFlag === flag.flag) {
        callback()
      }

      prevFlag = flag.flag
      setTimeout(F, 2000)
    }, 2000)
  })

  thread.waitFor()

  return thread
}

/**
  * 返回当前时刻手机是否丢失
  * 一般与设备解锁函数 lockDevice 连用，如果发现手机已经丢失，则不执行后续操作
  * @return {Boolean} 是否已经丢失，true 代表已经丢失
  */
function isLostPhone() {
  // http://98.142.140.48:7001/autojs/isLostPhone
  const host = '98.142.140.48'
  const part = 7001
  const path = '/autojs/isLostPhone'

  /* 不需要出错情况（断网或其他），因为只要出错后续代码都不执行，符合设计要求 */
  const isLost = http.get(host + ':' + part + path).body.string() !== 'false'

  return isLost
}

/**
  * 降低当前手机亮度，并在程序要退出之前恢复原来的亮度
  */
function reduceBrightnessAndRecoverBeforeExit() {
  const prevBrightness = device.getBrightness()
  device.setBrightness(0)

  /* 在程序退出之前恢复原来的手机亮度 */
  events.on('exit', () => {
    device.setBrightness(prevBrightness)
  })
}

module.exports = {
  config: config,
  lockDevice: lockDevice,
  unlockDevice: unlockDevice,
  stopRepeatExecution: stopRepeatExecution,
  stopWhenTimeout: stopWhenTimeout,
  multipleClicks: multipleClicks,
  multipleClicksForElement: multipleClicksForElement,
  findOneByImage: findOneByImage,
  codeExecutionDetector: codeExecutionDetector,
  isLostPhone: isLostPhone,
  lightUpScreen: lightUpScreen,
  reduceBrightnessAndRecoverBeforeExit: reduceBrightnessAndRecoverBeforeExit,
}
