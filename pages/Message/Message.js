import urls from '../../utils/urls';
import request from '../../utils/network.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex:1,
    pageSize:10,
    pageTotal:'',

    showNoStatus:false,
    msgLst:[]
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
    this.GetNotice();
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
    var _that = this;
    if(_that.data.pageIndex< _that.data.pageTotal){
      _that.data.pageIndex++;
      _that.GetNotice(false);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  GetNotice(flag=true){
    var _that = this;
    if(flag) _that.setData({pageIndex:1});
    request({
      url:urls.Notice.GetUsersNoticeBox,
      method:'post',
      data:{
        page_index:_that.data.pageIndex,
        page_size:_that.data.pageSize,
        uid:app.globalData.userInfo.uid,
      }
    }).then(res=>{
      if(res.errCode==0){
        _that.setData({
          msgLst:!flag
              ?_that.data.msgLst.concat(res.data.data)          
              :res.data.data,
          pageTotal:Math.floor(res.data.total /_that.data.pageSize),
          showNoStatus:res.data.total<=0
        })
      }
      else{
        setTimeout(() => {
          wx.showToast({
            title: res.msg,
          })
        }, 500);
      }
    })
  }
})