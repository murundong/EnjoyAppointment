// pages/judge/judge.js

import {local_rate_class} from '../../MockData/data.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _cid:0,
    textarea_value:'',
    class_data:local_rate_class.data,

    rate_score1:0,
    rate_score2:0,
    rate_score3:0,

    rate_status1:'',
    rate_status2:'',
    rate_status3:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._cid = options.cid;
    
    
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
  onJudgeSubmit:function(e){
    var res=new Object();
    res.rate1 = this.data.rate_score1;
    res.rate2 = this.data.rate_score2;
    res.rate3 = this.data.rate_score3;
    res.content = this.data.textarea_value
    wx.showToast({
      title: '评价成功~',
      duration:3000,
      icon:'loading'
    })
    setTimeout(() => {
      wx.navigateBack({
        delta: 0,
      })
    }, 1000);
  },
  onTextareaComplete:function(e){
    this.setData({
      textarea_value:e.detail.value
    })
  },
  onRate1Tap:function(e){
    this.setData({
      rate_status1:this.onGetRateStr(e.detail.score),
      rate_score1:e.detail.score
    })
  },
  onRate2Tap:function(e){
    this.setData({
      rate_status2:this.onGetRateStr(e.detail.score),
      rate_score2:e.detail.score
    })
  },
  onRate3Tap:function(e){
    this.setData({
      rate_status3:this.onGetRateStr(e.detail.score),
      rate_score3:e.detail.score
    })
  },
  onGetRateStr: function (score) {
    switch (score) {
      case 0:
      case 1:
      case 2:
        return '吐槽';
      case 3:
        return '一般';
      case 4:
        return '满意';
      case 5:
        return '非常满意'
      default:
          return ''
    }
  }
})