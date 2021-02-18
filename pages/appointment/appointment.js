// pages/appointment/appointment.js
import {local_classes,local_com_classes} from '../../MockData/data.js';
import request from '../../utils/network.js';
import urls from '../../utils/urls.js';
const app = getApp();
const baseImgURL = app.globalData.baseImgURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SelectTabs:0,
    baseImgURL:baseImgURL,
    pageIndex_wait:1,
    pageSize_wait:10,
    pageTotal_wait:'',
    _showWaitModel:false,

    pageIndex_comp:1,
    pageSize_comp:10,
    pageTotal_comp:'',
    _showCompModel:false,

    wait_classes:[], //local_classes.data.lstClasses,
    comp_classes:[], //local_com_classes.data,
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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(app.globalData.userInfo==null){
      wx.showModal({
        title:'提示',
        content:'该小程序需要用户授权后方可使用所有功能，请切换到 “我的” 点击授权,或稍后重试！',
        confirmText:'确认',
        confirmColor:'#ff6f11',
        success(res){
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/mine/mine',
            })
          } 
        }
      })
      return;
    }
    if(this.data.SelectTabs==0){
      this.GetWaitCourses();
    }
    else{
      this.GetCompCourses();
    }
    
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
    if(_that.data.SelectTabs==0){
      if(_that.data.pageIndex_wait > _that.data.pageTotal_wait){
        
      }
      else
      {
        _that.data.pageIndex_wait++;
        _that.GetWaitCourses(false);
      } 
        
    }
    else{
      if(_that.data.pageIndex_comp > _that.data.pageTotal_comp){
        
      }
      else{
        _that.data.pageIndex_comp++;
        _that.GetCompCourses(false);
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onTabChange(e){
   this.setData({
     SelectTabs:e.detail.currentIndex
   })
   if(e.detail.currentIndex==0){
    this.GetWaitCourses();
   }
   else{
    this.GetCompCourses();
   }
  },
  onJudge(e){
    var cid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../judge/judge?cid=${cid}`,
    })
  },
  onCancelAppointment(e){
    var _that = this;
    var cid = e.currentTarget.dataset.id;
    var data = {
      courseid:cid,
      uid:app.globalData.userInfo.uid,
    };
    wx.showModal({
      title: '提示',
      content: '确定要取消预约吗？',
      success: function (res) {
        if (res.confirm) {
          _that.CancelCourse(data);
          }
        }
      })
  },
  GetWaitCourses(flag=true){
    var _that = this;
    if(flag)
      _that.setData({pageIndex_wait:1});
    request({
      url:urls.Appoint.GetMyAppointWait,
      method:'post',
      data:{
        page_index:_that.data.pageIndex_wait,
        page_size:_that.data.pageSize_wait,
        uid:app.globalData.userInfo.uid
      }
    }).then(res=>{
      if(res.errCode==0 ){
        _that.setData({
          wait_classes:!flag
          ?_that.data.wait_classes.concat(res.data.data)
          :res.data.data,
          pageTotal_wait: Math.floor(res.data.total / _that.data.pageSize_wait),
          _showWaitModel:res.data.total<=0
        })
      }
      else{
        wx.showToast({
          title: res.msg,
        })
      }
    })
  },
  GetCompCourses(flag=true){
    var _that = this;
    if(flag)
      _that.setData({pageIndex_wait:1});
    request({
      url:urls.Appoint.GetMyAppointComp,
      method:'post',
      data:{
        page_index:_that.data.pageIndex_comp,
        page_size:_that.data.pageSize_comp,
        uid:app.globalData.userInfo.uid
      }
    }).then(res=>{
      console.log(res);
      if(res.errCode==0 ){
        _that.setData({
          comp_classes:!flag
          ?_that.data.comp_classes.concat(res.data.data)  
          :res.data.data,
          pageTotal_comp :Math.floor(res.data.total / _that.data.pageSize_comp),
          _showCompModel :res.data.total<=0
        })
      }
      else{
        wx.showToast({
          title: res.msg,
        })
      }
    })
  },
  CancelCourse(data){
    var _that = this;
    request({
      url:urls.Lessons.CancelAppointCourse,
      method:'post',
      data:data
    }).then(res=>{
      _that.GetWaitCourses();
      if(res.errCode==0){
        wx.showToast({
          title: "取消成功！",
          icon:'none'
        })
      }
      else{
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
      }
    })
  }
})