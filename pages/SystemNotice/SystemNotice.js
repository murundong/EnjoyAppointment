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
    LstNotices:[],
    showNoStatus:false,

    _showModel:false,
    _showModelId:0,
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
    this.GetNotices();
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
    if(_that.data.pageIndex<= _that.data.pageTotal){
      _that.data.pageIndex++;
      _that.GetNotices(false);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onItemTap(e){
    this.setData({
      _showModelId:e.currentTarget.dataset.id,
      _showModel:true,
    })
  },
  onNoticeAdd(){
    wx.navigateTo({
      url: `../SystemNoticeAdd/SystemNoticeAdd`,
    })
  },
  onEditNotice(){
    wx.navigateTo({
      url: `../SystemNoticeAdd/SystemNoticeAdd?noticeId=${this.data._showModelId}`,
    })
  },
  onDeleteNotice(){
    var _that = this;
    wx.showModal({
      title:'提示',
      content:'确认删除该条公告么！',
      confirmText:'确认',
      confirmColor:'#ff6f11',
      success(res){
        if (res.confirm) {
          _that.DeleteNotice();
        } 
      }
    })
  },
  DeleteNotice(){
    var _that =this;
    request({
      url:urls.Notice.DeleteNotice,
      data:{id:_that.data._showModelId}
    }).then(res=>{
      if(res.errCode==0){
        wx.showToast({
          title: '删除成功！',
        })
       setTimeout(() => {
        _that.GetNotices();
       }, 500);
      }
      else{
        setTimeout(() => {
          wx.showToast({
            title: res.msg,
          })
        }, 500);
      }
    })
  },
  GetNotices(flag=true){
    var _that = this;
    if(flag) _that.setData({pageIndex:1});
    request({
      url:urls.Notice.GetNotice,
      method:'post',
      data:{
        page_index:_that.data.pageIndex,
        page_size:_that.data.pageSize,
      }
    }).then(res=>{
      if(res.errCode==0){
        _that.setData({
          LstNotices:!flag
              ?_that.data.LstNotices.concat(res.data.data)          
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