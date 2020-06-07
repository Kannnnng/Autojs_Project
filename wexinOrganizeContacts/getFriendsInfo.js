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
let uniqBy
try {
  utils = require('utils/main.js')
  uniqBy = require('wexinOrganizeContacts/node_modules/lodash.uniqby/index.js')
} catch (e) {
  utils = require('../utils/main.js')
  uniqBy = require('lodash.uniqby')
}

/* 防止当前代码被重复执行 */
utils.stopRepeatExecution()

/* 当前设备的一些信息 */
let deviceWidth = device.width
let deviceHeight = device.height
let designedWidth = 1080 // 设计代码时的屏幕宽度
let designedHeight = 2248 // 设计代码时的屏幕高度

const WAIT_FOR_FIND_TAGS_TIME = 500
const WAIT_FOR_FIND_END_TIME = 500

/* 设置屏幕分辨率，当前数据来源于小米 8 */
setScreenMetrics(designedWidth, designedHeight)

/* 进入到微信 APP 中 */
app.startActivity({
  packageName: 'com.tencent.mm',
  className: 'com.tencent.mm.ui.LauncherUI'
})

/* 等待进入微信中 */
depth(0)
  .packageName('com.tencent.mm')
  .waitFor()

/* 如果当前打开的微信页面不是主页面，则返回到主页面 */
while (!className('android.widget.TextView').depth(3).text('我').findOne(500)) back()
  
/* 确认选择到微信联系人（通讯录）页面 */
className('android.widget.TextView')
  .depth(3)
  .text('通讯录')
  .findOne()
  .parent()
  .click()

let friendsInformations = {}
let isFoundEnd = false

/* 程序退出时将获取到的数据保存下来 */
events.on('exit', () => {
  files.write('./联系人信息.json', JSON.stringify(friendsInformations))
})

while (!isFoundEnd) {
  className('android.view.View')
    .depth(6)
    .drawingOrder(4)
    .find()
    .forEach((child) => {
      let tags = []
      
      child.parent().parent().click()

      if (className('android.widget.TextView').depth(4).text('标签').findOne(WAIT_FOR_FIND_TAGS_TIME)) {
        className('android.widget.TextView')
          .depth(4)
          .text('标签')
          .findOne()
          .parent()
          .click()

        if (className('android.view.ViewGroup').depth(3).findOne(WAIT_FOR_FIND_TAGS_TIME)) {
          className('android.view.ViewGroup')
            .depth(3)
            .findOne()
            .children()
            .forEach((child) => { tags.push(child.text()) })
  
        }

        back()
        sleep(250)
      }

      friendsInformations[className('android.widget.TextView')
        .textContains('微信号:')
        .findOne()
        .text()
        .replace(/微信号:|\x20/g, '')] = {
        name: child.text(),
        tags: tags,
        moreInfo: '',
      }

      log({
        name: child.text(),
        tags: tags,
        id: className('android.widget.TextView')
          .textContains('微信号:')
          .findOne()
          .text()
          .replace(/微信号:|\x20/g, '')
      })
      
      back()
      sleep(250)
    })
    
  className('android.widget.ListView')
    .depth(3)
    .drawingOrder(5)
    .findOne()
    .scrollForward()

  if (className('android.widget.TextView')
    .depth(5)
    .textContains('位联系人')
    .findOne(WAIT_FOR_FIND_END_TIME)) break
}

/* 执行完毕退出程序返回到最开始的桌面 */
for (let i = 0; i < 3; i++) {
  back()
  sleep(250)
}

/* 锁定设备 */
utils.lockDevice()
