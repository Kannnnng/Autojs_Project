# Autojs_Project"

这是一个个人用来学习练习 Auto.js 的项目，同时存放一些小程序和小脚本。

## idlefishAutoRefreshItem

闲鱼 APP 中自动擦亮目前在架上的商品

## weixinAutoLikeSport

微信 APP 中微信运动自动点赞目前关注的人（只点赞关注的人，不点赞排行榜上的其他人）

## 代码编写注意事项
1.不支持变量的块作用域
2.正则表达式好像不支持开头和结尾符号
3.正则表达式不支持前后断言
4.depth 搜索条件不靠谱，因为只要上层有一个变化了，其内部的所有元素的 depth 都会变化，尽量避免使用
5.同样尽量避免使用的是 drawingOrder，但相对 depth 更靠谱一点