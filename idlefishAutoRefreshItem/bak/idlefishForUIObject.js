// auto.waitFor()

// /* 尽量回退到最初的状态 */
// for (let i = 0; i < 5; i++) {
//   back() // Back()函数和back()函数区别是前者需要ROOT权限，后者不需要
//   sleep(500)
// }

const deviceWidth = device.width
const deviceHeight = device.height

/* 设置屏幕分辨率，当前数据来源于小米 8 */
setScreenMetrics(1080, 2248)

/* 使用这种方法只能正常启动 APP，但不能直接跳转到指定页面 */
launch('com.taobao.idlefish')
waitForPackage('com.taobao.idlefish')
app.launch('com.taobao.idlefish')
waitForPackage('com.taobao.idlefish')

className('android.widget.RelativeLayout')
  .depth(1)
  .drawingOrder(6)
  .descContains('我的')
  .findOne()
  .click()

textContains('我发布的')
  .findOne()
  .click()
const scrollContainer = className('android.support.v7.widget.RecyclerView')
  .depth(1)
  .findOne()

const itemRegExp = /价格\d+.*?留言\d+.*?浏览\d+/
const flushedItemRowIndexs = []

while (true) {
  scrollContainer
    .find(className('android.widget.FrameLayout').depth(3))
    .filter((item) => itemRegExp.test(item.desc()))
    .forEach((item) => {
      const itemRowIndex = item.parent().row()

      if (flushedItemRowIndexs.indexOf(itemRowIndex) !== -1) return
      else flushedItemRowIndexs.push(itemRowIndex)
      
      item.findOne(className('android.view.View').descContains('擦亮')).click()
      sleep(500)
    })

  if (scrollContainer
    .find(className('android.widget.FrameLayout').depth(2))
    .some((item) => item.boundsInParent().height() < 150 && item.boundsInParent().height() > 140)) break
  else swipe(deviceWidth / 2, deviceHeight * 2 / 3, deviceWidth / 2, 0, 1000)

  sleep(2000)
}
 
toast('所有商品全部被擦亮!')
