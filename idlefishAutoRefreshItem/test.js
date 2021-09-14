// className('android.widget.TextView').text('锁屏').depth(3).findOne()

/* 确认选择到微信最近对话页面 */
// className('android.widget.RelativeLayout')
//   .depth(2) 
//   .findOne()
//   .findOne(
//     className('android.widget.TextView')
//       .depth(3)
//       .text('微信')
//       .waitFor())
//   .parent()
//   .click()
// log(213)
// log(currentActivity())
// log(currentPackage())
// log(Object.keys(runtime))
// powerDialog()
// quickSettings()

engines.all().slice(0).forEach((script) => {
  log(script.getSource().getName().includes(engines.myEngine().getSource().getName()))
})
