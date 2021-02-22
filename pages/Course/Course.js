// pages/Course/Course.js
import urls from '../../utils/urls';
import request from '../../utils/network.js';
var util = require('../../libs/util.js')
const app = getApp();
const baseURL = app.globalData.baseMVCURL;
const baseImgURL = app.globalData.baseImgURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _stepActiveIndex: 0,
    _noData: false,
    _courses: [],
    baseURL: baseURL,
    baseImgURL: baseImgURL,
    _doorId: '',
    _doorName: '',
    _currendDate: '',
    _selectDate: '',
    _showWeek: '',
    _endDate: '',

    _showWeekModel: false,
    _showSelfModel: false,
    _showWeekModelTp: 0,
    _showWeekModelSelectIndex: 1,
    _showWeekModelData: [],
    _showWeekModelSelectData: [{ "id": -1, "name": "上周" }, { "id": 0, "name": "本周" }, { "id": 1, "name": "下周" }],

    _showAppointUsers: false,
    _showAppointUsersData: [],
    _showQueueAppointUsersData: [],

    _showSelfAppointModel: false,
    _SelfAppointNeedCards: '',
    _selfAppointData: Object,
    _selfAppointUserCards: [],
    nick: '',
    userLst: [],

    _showUserCardsModel: false,
    _showUserCardsUserObj: Object
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data._doorName = options.doorName
    var now = new Date();

    var end = new Date(now);
    end.setDate(now.getDate() + 30);

    this.setData({
      _doorId: options.doorId,
      _currendDate: util.dateFormat("YYYY-mm-dd", now),
      _selectDate: util.dateFormat("YYYY-mm-dd", now),
      _showWeek: `今天-周${util.toWeekDay((new Date()).getDay())}`,
      _endDate: util.dateFormat("YYYY-mm-dd", end),
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
  InitCourseData() {
    var _that = this;
    request({
      url: urls.Courses.GetAdminCourseByDate,
      data: {
        door_id: _that.data._doorId,
        date: _that.data._selectDate
      },
      method: 'post'
    }).then(res => {
      if (res.errCode == 0) {
        _that.setData({
          _courses: res.data.data,
          _noData: res.data.total == 0,
          _stepActiveIndex: -1
        })
        if (res.data.total > 0) {

          var newArr = res.data.data.map(function (cv, index, arr) {
            var tm = new Date(`${cv.course_date.replace(/-/g, "/")} ${cv.course_time}`);
            var tm_end = new Date(tm);
            tm_end.setMinutes(tm_end.getMinutes() + cv.Subject.subject_duration);
            if (new Date() > tm_end) {
              _that.setData({
                _stepActiveIndex: index + 1
              })
              cv.status = "已结束";
              cv.status_class = "over";
              return cv;
            }
            else if (new Date() > tm) {
              cv.status = "进行中";
              cv.status_class = "processing";
              return cv;
            }
            else {
              if (_that.data._stepActiveIndex == -1) {
                _that.setData({
                  _stepActiveIndex: index
                })
              }
              cv.status = "未开始";
              cv.status_class = "nostart";
              return cv;
            }
          })
          _that.setData({
            _courses: newArr,
          })
        }
      }
    })
  },
  onAddCourse(e) {
    var did = e.currentTarget.dataset.doorid;
    wx.navigateTo({
      url: `../CreateCourse/CreateCourse?doorId=${this.data._doorId}`,
    })
  },
  bindDayChange(e) {
    this.setData({
      _selectDate: e.detail.value
    })
    if (e.detail.value == this.data._currendDate) {
      this.setData({
        _showWeek: `今天-周${util.toWeekDay((new Date(e.detail.value)).getDay())}`
      })
    } else {
      this.setData({
        _showWeek: `周${util.toWeekDay((new Date(e.detail.value)).getDay())}`
      })
    }
    this.InitCourseData();
  },
  onSlideEdit(e) {
    var cid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../CreateCourse/CreateCourse?doorId=${this.data._doorId}&courseId=${cid}`,
    })
  },
  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },
  onSlideDelete(e) {
    var cid = e.currentTarget.dataset.id;
    var _that = this;
    wx.showModal({
      title: '警告',
      confirmText: '我已了解',
      confirmColor: '#fd4d4d',
      content: '确认删除么，删除操作不会进行退卡，删除之前请先确认预约情况，如果有人预约，请先进行“取消”操作，随后在进行“删除”！',
      success(res) {
        if (res.confirm) {
          request({
            url: urls.Courses.DeleteCourse,
            data: {
              cid: cid
            }
          }).then(res => {
            if (res.errCode == 0) {
              _that.InitCourseData();
              setTimeout(() => {
                wx.showToast({
                  title: '删除成功！',
                  icon: 'none'
                })
              }, 500);


            }
            else {
              setTimeout(() => {
                wx.showToast({
                  title: '删除失败！',
                  icon: 'none'
                })
              }, 500);

            }
          })
        }
      }
    })
  },
  onSlideCancel(e) {
    var _that = this;
    var cid = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认',
      content: '确定要取消该课程么，取消该课程后，所有已预约的学员将会进行退卡~',
      confirmText: '我已了解',
      confirmColor: '#fd4d4d',
      success(res) {
        if (res.confirm) {
          request({
            url: urls.Courses.CancelTheCourse,
            method: 'post',
            data: {
              courseid: cid
            }
          }).then(res => {
            _that.InitCourseData();
            if (res.errCode == 0) {
              setTimeout(() => {
                wx.showToast({
                  title: '操作成功',
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
        }
      }
    })

  },
  bindQuickDate(e) {
    var _that = this;
    var date = e.detail.value;

    if (_that.data._courses.length <= 0) {
      wx.showToast({
        title: '当前选择的日期没有排课数据，请重新选择~',
        icon: 'none'
      })
      return;
    }
    else if (date == _that.data._selectDate) {
      wx.showToast({
        title: '不能选择同一天进行快速排课',
        icon: 'none'
      })
      return;
    }

    wx.showModal({
      title: '确认',
      content: '快速排课只能复制当前日期自己创建的排课，非自己创建的排课，以及取消的课程 将不会进行复制！临时教师也不会被复制！为避免数据混乱，不要重复复制！',
      confirmText: '我已了解',
      confirmColor: '#fd4d4d',
      success(res) {
        if (res.confirm) {
          request({
            url: `${urls.Courses.QuickCourse}?sdate=${_that.data._selectDate}&cdate=${date}&doorid=${_that.data._doorId}&openid=${wx.getStorageSync("loginSessionKey")}`
          }).then(res => {
            if (res.errCode == 0) {
              _that.setData({
                _selectDate: date
              })
              _that.InitCourseData();
            } else {
              setTimeout(() => {
                wx.showToast({
                  title: res.msg,
                  icon: 'none'
                })
              }, 500);

            }
          })
        }
      }
    })
  },
  InitWeekCourse() {
    var _that = this;
    request({
      url: urls.Courses.GetWeekCourse,
      data: {
        door_id: _that.data._doorId,
        tp: _that.data._showWeekModelTp
      },
      method: 'post'
    }).then(res => {
      if (res.data) {
        _that.setData({
          _showWeekModelData: res.data
        })
      }
    });
  },
  onPickerWeekChange(e) {
    var v = e.detail.value;
    this.setData({
      _showWeekModelSelectIndex: v,
      _showWeekModelTp: this.data._showWeekModelSelectData[v].id
    })
    this.InitWeekCourse();
  },
  bindShowWeekModel() {
    this.setData({
      _showWeekModel: true
    })
    this.InitWeekCourse();
  },
  bindHideWeekModel() {
    this.setData({
      _showWeekModel: false
    })
  },
  onShowAppointUser(e) {
    var obj = e.currentTarget.dataset.obj;
    var users = obj.AppointUsers;
    var queues = obj.QueueAppointUsers;
    this.setData({
      _showAppointUsers: users.length > 0,
      _showAppointUsersData: users,
      _showQueueAppointUsersData: queues
    })
  },
  onAcrPopClose() {
    this.setData({
      _showAppointUsersData: []
    })
  },
  onNickInput(e) {
    var input = e.detail.value;
    this.setData({
      nick: input
    })
    this.GetUserLst();
  },
  onQuitCard(e) {
    var _that = this;
    var obj = e.currentTarget.dataset.obj;
    wx.showModal({
      title: '提示',
      content: '确定为该用户的该节课程退卡么？',
      confirmText: '确认',
      confirmColor: '#ff6f11',
      success(res) {
        if (res.confirm) {
          request({
            url: urls.Courses.QuitAppointCards,
            method: 'post',
            data: {
              uid: obj.uid,
              courseid: obj.course_id
            }
          }).then(res => {
            _that.InitCourseData();
            if (res.errCode == 0) {
              setTimeout(() => {
                wx.showToast({
                  title: '退课成功！',
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
        }
      }
    })

  },
  onSelfAppoint(e) {
    var obj = e.currentTarget.dataset.obj;
    this.setData({
      _showSelfAppointModel: true,
      _selfAppointData: obj
    })
    this.CheckCourseNeedCards();
    this.GetUserLst();
  },
  CheckCourseNeedCards(obj) {
    var _that = this;
    request({
      url: urls.Courses.CheckCourseNeedCards,
      method: 'post',
      data: {
        course_id: _that.data._selfAppointData.id
      }
    }).then(res => {
      _that.setData({
        _SelfAppointNeedCards: res.data
      })
    })
  },
  GetUserLst() {
    var _that = this;
    var course_id = _that.data._selfAppointData.id;

    request({
      url: urls.UInfo.GetUserLst_SelfAppint,
      data: {
        doorid: _that.data._doorId,
        nick: _that.data.nick,
        course_id: course_id,
      }
    }).then(res => {
      if (res.errCode == 0) {
        _that.setData({
          //slideData:res.data.initials,
          userLst: res.data.uinfos
        })
      }
    })
  },
  onUinfoTap(e) {
    var _that = this;
    var obj = e.currentTarget.dataset.obj;
    if (_that.data._SelfAppointNeedCards) {
      _that.GetUserCanUseCard(obj);
      _that.setData({
        _showUserCardsModel: true,
        _showUserCardsUserObj: obj
      })
    }
    else {
      var name = (obj.door_remark == null || obj.door_remark == '') ? obj.nick_name : obj.door_remark;
      var data = {
        course_id: _that.data._selfAppointData.id,
        uid: obj.uid,
        door_id: obj.door_id,
      };
      _that.AppointCourse(name, data);
    }
  },
  onUserCardTap(e) {
    var _that = this;
    var card_id = e.currentTarget.dataset.cid;
    var name = (_that.data._showUserCardsUserObj.door_remark == null || _that.data._showUserCardsUserObj.door_remark == '') ? _that.data._showUserCardsUserObj.nick_name : _that.data._showUserCardsUserObj.door_remark
    var data = {
      course_id: _that.data._selfAppointData.id,
      uid: _that.data._showUserCardsUserObj.uid,
      card_id: card_id,
      door_id: _that.data._showUserCardsUserObj.door_id
    };
    _that.AppointCourse(name, data);
  },
  GetUserCanUseCard(obj) {
    var _that = this;
    request({
      url: urls.Lessons.GetUserCanUseDoorCards,
      method: 'post',
      data: {
        doorId: obj.door_id,
        uid: obj.uid,
      }
    }).then(res => {
      _that.setData({
        _selfAppointUserCards: res.data
      })
    })
  },
  AppointCourse(name, data) {
    var _that = this;
    wx.showModal({
      title: '确认',
      content: `确认帮助 ${name} 预约该课程么？`,
      confirmText: '确认预约',
      confirmColor: '#fd4d4d',
      success(res) {
        if (res.confirm) {
          _that.setData({
            _showUserCardsModel: false,
            _showSelfAppointModel: false,
          })
          request({
            url: urls.Lessons.SelfAppointCourse,
            method: 'post',
            data: data
          }).then(res => {
            _that.setData({
              _showAppointModel: false
            })
            if (res.errCode == 0) {
              _that.InitCourseData();
              wx.showToast({
                title: '自助预约成功！',
              })
            }
            else {
              _that.InitCourseData();
              setTimeout(() => {
                wx.showToast({
                  title: res.msg,
                  icon: 'none',
                })
              }, 500);
            }
          })
        }
        //END
      }
    })
  },
})