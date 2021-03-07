// pages/Sign/Sign.js
import request from '../../utils/network.js';
import urls from '../../utils/urls.js';
const app = getApp();
const baseImgURL = app.globalData.baseImgURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _cid: '',
    UID:0,
    baseImgURL:baseImgURL,
    UserDoorCards:[],
    _showCardModel:false,
    _pageData:Object,
    AlreadAppoint:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      _cid:options.cid,
      UID:app.globalData.userInfo.uid,
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
    this.GetCourse();
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
  onSignReturn:function(){
    wx.navigateBack({
      delta: 0,
    })
  },
  GetCourse(){
    var _that = this;
    request({
      url:urls.Courses.GetSignCourse,
      data:{
        cid:_that.data._cid
      }
    }).then(res=>{
      if(res.errCode==0){
        _that.setData({
          _pageData:res.data,
          AlreadAppoint:res.data.AppointUsers.filter(x=>x.uid==10000).length>0
        })
      }
    })
  },
  GetUserCards() {
    var _that = this;
    request({
      url: urls.Lessons.GetUserCanUseDoorCards,
      method: 'post',
      data: {
        doorId: _that.data._pageData.door_id,
        uid: _that.data.UID,
      }
    }).then(res => {
      _that.setData({
        UserDoorCards: res.data
      })
    })
  },
  onCardTap(e){
    var cid = e.currentTarget.dataset.cid;
    var data = {
      course_id: this.data._cid,
      uid: this.data.UID,
      door_id: this.data._pageData.door_id,
      card_id:cid
    };
    this.AppointCourse(data);
  },
  onAppointTap(e) {
    var _that = this;
    if (_that.data._pageData.need_cards == null || _that.data._pageData.need_cards == '') {
      var data = {
        course_id: _that.data._cid,
        uid: _that.data.UID,
        door_id: _that.data._pageData.door_id,
      };
      _that.AppointCourse(data);
    }
    else {
      _that.GetUserCards();
      _that.setData({
        _showCardModel: true,
      })
    }
  },
  AppointCourse(data) {
    var _that = this;
    request({
      url: urls.Lessons.SignAppointCourse,
      method: 'post',
      data: data
    }).then(res => {
      _that.setData({
        _showCardModel: false
      })
      if (res.errCode == 0) {
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
      else {
        setTimeout(() => {
          wx.showToast({
            title: res.msg,
            icon: 'none',
          })
        }, 500);
      }
    })
  },
})