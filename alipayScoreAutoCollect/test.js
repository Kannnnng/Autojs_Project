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

// const icon = images.read('assets/member.jpg') || images.read('alipayScoreAutoCollect/assets/member.jpg')

// console.log(icon.getWidth())
// console.log(icon.getHeight())

/* 在停止之前先返回到桌面 */
// className('android.view.View')
//   .textMatches(/点击领取|可用积分/)
//   .waitFor()

// files.write('./编码测试文件.txt', 'resultString这是一段中文，测试通用的这是一段中文，测试通用的这是一段中文，测试通用的这是一段中文，测试通用的这是一段中文，测试通用的12313131314141424342这是一段中文，测试通用的这是一段中文，测试通用的这是一段中文，测试通用的这是一段中文，测试通用的', 'gb2312')
// const memberIcon = images.read('assets/member.jpg') || images.read('alipayScoreAutoCollect/assets/member.jpg')
// console.log(images.matchTemplate(images.captureScreen(), memberIcon, { region: [0, 0, 1080, 780], threshold: 0.95 }))

// log(className('android.view.View').textContains('赚取更多积分').findOne().click)
// log(className('android.view.View').textContains('赚取更多积分').findOne().clickable())
const memberIcon = images.read('assets/member.png') || images.read('alipayScoreAutoCollect/assets/member.png')
console.log(images.findImage(images.captureScreen(), memberIcon, { region: [0, 0, 1080, 700], threshold: 0.95 }))

toastLog('完成')
