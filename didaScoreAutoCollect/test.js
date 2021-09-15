/* Autojs代码会将所有的模块合并到一个模块中执行，因此使用 const 这类变量 */
/* 声明语句时需要特别注意，在两个模块中用 const 声明同一个变量名会报错！ */
auto.waitFor()
if(!images.requestScreenCapture(false)){
  toast('请求截图权限失败')
  exit()
}

/* 当前设备的一些信息 */
let deviceWidth = device.width
let deviceHeight = device.height
let designedWidth = 1080 // 设计代码时的屏幕宽度
let designedHeight = 2248 // 设计代码时的屏幕高度

/* 设置屏幕分辨率，当前数据来源于小米 8 */
setScreenMetrics(designedWidth, designedHeight)

// console.log(className('android.widget.ImageView')
// .depth(1)
// .findOne().bounds())
// selector()
//   .className('android.widget.TextView')
//   .text('优惠券与顺风金可叠加使用')
//   .waitFor()
recents()

selector()
  .className('android.widget.TextView')
  .text('小窗应用')
  .waitFor()

sleep(500)

const didaTitleRect = selector()
  .className('android.widget.TextView')
  .text('嘀嗒出行')
  .findOne()
  .bounds()

if (didaTitleRect.centerX() > deviceWidth / 2) {
  swipe(
    didaTitleRect.centerX(),
    didaTitleRect.centerY(),
    didaTitleRect.centerX() + 1080,
    didaTitleRect.centerY(),
    200,
  )
} else {
  swipe(
    didaTitleRect.centerX(),
    didaTitleRect.centerY(),
    0,
    didaTitleRect.centerY(),
    200,
  )
}
    toastLog('完成')