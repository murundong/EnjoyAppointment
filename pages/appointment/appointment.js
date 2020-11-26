// pages/appointment/appointment.js
import {local_classes,local_com_classes} from '../../MockData/data.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wait_classes:local_classes.data.lstClasses,
    comp_classes:local_com_classes.data,
    default_expand:['comp-0']
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
    console.log(this.data.wait_classes);
    console.log(this.data.comp_classes);
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
    console.log('onReachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onTabChange(e){
   console.log(e);
  },
  onJudge(e){
    var cid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../judge/judge?cid=${cid}`,
    })
  },
  onCancelAppointment(e){
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.showModal({
      title: '提示',
      content: '确定要取消预约吗？',
      success: function (res) {
        if (res.confirm) {
            // 用户点击了确定 可以调用删除方法了
          }
        }
      })
  }
})