// pages/Person/Person.js
import {local_personal_data} from '../../MockData/data.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:local_personal_data.data,
    tel:local_personal_data.data.tel,
    age:local_personal_data.data.age
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
  onTeliput(e){
    this.setData({
      tel:e.detail.value
    })
  },
  onAgeiput(e){
    this.setData({
      age:e.detail.value
    })
  },
  onSaveInfo(e){
    //console.log(JSON.parse(this.data.userInfo));
    console.log(this.data.userInfo,this.data.tel,this.data.age);
  }
})