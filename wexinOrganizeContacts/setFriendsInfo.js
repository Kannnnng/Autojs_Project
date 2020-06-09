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

let friendsInformations = JSON.stringify(JSON.parse(files.read('./联系人信息.json')))
let isFoundEnd = false

while (!isFoundEnd) {
  className('android.view.View')
    .depth(6)
    .drawingOrder(4)
    .find()
    .forEach((child) => {
      let tags = []
      
      child.parent().parent().click()

      let weixinId = className('android.widget.TextView')
        .textContains('微信号:')
        .findOne()
        .text()
        .replace(/微信号:|\x20/g, '')

      let friendInformation = friendsInformations[weixinId]

      if (
        friendInformation &&
        !friendInformation.isFinished &&
        className('android.widget.TextView').depth(4).text('标签').findOne(WAIT_FOR_FIND_TAGS_TIME)
      ) {
        friendInformation.isFinished = true

        className('android.widget.TextView')
          .depth(4)
          .textContains('标签')
          .findOne()
          .parent()
          .click()

        /* 修改备注 */
        className('android.widget.TextView')
          .depth(3)
          .drawingOrder(3)
          .findOne()
          .click()
        className('android.widget.EditView')
          .depth(3)
          .drawingOrder(2)
          .waitFor()
        setText(friendInformation.name)

        /* 原本有标签和没有标签的选择器不同，因此在这里合并这两种搜索方式 */
        let tagEditor = 
          className('android.view.ViewGroup').depth(3).findOne(WAIT_FOR_FIND_TAGS_TIME) ||
          className('android.widget.TextView').depth(3).textContains('添加标签').findOne(WAIT_FOR_FIND_TAGS_TIME)
        if (tagEditor) {
          tagEditor.click()

          className('android.widget.TextView')
            .depth(2)
            .text('添加标签')
            .waitFor()

          let parent = className('android.view.ViewGroup')
            .depth(3)
            .drawingOrder(1)
            .findOne()
            
          /* 删除现有的标签 */
          parent
            .children()
            .forEach((child) => {
              if (child.className() !== 'android.widget.TextView') return

              child.click()
              sleep(100)
              child.click()
            })

          friendInformation.tags.forEach((tag) => {
            setText(tag)

            className('android.widget.ListView')
              .depth(2)
              .waitFor()
            
            click(parent.bounds().right - 2, parent.bounds().centerY())

            className('android.view.ViewGroup')
              .depth(3)
              .drawingOrder(2)
              .waitFor()
          })

          let saveButton = className('android.widget.Button')
            .depth(2)
            .text('保存')
            .findOne()
          if (saveButton.clickable()) {
            saveButton.click()
          } else {
            back()
            sleep(250)
          }
        }

        /* 修改更多信息 */
        className('android.widget.EditView')
          .depth(3)
          .drawingOrder(13)
          .findOne()
          .setText(friendInformation.moreInfo)

        let finishButton = className('android.widget.Button')
          .depth(2)
          .text('完成')
          .findOne()
        if (finishButton.clickable()) {
          finishButton.click()
        } else {
          back()
          sleep(250)
        }
      }

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
