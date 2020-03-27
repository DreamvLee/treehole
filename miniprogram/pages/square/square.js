// pages/square/square.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstcolor:'black',
    secondcolor:'#979797',
    list:{}
    

  },
  second_select: function (e) {
    wx.navigateTo({
      url: '../commit/commit',
    })

  },
  third_select: function (e) {
    wx.redirectTo({
      url: '../mine/mine',
    })

  },
  parseData:function(e){
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时  
    var h = date.getHours();
    //分  
    var m = date.getMinutes();
    //秒  
    var s = date.getSeconds();

    console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s); 

  },
  upIdea:function(e){
    console.log(e)
    var that = this
    var showdata = that.data.list
    console.log("id of like:",e.target.id)
    for (var i =0;i<showdata.length;i++){
      if (showdata[i]._id == e.target.id){
        console.log("我执行了111")
        if (showdata[i].islike ==1){
          wx.showModal({
            title: '提示',
            content: '您已经点赞过了~',
            showCancel:false,
            success(res){},
          })
        }
        else {
          console.log("我执行了")
          showdata[i].islike=1
          showdata[i].total_likes++
          that.setData({ list: showdata})

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

        }
      }
    }


    

  },
  /**
   * 生命周期函数--监听页面加载
   */
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