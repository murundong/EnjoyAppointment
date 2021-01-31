// pages/Card/Card.js
// import {local_card_info} from '../../MockData/data.js'
import request from '../../utils/network.js';
import urls from '../../utils/urls.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _cardLst : [] ,//local_card_info.data
    _openid:'',
    _cardType:0,
    _noData:false,
    baseImgURL:app.globalData.baseImgURL,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      _openid:wx.getStorageSync('loginSessionKey')
    })
    this.GetCardLst();
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
  onTabChange: function (e) {
    var index= e.detail.currentIndex;
    this.setData({
      _cardType:index
    })
    this.GetCardLst();
  },
  GetCardLst(){
    var _that = this;
    request({
      url:urls.Cards.GetUserCards,
      method:'post',
      data:{
        openid:_that.data._openid,
        cardStatus:_that.data._cardType
      }
    }).then(res=>{
      _that.setData({
        _noData:res.data.length<=0,
        _cardLst:res.data
      })
    })
  }
})