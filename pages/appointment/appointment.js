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
    UID:'',
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
    var _that = this;
    if(app.globalData.userInfo==null){
      _that.ProcessUserInfo();
      // wx.showModal({
      //   title:'提示',
      //   content:'该小程序需要用户授权后方可使用所有功能，请切换到 “我的” 点击授权,或稍后重试！',
      //   confirmText:'确认',
      //   confirmColor:'#ff6f11',
      //   success(res){
      //     if (res.confirm) {
      //       wx.switchTab({
      //         url: '/pages/mine/mine',
      //       })
      //     } 
      //   }
      // })
      // return;
    }
    else{
      _that.setData({
        UID:app.globalData.userInfo.uid
      })
      if(this.data.SelectTabs==0){
        this.GetWaitCourses();
      }
      else{
        this.GetCompCourses();
      }
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
      uid:_that.data.UID,
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
        uid:_that.data.UID
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
      else {
          setTimeout(() => {
              wx.showToast({
                  title: res.msg,
              })
          }, 500);
       
      }
    })
  },
  GetCompCourses(flag=true){
    var _that = this;
    if(flag)
      _that.setData({pageIndex_comp:1});
    request({
      url:urls.Appoint.GetMyAppointComp,
      method:'post',
      data:{
        page_index:_that.data.pageIndex_comp,
        page_size:_that.data.pageSize_comp,
        uid:_that.data.UID
      }
    }).then(res=>{
      if(res.errCode==0 ){
        _that.setData({
          // comp_classes:!flag
          // ?_that.data.comp_classes.concat(res.data.data)  
          // :res.data.data,
          pageTotal_comp :Math.floor(res.data.total / _that.data.pageSize_comp),
          _showCompModel :res.data.total<=0
        })
        if(!flag){
          var copyArr = _that.data.comp_classes;
          if(res.data.data.length>0 && 
            res.data.data[0].dt ==copyArr[copyArr.length-1].dt )
            {
              copyArr[copyArr.length-1].courses=
              copyArr[copyArr.length-1].courses.concat(res.data.data[0].courses)
              if(res.data.data.length>1){
                res.data.data.shift();
                copyArr = copyArr.concat(res.data.data);
              }
           }
           else{
            copyArr = copyArr.concat(res.data.data);
           }
           _that.setData({
            comp_classes:copyArr
          })
        }
        else{
          _that.setData({
            comp_classes:res.data.data
          })
        }
      }
      else {
          setTimeout(() => {
              wx.showToast({
                  title: res.msg,
              })
          }, 500);
       
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
        if (res.errCode == 0) {
            setTimeout(() => {
                wx.showToast({
                    title: "取消成功！",
                    icon: 'none'
                })
            }, 500);
       
      }
        else {
            setTimeout(() => {
                wx.showToast({
                    title: res.msg,
                    icon: 'none'
                })
            }, 500);
      
      }
    })
  }, 
  ProcessUserInfo(){
    var _that = this;
    setTimeout(() => {
      request({
        url: urls.data.GetUInfoByOpenId,
        data: { openid: wx.getStorageSync('loginSessionKey') }
      }).then(res => {
        _that.setData({
          UID:res.data.uid,
        })
        if(this.data.SelectTabs==0){
          this.GetWaitCourses();
        }
        else{
          this.GetCompCourses();
        }
      })
    }, 500);
  },
})