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
```
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
```
个人信息的设置是通过将wx.login的返回值绑定到全局变量中。在全局app.js中
```
this.globalData = {
      user:{}, //后台返回用户全部信息
      userInfo :{}, //微信获取用户信息
      user_id:{}
    }

以下在制定文件.js
wx.login({
      success(res) {
        if (res.code) {
          // //发起网络请求
          // wx.request({
          //   url: 'https://test.com/onLogin',
          //   data: {
          //     code: res.code
          //   }
          // })
          wx.getSetting({
            success(res) {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: function (res) {
                    //console.log(res.userInfo)
                    getApp().globalData.userInfo = res.userInfo
                    that.next()
                  }
                })
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
```

全部树洞的获取，服务器端需要按时间倒序获取所以的记录。值得注意的是“=“号不可以触发页面更新，必须要用setdata。

```
onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    const testDB = wx.cloud.database()
  
    testDB.collection('collection').orderBy('time', 'desc').get({
      success: function (res) {
        // res.data 包含该记录的数据
        // "="不会触发页面刷新
        that.setData({
          list:res.data
        })
        // that.data.list = res.data
        console.log(that.data.list)
      },complete:function(res){
        wx.hideLoading()
      }
    })
    

  }
```
在前端只需要将列表进行渲染即可。当对树洞进行点赞的操作时，需要获取点击树洞的id，可以通过绑定data-id或者id属性即可。点赞图标的变化采用三目运算绑定数据巧妙的进行切换。
```
<block wx:for="{{列表}}" wx:for-index="idx" wx:for-item="itemName">
<image class="like" src='{{itemName.islike==1? "../../images/likeplus.png ":"../../images/like.png"}}' bindtap="upIdea" id="{{itemName._id}}" data-id="{{itemName._id}}"></image>
</block?>
```
当点赞过后，数据库中的记录需要更新。该处使用command.inc自增操作。
```
//服务器通信
          const testDB = wx.cloud.database()
          const _ = testDB.command
          testDB.collection('collection').doc(e.target.id).update({
            // data 传入需要局部更新的数据
            data: {
              // 点赞增加1
              total_likes: _.inc(1),
              islike:1
            },
            success: function (res) {
              console.log(res.data)
            }
          })
```
以此类推个人主页的设置是通过openid获取数据库的记录，删除更新同样是通过openid进行删除。

# 微信开发者工具
！创建选择带云开发的设置



# 参考教程
1. https://developers.weixin.qq.com/miniprogram/dev/framework/
2. https://blog.csdn.net/u011280778/article/details/92840364
3. https://blog.csdn.net/qiushi_1990/article/details/83015910?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task
