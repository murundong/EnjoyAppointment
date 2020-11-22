// pages/EnsureAppointment/EnsureAppointment.js
 import {local_ensureappoint_class} from '../../MockData/data.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _doorId:0,
    // _yogaImg:'https://ss2.meipian.me/users/2229368/06bddd5b2d80400fa7d5b6eb12f60c55.jpg-mobile',
    //_yogaImg:'https://wx3.sinaimg.cn/large/a14b87edly1fk19syzerej20iw0cl0u4.jpg',
    _yogaImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606036435674&di=e61c00d9acf989c34c5f19fec0a80e99&imgtype=0&src=http%3A%2F%2Fpic.mt-bbs.com%2Fforum%2F201312%2F04%2F131519mc779dh6gzrchjkr.jpg',
    //_yogaImg:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2906162657,1788026645&fm=26&gp=0.jpg',
    _doorInfo:local_ensureappoint_class.data
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data._doorId = options.doorId;
    console.log(this.data._doorInfo);
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

  },
  onEnsureAppointment:function(e){
    wx.showToast({
      title: '预约成功~',
      duration:3000,
      icon:'loading'
    })
    setTimeout(() => {
      wx.navigateBack({
        delta: 0,
      })
    }, 1000);
  }
})