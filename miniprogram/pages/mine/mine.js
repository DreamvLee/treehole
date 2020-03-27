// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  /**
   * 页面的初始数据
   */
  
  data: {
    
    secondcolor: 'black',
    firstcolor: '#979797',
    id: '',
    list:{},

  },
  first_select: function (e) {
    wx.navigateTo({
      url: '../square/square',
    })

  },
  second_select: function (e) {
    wx.navigateTo({
      url: '../commit/commit',
    })

  },
  delete_idea:function(e){

    console.log(e)
    const testDB = wx.cloud.database()
    const _ = testDB.command
    testDB.collection('collection').doc(e.target.id).remove({
    
      success: function (res) {
        wx.showModal({
          title: '提示',
          content: '删除成功',
          showCancel: false,

        })
        console.log(res.data)
      }
    })

  },
  getOpenid() {
    let that = this;

    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {


        var openId = res.result.openId;
        that.setData({
          id: openId
        })
        

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

    wx.showLoading({
      title: '加载中',
    })
    var that = this
    that.getOpenid()
    const testDB = wx.cloud.database()
    
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {


        var openId = res.result.openId;
        testDB.collection('collection').where({ _openid: openId })
          .orderBy('time', 'desc')
          .get({
            success: function (res) {
              // res.data 包含该记录的数据
              // "="不会触发页面刷新
              that.setData({
                list: res.data
              })
              // that.data.list = res.data
              console.log(that.data.list)
            }, complete: function (res) {
              wx.hideLoading()
            }, fail: function (e) {
              wx.hideLoading(),
                console.log('网络不好')
            }
          })


      }
    })
    




  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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