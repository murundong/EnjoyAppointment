// pages/MyDoors/MyDoors.js
import urls from '../../utils/urls';
import request from '../../utils/network.js';
const app = getApp();
var baseURL= app.globalData.baseMVCURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseURL:baseURL,
    Doors:[]
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
    request({
      url:urls.data.GetTeacherDoors,
      method:'post',
      data:{open_id:wx.getStorageSync('loginSessionKey')}
    }).then(res=>{
      if(res.errCode==0){
        this.setData({
          Doors:res.data
        })
      }
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
  onDoorAdd(e){
    wx.navigateTo({
      url: '../AddDoor/AddDoor',
    })
  },
  onDoorTap(e){
    var _that = this;
    var doorId = e.currentTarget.dataset.id;
    var doorName = e.currentTarget.dataset.name;
    //'../Manage/Manage?doorId='+doorId,
    wx.navigateTo({
      url: `../Manage/Manage?doorId=${doorId}&doorName=${doorName}`
    })
  }
})