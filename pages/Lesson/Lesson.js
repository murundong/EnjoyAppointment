import {
  local_classes_type,
  local_classes
} from '../../MockData/data.js'
import request from '../../utils/network.js';
import urls from '../../utils/urls.js';
const app = getApp();
var baseURL = app.globalData.baseMVCURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: undefined,
    baseURL: baseURL,
    doorId: '',
    doorName: '',
    banners: '',
    doorAddress: '',
    doorDesc: '',
    doorMananger: '',
    doorManagerImg: '',
    doorTel: '',
    classes_type: local_classes_type,
    classes: local_classes.data.lstClasses,
    NewMessage: '场馆通知',
    startDay: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this;
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var did = options.doorId;
    request({
      url: urls.Lessons.GetDoorInfo,
      data: {
        doorid: did
      }
    }).then(res => {
      if (res.data) {
        this.setData({
          doorAddress: res.data.door_address,
          banners: res.data.banners,
          doorDesc: res.data.door_desc,
          doorMananger: res.data.door_manager,
          doorTel: res.data.door_tel,
          doorManagerImg: res.data.door_manager_img
        })
      }
    })

    this.setData({
      doorId: did,
      doorName: options.doorName,
      startDay: `${year}-${month}-${day}`
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
    this.componentCalender = this.selectComponent('#r-cal');
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
    wx.lin.flushSticky();
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

    var id = e.currentTarget.dataset.cid;
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
  },
  onOrderTap(e) {
    wx.navigateTo({
      url: `../EnsureAppointment/EnsureAppointment?doorId=${e.currentTarget.dataset.cid}`,
    })
  },
  onPageScroll(res) {
    wx.lin.setScrollTop(res.scrollTop)
    // this.setData({
    //   scrollTopHeight: res.scrollTop
    // })
  },
  onDateChange(e) {
    this.setData({
      startDay: e.detail.value
    })
    this.componentCalender.onGenerateDate(new Date(e.detail.value));
    this.componentClass.selectInit();
  },
  onPreviewImg(e) {
    var src = e.currentTarget.dataset.src;
    var srcArr = this.data.banners.map(x => this.data.baseURL + x);
    wx.previewImage({
      urls: srcArr,
      current: src
    })
  }
})