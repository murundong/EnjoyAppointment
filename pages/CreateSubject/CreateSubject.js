// pages/CreateSubject/CreateSubject.js
import {Upload} from '../../utils/network.js';
import request from '../../utils/network.js';
import urls from '../../utils/urls.js';
const app = getApp();
const baseMVCURL= app.globalData.baseMVCURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseMVCURL:baseMVCURL,
    doorId:'',
    subjectId:'',
    imgs:[],

    subjectName:'',
    subjectTeacher:'',
    subjectDuration:'',
    subjectPrice:'',
    subjectImg:'',
    subjectDesc:'',
    needCards:'',
    active:true,
    
    ISUPDATE:false,

    editImgs:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this;
    this.setData({
      subjectId:options.subjectId,
      doorId : options.doorId,
    })
    if(options.subjectId){
      wx.setNavigationBarTitle({
        title: '编辑场馆',
      })
      request({
        url:urls.Subject.GetSubjectById,
        data:{'id':options.subjectId}
      }).then(res=>{
        if(res.data){
          this.setData({
            doorId:res.data.id,
            subjectName:res.data.subject_name,
            subjectTeacher:res.data.subject_teacher,
            subjectDuration:res.data.subject_duration,
            subjectPrice:res.data.subject_price,
            subjectImg:res.data.subject_img,
            subjectDesc:res.data.subject_desc,
            needCards:res.data.need_cards,
            active:res.data.active,
            

            
            ISUPDATE:true,

            editImgs:_that.GenerateEditUrls(res.data.subject_img),
           
          })
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
  GenerateImgStr(data){
    let imgstr= '';
    if(data.length>0)
    {
      imgstr= data.map(x=>{return x.url}).join()
    }
    return imgstr;
  },
  GenerateEditUrls(data){
    var arr = new Array();
    var baseurl = this.data.baseMVCURL;
    if(data){
      arr.push({ url: baseurl+data});
    }
    return arr;
  },
  onNameiput(e){
    this.setData({
      subjectName:e.detail.value
    })
  },
  onDesciput(e){
    this.setData({
      subjectDesc:e.detail.value
    })
  },
  onCardsiput(e){
    this.setData({
      needCards:e.detail.value
    })
  },
  onTeacheriput(e){
    this.setData({
      subjectTeacher:e.detail.value
    })
  },
  onDurationiput(e){
    this.setData({
      subjectDuration:e.detail.value
    })
  },
  onPriceiput(e){
    this.setData({
      subjectPrice:e.detail.value
    })
  },
  onImgChangeTap(e){
    this.data.imgs =e.detail.all;
  },
  onImgRemoveTap(e){
    this.data.imgs=[];
    this.setData({
      subjectImg:''
    })
  },
  onActiveChanged(e){
    this.setData({
      active:e.detail.key==1
    })
  },
  onSaveInfo(){
    var _that = this;
    if(!this.data.subjectName) {
      wx.showToast({
      title: '课程名称不能为空',
      icon:'none'});
      return;
    }

    var data ={
      id:this.data.subjectId,
      door_id:this.data.doorId,
      subject_name:this.data.subjectName,
      subject_desc:this.data.subjectDesc,
      subject_teacher:this.data.subjectTeacher,
      subject_duration:this.data.subjectDuration,
      subject_price:this.data.subjectPrice,
      subject_img:this.data.subjectImg,
      need_cards:this.data.needCards,
      create_openid:wx.getStorageSync('loginSessionKey'),
      active:this.data.active,
    };
    if(this.data.imgs.length>0){
      Upload({
        filePaths: _that.GenerateImgStr(_that.data.imgs)
      }).then(res => {
        if(res.length>0) data.subject_img= res[0].src;
        _that.EndSave(data);
      })
    }
    else{
      _that.EndSave(data);
    }

  },
  EndSave(data){
    var _that = this;
    var url = _that.data.ISUPDATE ? 
    urls.Subject.UpdateSubject:
    urls.Subject.CreateSubject;
    request({
      url:url,
      method:'post',
      data:data
    }).then(res=>{
      if(res.errCode==0){
        wx.showToast({
          title: '保存成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 0,
          })
        }, 1000);
      }
      else{
        wx.showToast({
          title: '失败：'+res.msg,
          icon:'none'
        })
      }
    });
  }
})