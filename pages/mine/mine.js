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
    total_days:0,
    ISAUTH:false,
    HasAdminMenu:false,
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
    var _that = this;
    if (app.globalData.userInfo)
     {
      this.setData({
        _userInfo: app.globalData.userInfo,
        ISAUTH: app.globalData.userInfo != null
      })
     }
 
    request({
      url: urls.data.GetUInfoByOpenId,
      data: { openid: wx.getStorageSync('loginSessionKey') }
    }).then(res => {
      _that.setData({
        _userInfo: res.data,
      })
      if(_that.data.ISAUTH) _that.CheckUserHasManageMenu();
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
  onScanTap(e){
    utils.scan_event(e);
  },
  CheckUserHasManageMenu(){
    var _that = this;
    request({
      url:urls.UInfo.CheckUserHasManageMenu,
      method:'post',
      data:{
        uid:_that.data._userInfo.uid
      }
    }).then(res=>{
      _that.setData({
        HasAdminMenu:res.data
      })
    })
  },
  OnGetUserInfo(e){
    wx.getSetting({
      success: res_setting => {
        if (res_setting.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res_uinfo => {
              wx.request({
                url: app.globalData.baseURL + urls.data.UpdateUserInfoHome,
                method: 'post',
                data: {
                  'nick_name': res_uinfo.userInfo.nickName,
                  'avatar': res_uinfo.userInfo.avatarUrl,
                  'gender': res_uinfo.userInfo.gender,
                  'open_id': wx.getStorageSync('loginSessionKey')
                },
                success:function(res_saved){
                  if(res_saved.data.errCode==0){
                    app.globalData.userInfo = res_saved.data.data
                    wx.reLaunch({
                      url: '/pages/mine/mine',
                    })
                  }
                }
              })
              if (app.userInfoReadyCallback) {
                app.userInfoReadyCallback(res_setting)
              }
            }
          })
        }
      }
    })
  }
})