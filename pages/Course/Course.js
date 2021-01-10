// pages/Course/Course.js
import urls from '../../utils/urls';
import request from '../../utils/network.js';
var util  = require('../../libs/util.js')
const app = getApp();
const baseURL = app.globalData.baseMVCURL;
const baseImgURL = app.globalData.baseImgURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    _noData:false,
    _courses:[],
      baseURL: baseURL,
      baseImgURL: baseImgURL,
    _doorId:'',
    _doorName:'',
    _currendDate:'',
    _selectDate:'',
    _showWeek:'',
    _endDate:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data._doorName= options.doorName
    var now = new Date();
   
    var end = new Date(now);
    end.setDate(now.getDate()+30);

    this.setData({
      _doorId:options.doorId,
      _currendDate: util.dateFormat("YYYY-mm-dd",now),
      _selectDate: util.dateFormat("YYYY-mm-dd",now),
      _showWeek:`今天-周${util.toWeekDay((new Date()).getDay())}`,
      _endDate:util.dateFormat("YYYY-mm-dd",end),
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
   this.InitCourseData();
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
  InitCourseData(){
    var _that = this;
    request({
      url:urls.Courses.GetAdminCourseByDate,
      data:{
        door_id:_that.data._doorId,
        date:_that.data._selectDate
      },
      method:'post'
    }).then(res=>{
      if(res.errCode==0){
        _that.setData({
          _courses:res.data.data,
          _noData:res.data.total==0
        })
        
      }
    })
  },
  onAddCourse(e){
    var did= e.currentTarget.dataset.doorid;
    wx.navigateTo({
      url: `../CreateCourse/CreateCourse?doorId=${this.data._doorId}`,
    })
  },
  bindDayChange(e){
    this.setData({
      _selectDate:e.detail.value
    })
    if(e.detail.value == this.data._currendDate){
      this.setData({
        _showWeek:`今天-周${util.toWeekDay((new Date(e.detail.value)).getDay())}`
      })
    }else{
      this.setData({
        _showWeek: `周${util.toWeekDay((new Date(e.detail.value)).getDay())}`
      })
    }
    this.InitCourseData();
  },
  onSlideEdit(e){
    var cid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../CreateCourse/CreateCourse?doorId=${this.data._doorId}&courseId=${cid}`,
    })
  },
  onSlideDelete(e){
    var cid = e.currentTarget.dataset.id;
    var _that = this;
    request({
     url:urls.Courses.DeleteCourse,
     data:{
      cid:cid
     }
    }).then(res=>{
      if(res.errCode==0){
        wx.showToast({
          title: '删除成功！',
          icon:'none'
        })
        _that.InitCourseData();
      }
      else{
        wx.showToast({
          title: '删除失败！',
          icon:'none'
        })
      }
    })
  },
  onSlideCancel(e){
    var cid = e.currentTarget.dataset.id;
    console.log(cid);
  },
  bindQuickDate(e){
    var _that = this;
    var date= e.detail.value;

    if (_that.data._courses.length<=0){
      wx.showToast({
        title: '当前选择的日期没有排课数据，请重新选择~',
        icon:'none'
      })
      return;
    }
    else if(date == _that.data._selectDate){
      wx.showToast({
        title: '不能选择同一天进行快速排课',
        icon:'none'
      })
      return;
    }
   
    wx.showModal({
      title:'确认',
      content:'快速排课只能复制当前日期自己创建的排课，非自己创建的排课将不会进行复制！临时教师也不会被复制',
      confirmText:'我已了解',
      confirmColor:'#fd4d4d',
      success(res){
        if(res.confirm){
          request({
            url:`${urls.Courses.QuickCourse}?sdate=${_that.data._selectDate}&cdate=${date}&doorid=${_that.data._doorId}&openid=${wx.getStorageSync("loginSessionKey")}`
          }).then(res=>{
            console.log(res);
            if(res.errCode==0){
              _that.setData({
                _selectDate:date
              })
              _that.InitCourseData();
            }
          })
        }
      }
    })
  }
})