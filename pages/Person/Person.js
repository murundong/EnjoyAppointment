// pages/Person/Person.js
import urls from '../../utils/urls.js';
import request from '../../utils/network.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    age:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    request({
      url:urls.data.GetUInfoByOpenId,
      data:{openid:wx.getStorageSync('loginSessionKey')}
    }).then(res=>{
      this.setData({
        userInfo: res.data
      })
      if(this.data.userInfo.birthday){
        var birth=this.data.userInfo.birthday;
        this.setData({
          age:new Date().getFullYear()-new Date(birth).getFullYear()
        })
      }
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
  onNameiput(e){
    this.data.userInfo.real_name=e.detail.value;
  },
  onTeliput(e){
    this.data.userInfo.tel=e.detail.value;
  },
  bindBirthChange(e){
    this.data.userInfo.birthday=e.detail.value;
    let _age = new Date().getFullYear()-new Date(e.detail.value).getFullYear();
    this.data.userInfo.age=_age;
    this.setData({
      age:_age,
      userInfo:this.data.userInfo
    })
  },
  onSaveInfo(e){
    request({
      url:urls.process.UpdateUInfoSetting,
      method:'post',
      data:{
        'open_id':this.data.userInfo.open_id,
        'nick_name': this.data.userInfo.nick_name,
        'gender': this.data.userInfo.gender,
        'avatar': this.data.userInfo.avatar,  
        'tel': this.data.userInfo.tel,
        'real_name': this.data.userInfo.real_name,
        'birthday': this.data.userInfo.birthday
      }
    }).then(res=>{
      if(res.errCode==0){
        wx.showToast({
          title: '保存成功',
        })
        app.globalData.userInfo  = res.data;
      }else{
        wx.showToast({
          icon:'none',
          title: '保存失败！'+res.msg,
        })
      }
    })
  },
})