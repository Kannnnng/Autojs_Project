/* Autojs代码会将所有的模块合并到一个模块中执行，因此使用 const 这类变量 */
/* 声明语句时需要特别注意，在两个模块中用 const 声明同一个变量名会报错！ */
auto.waitFor()
if(!images.requestScreenCapture(false)){
  toast('请求截图权限失败')
  exit()
} else {
  sleep(250)
}

// className('android.widget.Button')
//   .depth(7)
//   .textContains('收集能量')
//   .find()
//   .forEach((item) => {
//     item.click()
//     sleep(250)
//   })
// className('android.widget.Button')
//   .depth(7)
//   .textContains('收集能量')
//   .find()
//   .forEach((item) => {
//     let bounds = item.bounds()
//     click(bounds.centerX(), bounds.centerY())
//     sleep(250)
//   })
// let energyIcon = images.read('assets/energy-icon.jpg') || images.read('alipayForestAutoCollect/assets/energy-icon.jpg')
// // images.matchTemplate(images.captureScreen(), energyIcon, { region: [0, 430, 1080, 630] }).points.filter((point, index, points) => !points.some((_point, _index) => _index < index && _point.x === point.x && _point.y === point.y)).sort((prev, next) => prev.y - next.y).forEach((point) => {
// //   click(point.x + 60, point.y - 40)
// //   sleep(250)
// // })
// let point = images.findColor(images.captureScreen(), '#CFFF5E', { region: [0, 430, 1080, 630] })
// click(point.x, point.y)

// energyIcon.recycle()
// let point
// while (point = images.findColor(images.captureScreen(), '#CFFF5E', { region: [0, 430, 1080, 630] })) {
//   click(point.x, point.y)
//   sleep(250)
// }
// let pickableIcon = images.read('assets/pickable-icon.jpg') || images.read('alipayForestAutoCollect/assets/pickable-icon.jpg')
// images.matchTemplate(images.captureScreen(), pickableIcon, { region: [950, 0] }).points.filter((point, index, points) => !points.some((_point, _index) => _index < index && _point.x === point.x && _point.y === point.y)).sort((prev, next) => prev.y - next.y).forEach((point) => {
//   click(point.x - 100, point.y + 80) // 这里的偏移是手动测量后设置的

//   className('android.widget.TextView')
//     .depth(1)
//     .textContains('的蚂蚁森林')
//     .waitFor()
//   sleep(250)
  
//   let energyPoint
//   while (energyPoint = images.findColor(images.captureScreen(), ENERGY_BALL_IDENTIFY_COLOR, { region: [0, 430, 1080, 630] })) {
//     click(energyPoint.x, energyPoint.y)
//     sleep(250)
//   }

//   back()
//   className('android.widget.TextView')
//     .depth(1)
//     .text('蚂蚁森林')
//     .waitFor()
//   sleep(250)
// })
// pickableIcon.recycle()
// const ENERGY_BALL_IDENTIFY_COLOR = '#CFFF5E'
// let energyPoint
// while (energyPoint = images.findColor(images.captureScreen(), ENERGY_BALL_IDENTIFY_COLOR, { region: [0, 430, 1080, 630] })) {
//   click(energyPoint.x, energyPoint.y)
//   sleep(250)
// }

// app.startActivity({
//   packageName: 'com.eg.android.AlipayGphone',
//   action: "VIEW",
//   data: "alipayqr://platformapi/startapp?saId=60000002"
// })
// const ENERGY_BALL_IDENTIFY_COLOR_1 = '#F4FFDD'
// const ENERGY_BALL_IDENTIFY_COLOR_2 = '#C4F949'
// const ENERGY_BALL_IDENTIFY_COLOR_3 = '#CFFF5E'
// let point
// while (point = images.findMultiColors(images.captureScreen(), ENERGY_BALL_IDENTIFY_COLOR_1, [
//   [194, -9, ENERGY_BALL_IDENTIFY_COLOR_2],
//   [105, 41, ENERGY_BALL_IDENTIFY_COLOR_3],
// ], { region: [0, 430, 1080, 630] })) {
//   log(point)
//   click(point.x, point.y)
//   sleep(250)
// }

// let energyIcon = images.read('assets/energy-icon.jpg') || images.read('alipayForestAutoCollect/assets/energy-icon.jpg')
// log(images.matchTemplate(images.captureScreen(), energyIcon, { region: [0, 430, 1080, 630], threshold: 0.5 }).matches)
// images.matchTemplate(images.captureScreen(), energyIcon, { region: [0, 430, 1080, 630], threshold: 0.6 }).points.filter((point, index, points) => !points.some((_point, _index) => _index < index && _point.x === point.x && _point.y === point.y)).sort((prev, next) => prev.y - next.y).forEach((point) => {
//   click(point.x + 60, point.y - 50)
//   sleep(250)
// })
// energyIcon.recycle()
// engines.all().slice(1).forEach((script) => {
//   if (script.getSource().getName().includes(engines.myEngine().getSource().getName())) {
//     script.forceStop()
//     sleep(250)
//   }
// })
// let thread = threads.start(function() {
//   setTimeout(function() {
//     toast(123)
//     engines.myEngine().forceStop()
//   }, 30000)
// })

// thread.waitFor()
// toast(new Date())
// textContains('被能量罩保护')
//   .findOne()

// events.observeToast()
// events.onToast(function(toast){
//   log("Toast内容: " + toast.getText() + " 包名: " + toast.getPackageName());
// });

// let i = 0

// while (++i < 5) console.log(i)
// let energyBallIcon = images.read('assets/energy-ball.jpg') || images.read('alipayForestAutoCollect/assets/energy-ball.jpg')
// images.matchTemplate(images.captureScreen(), energyBallIcon, { region: [0, 430, 1080, 630], threshold: 0.5 }).points.filter((point, index, points) => !points.some((_point, _index) => _index < index && _point.x === point.x && _point.y === point.y)).sort((prev, next) => prev.y - next.y).forEach((point) => {
//   log(point)
// })
// log(images.matchTemplate(images.captureScreen(), energyBallIcon, { region: [0, 430, 1080, 630], threshold: 0.5 }).matches)
// toastLog('已经进入蚂蚁森林')  
/* 通过识别能量球图像来点击相对应位置 */
// let energyBallIcon = images.read('assets/energy-ball.jpg') || images.read('alipayForestAutoCollect/assets/energy-ball.jpg')
// let energyBallIconWidth = energyBallIcon.getWidth()
// let energyBallIconHeight = energyBallIcon.getHeight()

// images.matchTemplate(images.captureScreen(), energyBallIcon, { region: [0, 430, 1080, 630], threshold: 0.8 }).points.filter((point, index, points) => !points.some((_point, _index) => _index < index && _point.x === point.x && _point.y === point.y)).sort((prev, next) => prev.y - next.y).forEach((point) => {
//   press(point.x, point.y, 250)
//   sleep(250)
// })

// className('android.support.v7.widget.RecyclerView')
//       .depth(2)
//       .findOne()
//       .scrollForward()
// className('android.webkit.WebView')
//       .depth(5)
//       .findOne(500)
//       .scrollForward()
click(290, 1515)
sleep(50)
click(790, 1515)
sleep(50)
click(290, 1515)
sleep(50)
click(790, 1515)
sleep(50)
// click(289, 1516)

toast('执行完成')
