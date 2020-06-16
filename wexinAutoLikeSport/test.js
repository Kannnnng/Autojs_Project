auto.waitFor()
if(!images.requestScreenCapture(false)){
  toast("请求截图权限失败")
  exit()
} else {
  sleep(250)
}

let deviceWidth = device.width
let deviceHeight = device.height
let designedWidth = 1080 // 设计代码时的屏幕宽度
let designedHeight = 2248 // 设计代码时的屏幕高度

// log(className('com.tencent.mm.ui.mogic.WxViewPager')
// .depth(2)
// .findOne().length)
// while (!className('android.widget.ListView')
//   .depth(2)
//   .findOne()
//   .find(
//     className('android.widget.RelativeLayout')
//       .depth(4)
//       .drawingOrder(1))      
//   .map((item) => item.child(0))
//   .some((item) => item.text())) {
//   className('android.widget.ListView')
//   .depth(2)
//   .findOne()
//   .find(
//     className('android.widget.RelativeLayout')
//       .depth(4)
//       .drawingOrder(3))
//   .slice(1)
//   .forEach((item) => {
//     item.click()
//     sleep(100)
//   })

//   swipe(deviceWidth / 2, deviceHeight - 300, deviceWidth / 2, 0, 250)
//   sleep(250)
// }

// className('com.tencent.mm.ui.mogic.WxViewPager')
// .depth(2)
// .findOne()
// .child(0)
//   .scrollBackward()

// let screenshot_1
// let screenshot_2
// while (true) {
//   screenshot_1 = images.toBytes(images.captureScreen(), format = 'jpg', quality = 75)

//   // className('com.tencent.mm.ui.mogic.WxViewPager')
//   //   .depth(2)
//   //   .findOne()
//   //   .child(0)
//   //     .scrollBackward()

//   sleep(250)
  
//   screenshot_2 = images.toBytes(images.captureScreen(), format = 'jpg', quality = 75)

//   log(images.matchTemplate(images.fromBytes(screenshot_1), images.fromBytes(screenshot_2)).best())
  
//   break
//   // if (result) {
//   //   break
//   // } else {
//   //   swipe(deviceWidth / 2, 0, deviceWidth / 2, deviceHeight - 300, 250)
//   //   sleep(250)
//   // }
// }

// /* 调整到微信最近对话框的顶部，以便从头开始找 */
// let screenshot_1
// let screenshot_2
// while (true) {
//   screenshot_1 = images.toBytes(images.captureScreen(), format = 'jpg', quality = 75)

//   className('com.tencent.mm.ui.mogic.WxViewPager')
//     .depth(2)
//     .findOne()
//     .child(0)
//     .scrollBackward()
//   sleep(500)
  
//   screenshot_2 = images.toBytes(images.captureScreen(), format = 'jpg', quality = 75)

//   if (images.matchTemplate(images.fromBytes(screenshot_1), images.fromBytes(screenshot_2)).best()) {
//     toast('OK')
//     break
//   } else {
//     className('com.tencent.mm.ui.mogic.WxViewPager')
//       .depth(2)
//       .findOne()
//       .child(0)
//       .scrollBackward()
//     sleep(500)
//   }
// }
/* 阻塞等待切换到微信最近对话框页面，并点击右上角搜索按钮 */
// className('android.view.ViewGroup')
//   .depth(2)
//   .findOne()
//   .child(0)
//   .child(0)
//   .findOne(textContains('微信('))
//   .parent()
//   .parent()
//   .child(1)
//   .findOne(desc('搜索'))
//   .click()


// className('android.widget.TextView')
//   .depth(2)
//   .text('取消')
//   .findOne()
//   .parent()
//   .child(0)
//   .setText('微信运动')
// className('android.widget.ListView')
//   .depth(1)
//   .findOne()
//   .findOne(
//     className('android.widget.TextView')
//       .depth(3)
//       .text('微信运动'))
//   .parent()
//   .click()

// let isFoundEnd = false
// while (!isFoundEnd) {
//   className('android.widget.ListView')
//     .depth(2)
//     .findOne()
//     .find(
//       className('android.widget.RelativeLayout')
//         .depth(4)
//         .drawingOrder(3))
//     .slice(1) // 跳过处于列表最前面的我的运动步数
//     .forEach((item) => {
//       if (isFoundEnd || item.parent().child(0).child(0).text()) {
//         isFoundEnd = true
//       } else {
//         item.click()
//         sleep(100)
//       }
//     })

//   swipe(deviceWidth / 2, deviceHeight - 300, deviceWidth / 2, 0, 250)
//   sleep(250)
// }
// home()
// sleep(500)

// className('android.widget.TextView')
// .text('锁屏')
// .depth(3)
// .findOne()
// .parent()
// .click()
// log(currentPackage())
// log(currentActivity())
// dialogs.build({
//   /* 对话框标题 */
//   title: "设定的程序即将执行",
//   /* 对话框内容 */
//   content: "请选择接下来的操作",
//   /* 确定键内容 */
//   positive: "继续",
//   /* 取消键内容 */
//   negative: "取消",
// }).on("positive", () => {
//   toast(123)
// }).on("negative", () => {
//   toast(456)
  
// }).show()
// log(121313131)
// app.launch('com.tencent.mm')
// app.startActivity({
//   packageName: "com.tencent.mm",
//   className: "com.tencent.mm.ui.LauncherUI",
// })
// let findAndAddIcon = images.read('./assets/find-and-add-icon.jpg') ||　images.read('wexinAutoLikeSport/assets/find-and-add-icon.jpg')
// log(images.matchTemplate(images.captureScreen(), bottombar).best())
// bottombar.recycle()
// while (!images.matchTemplate(images.captureScreen(), findAndAddIcon).best()) {
//   back()
//   sleep(1000)
// }
// app.startActivity({
//   packageName: "com.tencent.mm",
//   className: "com.tencent.mm.ui.LauncherUI"
// })
// log(Object.keys(global))
// while (currentActivity() !== 'com.tencent.mm.ui.LauncherUI') {
//   back()
//   sleep(500)
// }
// let meSelectedImage = images.read('./assets/me-selected.jpg') || images.read('wexinAutoLikeSport/assets//me-selected.jpg')
// let meUnselectedImage = images.read('./assets/me-unselected.jpg') || images.read('wexinAutoLikeSport/assets//me-unselected.jpg')
// let isFoundHomePage = currentActivity() === 'com.tencent.mm.ui.LauncherUI'
// while (!isFoundHomePage) {
//   for (let i = 0; !isFoundHomePage && i < 2; i++) {
//     let temp_screenCapture = images.captureScreen()
//     if (
//       images.matchTemplate(temp_screenCapture, meSelectedImage).best() ||
//       images.matchTemplate(temp_screenCapture, meUnselectedImage).best()
//     ) {
//       isFoundHomePage = true
//     } else {
//       sleep(50)
//     }
//   }

//   if (!isFoundHomePage) {
//     back()
//   }
// }

// meSelectedImage.recycle()
// meUnselectedImage.recycle()
// log(Object.keys(selector()))
// app.startActivity({
//   packageName: "com.tencent.mm",
//   action: 'VIEW',
//   className: "com.tencent.mm.plugin.exdevice.ui.ExdeviceRankInfoUI"
// })
// className('android.widget.TextView')
//   .depth(3)
//   .drawingOrder(2)
//   .text('我')
//   .waitFor()

// depth(0)
//   .packageName('com.tencent.mm')
//   .waitFor()

// log(shell("am kill com.tencent.mm", true))

// depth(0)
//   .packageName('com.tencent.mm')
//   .findOne()
// swipe(deviceWidth / 2, deviceHeight - 300, deviceWidth / 2, 0, 250)
// className('android.widget.ListView')
//   .depth(2)
//   .drawingOrder(3)
//   .findOne()
//   .scrollForward()
log(className('android.widget.RelativeLayout')
  .depth(3)
  .desc('搜索')
  .drawingOrder(2)
  .find())

toast('执行完毕')

// importPackage(java.io)
// log(new java.util.Date())

