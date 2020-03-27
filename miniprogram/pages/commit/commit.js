// pages/commit/commit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindTextAreaInput:function(e){
    this.data.detail = e.detail.value
  },
  send:function(e){
    var that = this
    if (that.data.detail=="")
    {
      wx.showModal({
        title: '提示',
        content: '没有信息',
        showCancel: false,
        success(res) {

        }
      
    })
    }
    else if(that.data.detail != "")
    {
      wx.showLoading({
        title: '加载中',
      })
      //服务器 处理
      const testDB = wx.cloud.database()
      var userInfo = getApp().globalData.userInfo
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000; 

      console.log(testDB)
      testDB.collection('collection').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
          // username: that.data.username,
          // phonenumber: that.data.phonenumber,
          username:userInfo.nickName,
          face_url: userInfo.avatarUrl,
          islike:0,
          content: that.data.detail,
          send_time: timestamp,
          
          total_likes:0
        
        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          setTimeout(function () {
            wx.hideLoading()
          }, 2000
          ),
          wx.navigateTo({
            url: '../square/square',
          })
        },
        fail: function (res) {
          wx.showToast({
            title: "添加失败",
            duration: 2000
          })
        },
      })

      console.log("zhuce")
    }
      console.log(that.data.detail)

      
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var appInstance = getApp()
    console.log(appInstance.globalData) 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})