import request from '../../utils/network.js';
import urls from '../../utils/urls.js';
var util = require('../../libs/util.js')
const app = getApp();
const baseURL = app.globalData.baseMVCURL;
const baseImgURL = app.globalData.baseImgURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    UID:'',
    pageIndex: 1,
    pageSize: 10,
    pageTotal: '',
    SelectTag: '',
    SelectDate: '',
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
    _noData: false,
    UserDoorCards: [],
    _showModel: false,
    _showModelData: Object,

    _showAppointModel: false,
    _ShowAppointModelCourseID: '',

    ScenesValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var now = new Date();
    var did = options.doorId;
  
    this.setData({
      doorId: did,
      doorName: options.doorName,
      startDay: util.dateFormat("YYYY-mm-dd", now),
      SelectDate: util.dateFormat("YYYY-mm-dd", now),
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
    var Scene= wx.getLaunchOptionsSync()
    console.log('场景值',Scene.scene);
    var _that = this;
    if(app.globalData.userInfo==null){
      _that.ProcessUserInfo();
    }
    else{
      _that.setData({
        UID:app.globalData.userInfo.uid
      })
      _that.GetUserCards();
      _that.GetDoorInfo();
      _that.GetSubjectTags();
      _that.GetAppointLessons(false);
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
    console.log('onPullDownRefresh');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onPullDownRefresh(e) {
    console.log("onPullDownRefresh");
  },
  onReachBottom: function () {
    var _that = this;
    if (this.data.pageIndex > this.data.pageTotal) {
      // wx.showToast({
      //   title: '没有更多数据了',
      //   icon:'none',
      //   duration:2000
      // })
    }
    else {
      this.data.pageIndex++;
      request({
        url: urls.Lessons.GetAppointLessons,
        method: 'post',
        data: {
          page_index: this.data.pageIndex,
          page_size: this.data.pageSize,
          date: _that.data.SelectDate,
          doorId: _that.data.doorId,
          tag: _that.data.SelectTag,
          uid: _that.data.UID
        }
      }).then(res => {
        _that.setData({
          classes: _that.data.classes.concat(res.data.data),
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
    var edate = e.detail.citem;
    this.setData({
      SelectDate: edate.str_date,
    })
    if (this.componentClass)
      this.componentClass.selectInit();
    // wx.lin.flushSticky();
    this.setData({
      SelectTag: '',
    })
    this.GetAppointLessons();
  },
  onTopbarItemTap(e) {
    this.setData({
      SelectTag: e.detail.titemStr,
    })
    this.GetAppointLessons();
  },
  onShowItemDetail(e) {
    var obj = e.currentTarget.dataset.obj;
    this.setData({
      _showModel: true,
      _showModelData: obj
    })
  },
  onFullTap(e) {
    var _that = this;
    var obj = e.currentTarget.dataset.obj;
    var data = {
      uid: _that.data.UID,
      courseid: obj.id
    }
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
  onQueueTap(e) {
    var obj = e.currentTarget.dataset.obj;
    var cid = obj.id;
    if (obj.need_cards == null || obj.need_cards == '') {
      var data = {
        course_id: cid,
        uid: this.data.UID,
        door_id: this.data.doorId
      };
      this.QueueAppointCourse(data);
    }
    else {
      this.setData({
        _showQueueAppointModel: true,
        _ShowAppointModelCourseID: cid
      })
    }
  },
  onOrderTap(e) {
    var obj = e.currentTarget.dataset.obj;
    var cid = obj.id;
    if (obj.need_cards == null || obj.need_cards == '') {
      var data = {
        course_id: cid,
        uid: this.data.UID,
        door_id: this.data.doorId
      };
      this.AppointCourse(data);
    }
    else {
      this.setData({
        _showAppointModel: true,
        _ShowAppointModelCourseID: cid
      })
    }

    // wx.navigateTo({
    //   url: `../EnsureAppointment/EnsureAppointment?doorId=${e.currentTarget.dataset.cid}`,
    // })
  },
  onUserCardTap(e) {
    var cid = e.currentTarget.dataset.cid;
    var data = {
      course_id: this.data._ShowAppointModelCourseID,
      uid: this.data.UID,
      card_id: cid,
      door_id: this.data.doorId
    };
    this.AppointCourse(data);
  },
  onQueueUserCardTap(e) {
    var cid = e.currentTarget.dataset.cid;
    var data = {
      course_id: this.data._ShowAppointModelCourseID,
      uid: this.data.UID,
      card_id: cid,
      door_id: this.data.doorId
    };
    this.QueueAppointCourse(data);
  },
  onPageScroll(res) {
    // wx.lin.setScrollTop(res.scrollTop);
  },
  onDateChange(e) {
    this.setData({
      startDay: e.detail.value,
      SelectDate: e.detail.value,
    })
    this.componentCalender.onGenerateDate(new Date(e.detail.value));
    if (this.componentClass)
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
  onShowSubjectImg(e) {
    var src = e.currentTarget.dataset.src;
    var srcArr = new Array();
    srcArr.push(src);
    wx.previewImage({
      urls: srcArr,
      current: src
    })
  },
  GetSubjectTags() {
    var _that = this;
    request({
      url: urls.Lessons.GetDoorTags,
      method: 'post',
      data: {
        doorId: _that.data.doorId
      }
    }).then(res => {
      if (res.data) {
        _that.setData({
          classes_type: res.data
        })
        _that.componentClass = this.selectComponent('#comp-class');
      }
    });
  },
  GetDoorInfo() {
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
  GetUserCards() {
    var _that = this;
    request({
      url: urls.Lessons.GetUserCanUseDoorCards,
      method: 'post',
      data: {
        doorId: _that.data.doorId,
        uid: _that.data.UID,
      }
    }).then(res => {
      _that.setData({
        UserDoorCards: res.data
      })
    })
  },
  GetAppointLessons(flag = true) {
    var _that = this;
    _that.setData({
      pageIndex: 1
    })
    request({
      url: urls.Lessons.GetAppointLessons,
      method: 'post',
      data: {
        page_index: _that.data.pageIndex,
        page_size: _that.data.pageSize,
        date: _that.data.SelectDate,
        doorId: _that.data.doorId,
        tag: _that.data.SelectTag,
        uid: _that.data.UID
      }
    }).then(res => {
      _that.setData({
        classes: res.data.data == null ? [] : res.data.data,
        _noData: res.data.total == 0,
        pageTotal: Math.floor(res.data.total / this.data.pageSize)
      })
      if (flag) {
        wx.pageScrollTo({
          selector: '.content'
        })
      }
    })
  },
  QueueAppointCourse(data) {
    var _that = this;
    request({
      url: urls.Lessons.QueueAppointCourse,
      method: 'post',
      data: data
    }).then(res => {
      _that.setData({
        _showQueueAppointModel: false
      })
      if (res.errCode == 0) {
        wx.showModal({
          content: '排队成功！',
          showCancel: false,
          success: function (res) {
            _that.GetAppointLessons();
          }
        })
      }
      else {
        _that.GetAppointLessons();
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  AppointCourse(data) {
    var _that = this;
    request({
      url: urls.Lessons.AppointCourse,
      method: 'post',
      data: data
    }).then(res => {
      _that.setData({
        _showAppointModel: false
      })
      if (res.errCode == 0) {
        wx.showModal({
          title: '预约成功',
          content: '成功预约，如需取消，请在取消时限之前操作！',
          showCancel: false,
          success: function (res) {
            _that.GetAppointLessons();
          }
        })
      }
      else {
        _that.GetAppointLessons();
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  CancelCourse(data) {
    var _that = this;
    request({
      url: urls.Lessons.CancelAppointCourse,
      method: 'post',
      data: data
    }).then(res => {
      _that.GetAppointLessons();
      if (res.errCode == 0) {
        wx.showToast({
          title: "取消成功！",
          icon: 'none'
        })
      }
      else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  onCancelQueueTap(e) {
    var _that = this;
    var obj = e.currentTarget.dataset.obj;
    var data = {
      uid: _that.data.UID,
      courseid: obj.id
    }
    wx.showModal({
      title: '提示',
      content: '确定要取消排队吗？',
      success: function (res) {
        if (res.confirm) {
          request({
            url: urls.Lessons.CancelQueue,
            method: 'post',
            data: data
          }).then(res => {
            _that.GetAppointLessons();
            if (res.errCode == 0) {
              wx.showToast({
                title: "取消成功！",
                icon: 'none'
              })
            }
            else {
              wx.showToast({
                title: res.msg,
                icon: 'none'
              })
            }
          })
        }
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
        _that.CheckUserBlack();
        _that.GetUserCards();
        _that.GetDoorInfo();
        _that.GetSubjectTags();
        _that.GetAppointLessons(false);
      })
    }, 500);
  },
  CheckUserBlack(){
    var _that = this;
    var openid = wx.getStorageSync("loginSessionKey");
    request({
      url:urls.UInfo.CheckUserBlack,
      data:{
        openid:openid,
        doorid:_that.data.doorId
      },
      method:'post'
    }).then(res=>{
      if(!res.data){
        request({
          url:urls.UInfo.AddUserAttention,
          data:{
            openid:openid,
            doorid:_that.data.doorId
          }
        })
      }
      else {
        wx.showToast({
          title: '暂时不能访问该场馆~',
          icon:'none'
        })
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/main/main',
          })  
        }, 1000);
      }
    })
  }
})