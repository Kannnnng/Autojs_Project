let deviceWidth = device.width
let deviceHeight = device.height
let designedWidth = 1080 // 设计代码时的屏幕宽度
let designedHeight = 2248 // 设计代码时的屏幕高度

let isNeedLockScreen = false // 是否需要息屏，如果程序运行前屏幕亮，则程序运行完成后不需要息屏

/* 设置屏幕分辨率，当前数据来源于小米 8 */
setScreenMetrics(designedWidth, designedHeight)

/* 解锁设备，type 为锁屏类型 */
/**
  * 解锁设备
  * @param {String} type 锁屏类型，主要有 number 数字锁和 gesture 手势锁
  */
function unlockDevice(type) {
  /* 默认为数字锁，因为 Autojs 不支持默认值语法，所以使用原始的初始值设置方式 */
  type = type || 'number'
  /* 手机屏幕开着且不处于解锁页面，则手机没有锁屏，直接返回 */
  while (true) {
    if (device.isScreenOn() && currentPackage() !== 'com.android.systemui') {
      isNeedLockScreen = false
      
      if (confirm('设定的程序即将执行')) return
      else exit()
    } else {
      isNeedLockScreen = true
      
      device.wakeUpIfNeeded()
      sleep(500)

      /* 执行唤醒操作后查看是否真正唤醒了，如果没有则继续执行唤醒动作 */
      if (device.isScreenOn()) break
    }
  }

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
    click(290, 1515)
    sleep(100)
    click(790, 1515)
    sleep(100)
    click(290, 1515)
    sleep(100)
    click(790, 1515)
    sleep(100)
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
  home()

  if (isNeedLockScreen) {
    waitForPackage('com.miui.home')
  
    className('android.widget.TextView')
      .text('锁屏')
      .depth(3)
      .findOne()
      .parent()
      .click()
  }

  /* 锁屏后一般情况下需要停止程序运行 */
  exit()
}

/* 防止相同代码重复执行，当同一程序被多次同时运行时，停掉除本程序之外的其他程序 */
function stopRepeatExecution() {
  engines.all().slice(1).forEach((script) => {
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
    setTimeout(function() {
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

module.exports = {
  lockDevice: lockDevice,
  unlockDevice: unlockDevice,
  stopRepeatExecution: stopRepeatExecution,
  stopWhenTimeout: stopWhenTimeout,
  multipleClicks: multipleClicks,
  multipleClicksForElement: multipleClicksForElement,
}
