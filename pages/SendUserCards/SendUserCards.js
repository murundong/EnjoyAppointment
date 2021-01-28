// pages/SendUserCards/SendUserCards.js
import urls from '../../utils/urls';
import request from '../../utils/network.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _uid:'',
    _doorId:'',
    _cardTemplate:[],
    _UINFO:Object
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      _uid:options.uid,
      _doorId:options.doorId
    })
    this.GetDoorCardTemplates();
    this.GetUserCardsInfo();
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
  GetDoorCardTemplates(){
    var _that = this;
    request({
      url:urls.Cards.GetDoorCardTemplates,
      method:'post',
      data:{
        doorId:_that.data._doorId
      }
    }).then(res=>{
      _that.setData({
        _cardTemplate:res.data
      })
    })
  },
  GetUserCardsInfo(){
    var _that= this;
    request({
      url:urls.UInfo.GetUserCardsInfo,
      method:'post',
      data:{
        id:_that.data._uid
      }
    }).then(res=>{
      _that.setData({
        _UINFO:res.data
      })
    })
  }
})