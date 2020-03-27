// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    phonenumber :"",
    password:"",
    passwordack:""
  },
  usernameInput: function(e){
    this.data.username = e.detail.value
    
    
  },
  phonenumberInput:function(e){
    this.data.phonenumber = e.detail.value
  },
  passwordInput: function (e) {
    this.data.password = e.detail.value
  },
  ackInput: function (e) {
    this.data.passwordack = e.detail.value
    
  },
  register:function(e){
    var that = this
    var myreg =  /^1[3456789]\d{9}$/
    console.log(that.data)
    if (that.data.username == '') {
      wx.showModal({
        title: '提示',
        content: '用户名未输入',
        showCancel: false,
        success(res) {
          
        }
      })
    }
    else if (that.data.phonenumber == '') {
      wx.showModal({
        title: '提示',
        content: '手机号未输出',
        showCancel:false,
        success(res) {
          
        }
      })
    }
    else if (that.data.phonenumber.length != 11) {
      wx.showModal({
        title: '提示',
        content: '手机号错误输出，请重新输入',
        showCancel:false,
        
      })
    }
  
    else if (!myreg.test(that.data.phonenumber)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确手机号',
        showCancel: false,

      })
    }
    else if (that.data.password == "") {
      wx.showModal({
        title: '提示',
        content: '请输入密码',
        showCancel:false,
        success(res) {
         
        }
      })
    }
    else if (that.data.passwordack == "") {
      wx.showModal({
        title: '提示',
        content: '请二次输入密码',
        showCancel:false,
        success(res) {
          
        }
      })
    }
    else if (that.data.passwordack != that.data.password) {
      wx.showModal({
        title: '提示',
        content: '输入密码不一致',
        showCancel: false,
        success(res) {
          
        }
      })
    }
    else
    {
      const testDB = wx.cloud.database()
      
      console.log(testDB)
      testDB.collection('test').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
          username: that.data.username ,
          phonenumber: that.data.phonenumber,
          password: that.data.password,
          
          // 为待办事项添加一个地理位置（113°E，23°N）
          
        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          wx.reLaunch({
            url: '../enroll/enroll',
          })
        },
        fail: function (res) {
          wx.showToast({
            title: "添加失败",
            duration: 2000
          })},
      })

      console.log("zhuce")
    }
    
  
  },
  signin: function(e){
    wx.reLaunch({
      url: '../enroll/enroll',
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