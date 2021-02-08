import {
  local_classes_type,
  local_classes
} from '../../MockData/data.js'
import request from '../../utils/network.js';
import urls from '../../utils/urls.js';
var util  = require('../../libs/util.js')
const app = getApp();
const baseURL = app.globalData.baseMVCURL;
const baseImgURL = app.globalData.baseImgURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    UID:'',
    pageIndex:1,
    pageSize:10,
    pageTotal:'',
    SelectTag:'',
    SelectDate:'',
    scrollTop: undefined,
      baseURL: baseURL,
      baseImgURL: baseImgURL,
    doorId: '',
    doorName: '',
    banners: '',
    doorAddress: '',
    doorDesc: '',
    doorMananger: '',
    doorManagerImg: '',
    doorTel: '',
    classes_type: [],
    classes: [],
    NewMessage: '场馆通知',
    startDay: '',
    _noData:false,

    _showModel:false,
    _showModelData:Object,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this;
    var now = new Date();
    var did = options.doorId;
    this.setData({
      doorId: did,
      doorName: options.doorName,
      startDay: util.dateFormat("YYYY-mm-dd",now),
      SelectDate:util.dateFormat("YYYY-mm-dd",now),
      UID:getApp().globalData.userInfo.uid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.doorName,
    })
    this.componentCalender = this.selectComponent('#r-cal');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.GetDoorInfo();
    this.GetSubjectTags();
    this.GetAppointLessons(false);
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
  onPullDownRefresh(e){
    console.log("onPullDownRefresh");
  },
  onReachBottom: function () {
    var _that = this;
    if(this.data.pageIndex > this.data.pageTotal){
      // wx.showToast({
      //   title: '没有更多数据了',
      //   icon:'none',
      //   duration:2000
      // })
    }
    else{
      this.data.pageIndex++;
      request({
        url:urls.Lessons.GetAppointLessons,
        method:'post',
        data:{
          page_index:this.data.pageIndex,
          page_size:this.data.pageSize,
          date:_that.data.SelectDate,
          doorId:_that.data.doorId,
          tag:_that.data.SelectTag,
          uid:_that.data.UID
        }
      }).then(res=>{
        _that.setData({
          classes:_that.data.classes.concat( res.data.data),
        })
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onCanlenderItemTap(e) {
    var edate=e.detail.citem;
    this.setData({
      SelectDate:edate.str_date,
    })
    if(this.componentClass)
      this.componentClass.selectInit();
    wx.lin.flushSticky();
    this.setData({
      SelectTag:'',
    })
    this.GetAppointLessons();
  },
  onTopbarItemTap(e) {
    this.setData({
      SelectTag:e.detail.titemStr,
    })
    this.GetAppointLessons();
  },
  onShowItemDetail(e){
    var obj = e.currentTarget.dataset.obj;
    this.setData({
      _showModel:true,
      _showModelData:obj
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
  onQueueTap(e){
    var id = e.currentTarget.dataset.cid;
  },
  onOrderTap(e) {
    wx.navigateTo({
      url: `../EnsureAppointment/EnsureAppointment?doorId=${e.currentTarget.dataset.cid}`,
    })
  },
  onPageScroll(res) {
    wx.lin.setScrollTop(res.scrollTop);
  },
  onDateChange(e) {
    this.setData({
      startDay: e.detail.value,
      SelectDate: e.detail.value,
    })
    this.componentCalender.onGenerateDate(new Date(e.detail.value));
    if(this.componentClass)
      this.componentClass.selectInit();
    this.GetAppointLessons();
  },
  onPreviewImg(e) {
    var src = e.currentTarget.dataset.src;
    var srcArr = this.data.banners.map(x => this.data.baseImgURL + x);
    wx.previewImage({
      urls: srcArr,
      current: src
    })
  },
  onShowSubjectImg(e){
    var src = e.currentTarget.dataset.src;
    var srcArr = new Array();
    srcArr.push(src);
    wx.previewImage({
      urls: srcArr,
      current: src
    })
  },
  GetSubjectTags(){
    var _that = this;
    request({
      url:urls.Lessons.GetDoorTags,
      method:'post',
      data:{
        doorId:_that.data.doorId
      }
    }).then(res=>{
      if(res.data){
        _that.setData({
          classes_type:res.data
        })
        _that.componentClass = this.selectComponent('#comp-class');
      }
    });
  },
  GetDoorInfo(){
    var _that = this;
    request({
      url: urls.Lessons.GetDoorInfo,
      data: {
        doorid: _that.data.doorId,
      }
    }).then(res => {
      if (res.data) {
        _that.setData({
          doorAddress: res.data.door_address,
          banners: res.data.banners,
          doorDesc: res.data.door_desc,
          doorMananger: res.data.door_manager,
          doorTel: res.data.door_tel,
          doorManagerImg: res.data.door_manager_img
        })
      }
    })
  },
  GetAppointLessons(flag=true){
    var _that  = this;
    _that.setData({
      pageIndex:1
    })
    request({
      url:urls.Lessons.GetAppointLessons,
      method:'post',
      data:{
        page_index:_that.data.pageIndex,
        page_size:_that.data.pageSize,
        date:_that.data.SelectDate,
        doorId:_that.data.doorId,
        tag:_that.data.SelectTag,
        uid:_that.data.UID
      }
    }).then(res=>{
      _that.setData({
        classes:res.data.data==null?[]:res.data.data,
        _noData:res.data.total==0,
        pageTotal:Math.floor(res.data.total /this.data.pageSize)
      })
      if(flag){
        wx.pageScrollTo({
          selector:'.content'
        })
      }
    })
  }
})