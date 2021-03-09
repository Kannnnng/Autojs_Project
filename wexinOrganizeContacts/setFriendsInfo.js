/* Autojs代码会将所有的模块合并到一个模块中执行，因此使用 const 这类变量 */
/* 声明语句时需要特别注意，在两个模块中用 const 声明同一个变量名会报错！ */
auto.waitFor()
if(!images.requestScreenCapture(false)){
  toast('请求截图权限失败')
  exit()
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
const WAIT_FOR_FIND_FINISH_BUTTON_TIME = 500

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
// className('android.widget.TextView')
//   .depth(3)
//   .text('通讯录')
//   .findOne()
//   .parent()
//   .click()

/* 确认选择到微信联系人（通讯录）页面 */
// className('android.widget.TextView')
//   .depth(3)
//   .text('通讯录')
//   .findOne()

let friendsInformations = JSON.parse(files.read('./联系人信息.json'))
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
        className('android.widget.TextView').textMatches(/(描述)|((添加)?标签)/).findOne(WAIT_FOR_FIND_TAGS_TIME)
      ) {
        friendInformation.isFinished = true

        if (className('android.widget.TextView').textMatches(/(添加)?标签/).findOne(WAIT_FOR_FIND_TAGS_TIME)) {
          className('android.widget.TextView')
            .textMatches(/(添加)?标签/)
            .findOne()
            .parent()
            .click()
        } else {
          className('android.widget.TextView')
            .text('描述')
            .findOne()
            .parent()
            .click()
        }

        /* 备注名称有效则修改名称 */
        if (
          friendInformation.name &&
          friendInformation.name !== className('android.widget.TextView').depth(3).drawingOrder(3).findOne().text()
        ) {
          /* 修改备注 */
          className('android.widget.TextView')
            .depth(3)
            .drawingOrder(3)
            .findOne()
            .click()

          className('android.widget.EditText')
            .depth(3)
            .drawingOrder(2)
            .findOne()
            .setText(friendInformation.name)
        }

        /* 原本有标签和没有标签的选择器不同，因此在这里合并这两种搜索方式 */
        let tagEditor =
          className('android.view.ViewGroup').depth(3).findOne(WAIT_FOR_FIND_TAGS_TIME) ||
          className('android.widget.TextView').depth(3).textContains('添加标签').findOne(WAIT_FOR_FIND_TAGS_TIME)

          /* 从微信读取原来的标签 */
        const previousTags = className('android.view.ViewGroup')
          .depth(3)
          .findOne()
          .children()
          .map((child) => child.text())

        /* 标签编辑器出现，设置的标签至少有一个有效，原有的标签和设置的标签不完全相同，三个条件缺一不可 */
        if (
          tagEditor &&
          friendInformation.tags.some((value) => !!value) &&
          (
            previousTags.length !== friendInformation.tags.filter((tag) => !!tag).length ||
            previousTags.some((tag) => !friendInformation.tags.includes(tag))
          )
        ) {
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
              sleep(100)
            })

          friendInformation.tags.forEach((tag) => {
            /* 跳过无效标签 */
            if (!tag) return

            setText(tag)

            className('android.widget.ListView')
              .depth(2)
              .waitFor()

            click(parent.bounds().right - 5, parent.bounds().bottom - 5)

            className('android.view.ViewGroup')
              .depth(3)
              .drawingOrder(2)
              .waitFor()
          })

          let saveButton = className('android.widget.Button')
            .depth(2)
            .text('保存')
            .findOne()
          if (saveButton.enabled()) {
            saveButton.click()
          } else {
            back()
            sleep(250)
          }
        }

        /* 修改更多个人信息 */
        className('android.widget.TextView')
          .depth(3)
          .text('描述')
          .waitFor()
        let nextIsInfo = false
        className('android.widget.ScrollView')
          .depth(2)
          .drawingOrder(1)
          .findOne()
          .children()
          .forEach((child) => {
            if (nextIsInfo) {
              nextIsInfo = false

              /* 跳过无效的备注信息 */
              if (
                friendInformation.moreInfo &&
                friendInformation.moreInfo !== child.text()
              ) {
                /* 点击编辑以后才会出现编辑框 */
                child.click()
                /* 这里非常不稳定，因为不同版本的微信此处控件对应的 ID 不同 */
                id('bb3')
                  .findOne()
                  .setText(friendInformation.moreInfo)
                sleep(100)
              }
              back()
            } else if (child.text() === '描述') nextIsInfo = true
          })

        let finishButton = className('android.widget.Button')
          .depth(2)
          .text('完成')
          .findOne(WAIT_FOR_FIND_FINISH_BUTTON_TIME)
        /* 如果修改前后没有区别，完成按钮就不能点，直接返回 */
        if (!finishButton || !finishButton.enabled()) {
          back()
        } else {
          finishButton.click()
        }
      } else {
        back()
      }

      className('android.widget.TextView')
        .depth(4)
        .text('发消息')
        .waitFor()
      back()
      className('android.widget.TextView')
        .depth(3)
        .text('通讯录')
        .waitFor()
    })

  className('com.tencent.mm.ui.mogic.WxViewPager')
    .depth(2)
    .findOne()
    .child(1)
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

/* 退出程序 */
exit()
