// pages/AdminUser/AdminUser.js
import request from '../../utils/network.js';
import urls from '../../utils/urls.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nick:'',
    scrollTop: 0,
    slideData:[],
    userLst:[],
    scrollTop:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.GetUserLst();
  },
  onNickInput(e){
    var input = e.detail.value;
    this.setData({
      nick:input
    })
    this.GetUserLst();
  },
  onSlideEdit(e){
    var uid = e.currentTarget.dataset.id;
    var _that = this;
    console.log(uid);
  },
  onImgShow(e){
    var src = e.currentTarget.dataset.src;
    var srcArr = new Array();
    srcArr.push(src);
    wx.previewImage({
      urls: srcArr,
      current: src
    })
  },
  onEditModel(e){
    var uid = e.currentTarget.dataset.id;
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success (res) {
        console.log(res.tapIndex)
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  },
  onPageScroll(res) {
    // this.setData({
    //   scrollTop: res.scrollTop,
    // })
    //wx.lin.setScrollTop(res.scrollTop)
  },
  GetUserLst(){
    var _that = this;
    request({
      url:`${urls.UInfo.GetUserLst_Admin}?nick=${_that.data.nick}`
    }).then(res=>{
      if(res.errCode==0){
        _that.setData({
          slideData:res.data.initials,
          userLst:res.data.uinfos
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

  }
})