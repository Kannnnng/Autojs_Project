# Autojs_Project

这是一个个人用来学习练习 Auto.js 的项目，同时存放一些小程序和小脚本。

## alipayForestAutoCollect

蚂蚁森林自动收集能量，推荐配合 Auto.js 多设置几个每天早上的自动任务

## alipayScoreAutoCollect

支付宝自动收集积分

## didaScoreAutoCollect

滴答出行自动收集天天福利的奖励金

## dingdingReceiveMessageSelect

钉钉自用

## idlefishAutoRefreshItem

闲鱼自动擦亮上架物品，已经有段时间没更新

## utils

一些常用的工具函数

## wexinAutoLikeSport

微信运动自动点赞关注的人，没关注的人不点赞

## wexinOrganizeContacts

微信联系人标签整理自用

## xiaomiAutoReboot

小米手机自动重启

## xiaomiAutoRestoreSound

小米手机自动恢复铃声

## 代码编写注意事项
不支持变量的块作用域
正则表达式好像不支持开头和结尾符号
正则表达式不支持前后断言
depth 搜索条件不靠谱，因为只要上层有一个变化了，其内部的所有元素的 depth 都会变化，尽量避免使用
同样尽量避免使用的是 drawingOrder，但相对 depth 更靠谱一点