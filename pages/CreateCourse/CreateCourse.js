// pages/CreateCourse/CreateCourse.js
import request from '../../utils/network.js';
import urls from '../../utils/urls.js';
var util  = require('../../libs/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseId:'',
    doorId: '',
    courseDate:'',
    courseTime:'08:00',
    courseDesc:'课程开始前1个小时内不可取消预约',
    subjectId:'',
    maxAllow:10,
    minAllow:4,
    cancelDuration:60,
    allowQueue:false,
    onlyTodayAppoint:false,
    needCards:[],
    cards:[],
    subjectArr:[],
    limitAppointDuration:30,
    tempTeacher:'',

    ISUPDATE: false,

    subjectSelect:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var now = new Date();
    
    this.setData({
      courseId:options.courseId,
      doorId:options.doorId,
      courseDate:util.dateFormat("YYYY-mm-dd",now)
    })
    this.InitAddCourseData();
    if(options.courseId){
      wx.setNavigationBarTitle({
        title: '编辑排课',
      })
      request({
        url:urls.Courses.GetCourseById,
        data:{
          'id':options.courseId
        }
      }).then(res=>{
        if(res.data){
          this.setData({
            doorId: res.data.door_id,
            courseDate:res.data.course_date,
            courseTime:res.data.course_time,
            courseDesc:res.data.course_desc,
            subjectId:res.data.subject_id,
            maxAllow:res.data.max_allow,
            minAllow:res.data.min_allow,
            cancelDuration:res.data.cancel_duration,
            allowQueue:res.data.allow_queue,
            onlyTodayAppoint:res.data.only_today_appoint,
            limitAppointDuration:res.data.limit_appoint_duration,
            tempTeacher:res.data.temp_teacher,
            ISUPDATE: true,
          })
          if(res.data.need_cards){
            this.setData({
              needCards: res.data.need_cards.split(',').map(x=>{return parseInt(x)}),
            })
          }
        }
      })
    }
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

  },
  InitAddCourseData(){
    var _that = this;
    request({
      url:`${urls.Courses.GetAddCourseData}?doorId=${_that.data.doorId}`
    }).then(res=>{
      if(res.errCode==0){
        _that.setData({
          cards:res.data.cards,
          subjectArr:res.data.subjects
        })
        if(res.data.subjects.length>0){
          _that.setData({
            subjectId:res.data.subjects[0].id
          })
          let _cards= res.data.subjects[0].need_cards;
          if(_cards){
            _that.setData({
              needCards: _cards.split(',').map(x=>{return parseInt(x)}),
            })
          }
        }
      }
    })
  },
  bindDateChange(e){
    this.setData({
      courseDate:e.detail.value
    })
  },
  bindTimeChange(e){
    this.setData({
      courseTime:e.detail.value
    })
  },
  onTeacheriput(e){
    this.setData({tempTeacher:e.detail.value})
  },
  onMaxAllowiput(e){
    this.setData({tempTemaxAllowacher:e.detail.value})
  },
  onMinAllowiput(e){
    this.setData({minAllow:e.detail.value})
  },
  onCancelDurationiput(e){
    this.setData({cancelDuration:e.detail.value})
  },
  onLimitDurationiput(e){
    this.setData({limitAppointDuration:e.detail.value})
  },
  onAllowQueueChanged(e){
    this.setData({allowQueue:e.detail.key == 1})
  },
  onOnlyTodayAppointChanged(e){
    this.setData({onlyTodayAppoint:e.detail.key == 1})
  },
  onCourseDesciput(e){
    this.setData({courseDesc:e.detail.value})
  },
  onSubjectChange(e){
    var _that = this;
    if(this.data.subjectArr)
    {
      this.setData({
        subjectSelect:e.detail.value,
        subjectId:_that.data.subjectArr[e.detail.value].id
      });
      let _cards= _that.data.subjectArr[e.detail.value].need_cards;
      if(_cards){
        _that.setData({
          needCards: _cards.split(',').map(x=>{return parseInt(x)}),
        })
      }
    }
      
  },
  onCardsChange(e) {
    var _that = this;
    let v = parseInt(e.detail.key);
    let temp_arr = _that.data.needCards;
    if(temp_arr.indexOf(v)>=0){
      temp_arr = temp_arr.filter(s=>{ return  s != v });
      _that.setData({
        needCards:temp_arr
      })
    }
    else{
      temp_arr.push(v);
      _that.setData({
        needCards:temp_arr
      })
    }
  },
  onSaveInfo(){
    var _that = this;
    if (!this.data.subjectId) {
      wx.showToast({
        title: '请先去创建课程',
        icon: 'none'
      });
      return;
    }
    let _datetime = `${this.data.courseDate.replace(/-/g,'/')} ${this.data.courseTime }`;
    if( new Date(_datetime) <= new Date()){
      wx.showToast({
        title: '请设置未来时间！',
        icon: 'none'
      });
      return;
    }
    var data ={
      id:this.data.courseId,
      door_id:this.data.doorId,
      course_date:this.data.courseDate,
      course_time:this.data.courseTime,
      subject_id:this.data.subjectId,
      max_allow:this.data.maxAllow,
      min_allow:this.data.minAllow,
      cancel_duration:this.data.cancelDuration,
      allow_queue:this.data.allowQueue,
      only_today_appoint:this.data.onlyTodayAppoint,
      need_cards:this.data.needCards.join(),
      limit_appoint_duration:this.data.limitAppointDuration,
      temp_teacher:this.data.tempTeacher,
      active:true,
      create_openid:wx.getStorageSync('loginSessionKey'),
      course_desc:this.data.courseDesc
    }
    _that.EndSave(data);
  },
  EndSave(data){
    var _that = this;
    var url = _that.data.ISUPDATE ?
      urls.Courses.UpdateCourse:
      urls.Courses.CreateCourse;

    request({
      url:url,
      method:'post',
      data:data
    }).then(res=>{
      if (res.errCode == 0) {
        wx.showToast({
          title: '保存成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 0,
          })
        }, 1000);
      } else {
        wx.showToast({
          title: '失败：' + res.msg,
          icon: 'none'
        })
      }
    })
  }
})