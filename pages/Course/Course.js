// pages/Course/Course.js
import urls from '../../utils/urls';
import request from '../../utils/network.js';
const app = getApp();
var baseURL= app.globalData.baseMVCURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    _noData:false,
    _courses:[],
    baseURL:baseURL,
    _doorId:'',
    _doorName:'',
    _currendDate:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.data._doorId = options.doorId;
    this.data._doorName= options.doorName
    
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    this.setData({
      _currendDate: `${year}-${month}-${day}`
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
    var _that = this;
    request({
      url:urls.Courses.GetAdminCourseByDate,
      data:{
        door_id:_that.data._doorId,
        date:_that.data._currendDate
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