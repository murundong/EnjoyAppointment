// pages/Lesson/Lesson.js
import { local_classes_type, local_classes } from '../../MockData/data.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    DoorId: 200,
    doorName:local_classes.data.doorName,
    st: '2020/11/11',
    classes_type: local_classes_type,
    classes: local_classes.data.lstClasses,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      DoorId: options.doorId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.componentClass = this.selectComponent('#comp-class');
    wx.setNavigationBarTitle({
      title: this.data.doorName,
    })
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
    console.log('onPullDownRefresh');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onCanlenderItemTap(e) {
    console.log(e.detail.citem);
    this.componentClass.selectInit();
    // wx.lin.flushSticky();
    wx.pageScrollTo({
      scrollTop: 0
    })

  },
  onTopbarItemTap(e) {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  onFullTap(e) {
    wx.showToast({
      title: '已预约过了哟！',
    })
  },
  onOrderTap(e) {
    wx.navigateTo({
      url: `../EnsureAppointment/EnsureAppointment?doorId=${e.currentTarget.dataset.cid}`,
    })
  }, 
  onPageScroll(res) {
   
  },

})