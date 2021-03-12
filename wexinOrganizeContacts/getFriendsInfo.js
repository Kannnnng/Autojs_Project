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
let forEach
try {
  utils = require('utils/main.js')
  uniqBy = require('wexinOrganizeContacts/node_modules/lodash.uniqby/index.js')
  forEach = require('wexinOrganizeContacts/node_modules/lodash.foreach/index.js')
} catch (e) {
  utils = require('../utils/main.js')
  uniqBy = require('node_modules/lodash.uniqby/index.js')
  forEach = require('node_modules/lodash.foreach/index.js')
}

/* 防止当前代码被重复执行 */
utils.stopRepeatExecution()

/* 当前设备的一些信息 */
let deviceWidth = device.width
let deviceHeight = device.height
let designedWidth = 1080 // 设计代码时的屏幕宽度
let designedHeight = 2248 // 设计代码时的屏幕高度

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
sleep(500)

/* 如果当前打开的微信页面不是主页面，则返回到主页面 */
while (!className('android.widget.TextView').text('我').findOne(1000)) back()

/* 确认选择到微信联系人（通讯录）页面 */
// className('android.widget.TextView').text('通讯录').findOne().parent().click()
/* 与上一个操作配合，形成双击底部通讯录按钮，以便滑动到人员列表顶部 */
/* 考虑到可能要从中间状态开始，因此这句话先暂时注释掉 */
// className('android.widget.TextView').text('通讯录').findOne().parent().click()
sleep(1000)

let friendsInformations = {}
let isFoundEnd = false

/* 程序退出时将获取到的数据保存下来 */
events.on('exit', () => {
  let resultString = '微信ID,姓名,标签,,,,,,其他信息'

  forEach(friendsInformations, (value, key) => {
    resultString += "\n"
      .concat(key, ",")
      .concat(value.name, ",")
      .concat(value.tags[0], ",")
      .concat(value.tags[1], ",")
      .concat(value.tags[2], ",")
      .concat(value.tags[3], ",")
      .concat(value.tags[4], ",")
      .concat(value.tags[5], ",")
      .concat(value.moreInfo);
  })

  /* 保存成表格格式方便修改，格式为 GB2312，Excel 打开不乱码 */
  files.write('./联系人信息.csv', resultString, 'gb2312')
})

while (!isFoundEnd) {
  className('android.view.View')
    .drawingOrder(4)
    .textMatches(/\S{2,}/)
    .find()
    .forEach((child) => {
      let tags = []
      let moreInfo = ''

      child.parent().parent().click()

      if (className('android.widget.TextView').depth(4).text('标签').findOne(500)) {
        className('android.widget.TextView')
          .depth(4)
          .text('标签')
          .findOne()
          .parent()
          .click()

        if (className('android.view.ViewGroup').depth(3).findOne(500)) {
          className('android.view.ViewGroup')
            .depth(3)
            .findOne()
            .children()
            .forEach((child) => { tags.push(child.text()) })
        }

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
              moreInfo = child.text() === '添加更多备注信息' ? '' : child.text()
            }
            if (child.text() === '描述') nextIsInfo = true
          })

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
        moreInfo: moreInfo,
      }

      back()
      sleep(250)
    })

    className('com.tencent.mm.ui.mogic.WxViewPager')
      .findOne()
      .child(1)
      .scrollForward()

  if (className('android.widget.TextView')
    .textContains('位联系人')
    .findOne(500)) break
}

/* 执行完毕退出程序返回到最开始的桌面 */
for (let i = 0; i < 3; i++) {
  back()
  sleep(250)
}

/* 退出程序 */
exit()
