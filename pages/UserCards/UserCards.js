// pages/UserCards/UserCards.js
import request from '../../utils/network.js';
import urls from '../../utils/urls.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id:'',
    _doorId:'',
    _uname:'',
    _openid:'',
    _noData:false,
    _cardLst : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      _id:options.uid,
      _doorId:options.doorId,
      _uname:options.uname,
      _openid:wx.getStorageSync('loginSessionKey')
    })
   wx.setNavigationBarTitle({
     title: `${this.data._uname} 的会员卡`,
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
    this.GetCardLst();
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
  onCarSend(e){
    wx.navigateTo({
      url: `../SendUserCards/SendUserCards?uid=${this.data._id}&doorId=${this.data._doorId}`,
    })
  },
  GetCardLst(){
    var _that = this;
    request({
      url:urls.Cards.GetUserDoorCards,
      method:'post',
      data:{
        openid:_that.data._openid,
        doorId:_that.data._doorId,
      }
    }).then(res=>{

      this.setData({
        _noData:res.data.length<=0,
        _cardLst:res.data
      })
    })
  },
})