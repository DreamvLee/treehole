// pages/enroll/enroll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonenumber: "",
    password: "",
  },
  phonenumberInput: function (e) {
    this.data.phonenumber = e.detail.value
  },
  passwordInput: function (e) {
    this.data.password = e.detail.value
  },
  login:function(e){
    var that = this
 
    const db = wx.cloud.database()
    const com = db.commond
    
    //详情见云开发手册command eq,lt,gt,in,and等
    //此处查询theAttrYouSearch中等于aaa的记录
    //console.log(that.data.phonenumber)
    db.collection("test").where({
      phonenumber: that.data.username
    }).get({
      //若成功获取,异步操作注意异常
      success: res => {

        
        if (res.data[0].password!=that.data.password){
          wx.showModal({
            title: '提示',
            content: '密码错误',
            showCancel: false,
            success(res) {

            }
        })}
        else{
          wx.redirectTo({
            url: '../square/square',
          })

        }
        //打印记录中第一条里goodName属性
        //console.log(res.data)
      }
    })
   

  },
  signin: function (e) {
    wx.reLaunch({
      url: '../login/login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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