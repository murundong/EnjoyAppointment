// pages/Manage/Manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _doorId:'',
    _doorName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var doorId = options.doorId;
    var doorName = options.doorName;
    this.setData({
      _doorId:doorId,
      _doorName:doorName
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
    wx.setNavigationBarTitle({
      title: this.data._doorName,
    })
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

  },
  onGridTap(e){
    var _that = this;
    switch(e.detail.index){
      case 0:
        {
          wx.navigateTo({
            url: '../AddDoor/AddDoor?doorId='+_that.data._doorId,
          })
        }
        break;
        case 1:
        {

        }
        break;
        case 2:
        {
          wx.navigateTo({
            url: `../Subjects/Subjects?doorId=${_that.data._doorId}&doorName=${_that.data._doorName}`,
          })
        }
        break;
        case 3:
        {
          wx.navigateTo({
            url: `../Course/Course?doorId=${_that.data._doorId}&doorName=${_that.data._doorName}`,
          })
        }
        break;
        case 4:
        {
          wx.navigateTo({
            url: `../CardTemplate/CardTemplate?doorId=${_that.data._doorId}&doorName=${_that.data._doorName}`,
          })
        }
        break;
        case 5:
        {
         
        }
        break;
        case 6:
        {

        }
        break;
      default:
        break;
    }
  }
})