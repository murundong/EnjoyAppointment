// pages/mine/mine.js
import urls  from '../../utils/urls.js';
import request from '../../utils/network.js';
const utils = require ('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _yogaImg:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=918711330,485019288&fm=26&gp=0.jpg',
    _userInfo:{},
    total_minutes:0,
    total_count:0,
    total_days:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   if(app.globalData.userInfo) 
      this.setData({
        _userInfo:app.globalData.userInfo
      })
    else{
      request({
        url:urls.data.GetUInfoByOpenId,
        data:{openid:wx.getStorageSync('loginSessionKey')}
      }).then(res=>{
        this.setData({
          _userInfo: res.data
        })
      })
    }
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
  onScanTap(e){
    utils.scan_event(e);
  }
})