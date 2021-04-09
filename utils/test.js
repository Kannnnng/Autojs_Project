/* Autojs代码会将所有的模块合并到一个模块中执行，因此使用 const 这类变量 */
/* 声明语句时需要特别注意，在两个模块中用 const 声明同一个变量名会报错！ */
auto.waitFor()
if(!images.requestScreenCapture(false)){
  toast('请求截图权限失败')
  exit()
}

/* 引入工具箱 */
let utils
try {
  utils = require('utils/main.js')
} catch (e) {
  utils = require('../utils/main.js')
}

/* 防止当前代码被重复执行 */
utils.stopRepeatExecution()

/* 解锁设备 */
// utils.unlockDevice()

/* 当前设备的一些信息 */
let deviceWidth = device.width
let deviceHeight = device.height
let designedWidth = 1080 // 设计代码时的屏幕宽度
let designedHeight = 2248 // 设计代码时的屏幕高度

/* 设置屏幕分辨率，当前数据来源于小米 8 */
setScreenMetrics(designedWidth, designedHeight)

// toastLog(1)
// toastLog(2)

// log(engines.all())
// sleep(2 * 60 * 1000)
// const meBottomButten = className("android.support.v7.widget.RecyclerView").findOne()

// meBottomButten.children().forEach((item) => {
//   console.log(item.boundsInScreen)
// })

// toastLog(app.autojs.versionName)
// toastLog(app.getPackageName('闲鱼'))
// app.openAppSetting('com.taobao.idlefish')
// app.viewFile("/sdcard/1.txt")
// toastLog(currentPackage())
// toastLog(currentActivity())
// app.startActivity("com.taobao.fleamarket.home.activity.MainActivity")
// waitForPackage("com.tencent.mm")
// waitForActivity("com.taobao.fleamarket.home.activity.MainActivity")
// toastLog(123456)
// console.show()
// console.log(2131313)
// console.log(device.width)
// console.log(device.height)
// console.log(device.device)
// console.log(device.model)
// toast(device.setBrightness(200))
// toastLog(device.getMusicVolume())
// toastLog(device.getNotificationVolume())
// toastLog(device.getAlarmVolume())
// toastLog(device.getBattery())
// toastLog(device.getTotalMem())
// toastLog(device.getAvailMem())
// toastLog(device.wakeUp())
// device.vibrate(100) // 使设备振动
// alert(123456)
// toastLog(confirm("要清除所有缓存吗?"))
// alert("出现错误~", "出现未知错误，请联系脚本作者")
// var name = rawInput("请输入您的名字", "小明");
// alert("您的名字是" + name);
// var options = ["选项A", "选项B", "选项C", "选项D"]
// var i = dialogs.singleChoice("请选择一个选项", options);
// if(i >= 0){
//     toast("您选择的是" + options[i]);
// }else{
//     toast("您取消了选择");
// }
// dialogs.build({
//   //对话框标题
//   title: "发现新版本",
//   //对话框内容
//   content: "更新日志: 新增了若干了BUG",
//   //确定键内容
//   positive: "下载",
//   //取消键内容
//   negative: "取消",
//   //中性键内容
//   neutral: "到浏览器下载",
//   //勾选框内容
//   checkBoxPrompt: "不再提示"
// }).on("positive", ()=>{
//   //监听确定键
//   toast("开始下载....");
// }).on("neutral", ()=>{
//   //监听中性键
//   app.openUrl("https://www.autojs.org");
// }).on("check", (checked)=>{
//   //监听勾选框
//   log(checked);
// }).show();

// var d = dialogs.build({
//   title: "下载中...",
//   progress: {
//       max: -1
//   },
//   cancelable: false
// }).show();

// setTimeout(()=>{
//   d.dismiss();
// }, 3000);
//请求截图
// if(!requestScreenCapture()){
//   toast("请求截图失败");
//   exit();
// }

// files.ensureDir('/sdcard/000/')
// captureScreen("/sdcard/000/1.png");

// powerDialog()
// notifications()
// quickSettings()
// recents()
// Power()
// Text("aaa")
// scrollUp()
// scrollDown(1)

// log(textMatches(/微信\(\d+\)/).findOne())
// log(className('android.widget.ListView').depth(3).findOne().children())



/* 等待确认启动无障碍服务 */
// auto.waitFor()

/* 启动闲鱼APP */
// app.launch('com.taobao.idlefish')


// let a = 4
// while (a--) {
//   console.log(a)
// }
// className('android.widget.TextView')
//       .text('锁屏')
//       .findOne()
//       .parent()
//       .click()

const host = '98.142.140.48'
  const part = 7001
  const path = '/autojs/isLost'

console.log(http.get(host + ':' + part + path).body.string() === 'true');