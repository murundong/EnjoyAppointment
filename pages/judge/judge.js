import request from '../../utils/network.js';
import urls from '../../utils/urls.js';
const app = getApp();
const baseImgURL = app.globalData.baseImgURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _cid: 0,
    textarea_value: '',
    class_data: Object,

    baseImgURL: baseImgURL,
    rate_score1: 0,
    rate_score2: 0,
    rate_score3: 0,

    rate_status1: '',
    rate_status2: '',
    rate_status3: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ _cid: options.cid });
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
    this.GetCourseInfo();
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
  onJudgeSubmit: function (e) {
    var _that = this;
    var data = {
      uid: app.globalData.userInfo.uid,
      course_id: _that.data._cid,
      star1: _that.data.rate_score1,
      star2: _that.data.rate_score2,
      star3: _that.data.rate_score3,
      comment: _that.data.textarea_value
    };
    console.log(data);
    if (data.star1 == 0 || data.star2 == 0 || data.star3 == 0 || data.comment == '') {
      wx.showModal({
        title: '提示',
        content: '请给出至少一星，并填写文字评价哦~',
        confirmText: '确认',
        confirmColor: '#ff6f11',
        showCancel: false
      })
      return;
    }
    request({
      url: urls.Courses.JudgeCourse,
      method: 'post',
      data: data
    }).then(res => {
      if (res.errCode == 0) {
        wx.showToast({
          title: '评价成功~',
          icon: 'loading'
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 0,
          })
        }, 1000);
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })

  },
  onTextareaComplete: function (e) {
    this.setData({
      textarea_value: e.detail.value
    })
  },
  onRate1Tap: function (e) {
    this.setData({
      rate_status1: this.onGetRateStr(e.detail.score),
      rate_score1: e.detail.score
    })
  },
  onRate2Tap: function (e) {
    this.setData({
      rate_status2: this.onGetRateStr(e.detail.score),
      rate_score2: e.detail.score
    })
  },
  onRate3Tap: function (e) {
    this.setData({
      rate_status3: this.onGetRateStr(e.detail.score),
      rate_score3: e.detail.score
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
  },
  GetCourseInfo() {
    var _that = this;
    request({
      url: urls.Courses.GetJudgeCourseInfo,
      method: 'post',
      data: { cid: _that.data._cid }
    }).then(res => {
      if (res.errCode == 0) {
        _that.setData({
          class_data: res.data
        })
      }
    })
  }
})