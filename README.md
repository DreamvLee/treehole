# treehole

学习学堂在线课程  
https://next.xuetangx.com/learn/THU0809102418/THU0809102418/2300843/video/1646838

# wxml和wxss编写
树洞原型图是根据视频中所讲一步步写的。
# 服务器
服务器是采用微信云开发编写的。该部分与教学视频中自己建立服务器不一样，使用了云开发的一些简单的API达到了相同的效果。
分为以下三个大部分。

1. 发布新树洞接口
2. 广场接受全部树洞接口
3. 个人主页接口

# 重点代码

云函数获取openid，openid唯一标识的属性在数据库中充当主键的作用。每个微信用户都有一个唯一的openid。在微信小程序中，不需要通过wx.login等API获取openid。
‘’‘
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openId: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
’‘’


# 微信开发者工具
创建选择带云开发的设置



# 参考教程
1. https://developers.weixin.qq.com/miniprogram/dev/framework/
2. https://blog.csdn.net/u011280778/article/details/92840364
3. https://blog.csdn.net/qiushi_1990/article/details/83015910?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task
