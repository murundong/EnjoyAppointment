// pages/AddDoor/AddDoor.js
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
    banners:[],
    imgs:[],
    doorId:'',
    doorName:'',
    doorTel:'',
    doorAdd:'',
    doorDesc:'',
    doorImg:'',
    doorBanners:'',
    onlyAllowMember:false,
    status:0,
    active:true,
    ISUPDATE:false,

    editImgs:[],
    editBanners:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this;
    if(options.doorId){
      wx.setNavigationBarTitle({
        title: '编辑场馆',
      })
      request({
        url:urls.data.GetDoorsById,
        data:{'doorid':options.doorId}
      }).then(res=>{
        if(res.data){
          this.setData({
            doorId:res.data.id,
            doorName:res.data.door_name,
            doorDesc:res.data.door_desc,
            doorTel:res.data.door_tel,
            doorImg:res.data.door_img,
            doorBanners:res.data.door_banners,
            doorAdd:res.data.door_address,
            onlyAllowMember:res.data.only_allow_member,
            status:res.data.status,
            active:res.data.active,
            ISUPDATE:true,

            editImgs:_that.GenerateEditUrls(res.data.door_img),
            editBanners:_that.GenerateEditUrls(res.data.door_banners),
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
  onNameiput(e){
    this.setData({
      doorName:e.detail.value
    })
  },
  onTeliput(e){
    this.setData({
      doorTel:e.detail.value
    })
  },
  onAddiput(e){
    this.setData({
      doorAdd:e.detail.value
    })
  },
  onDesciput(e){
    this.setData({
      doorDesc:e.detail.value
    })
  },
  onMemberChanged(e){
    this.setData({
      onlyAllowMember:e.detail.key==1
    })
  },
  onStatusChanged(e){
    this.setData({
      status:e.detail.key
    })
  },
  onActiveChanged(e){
    this.setData({
      active:e.detail.key==1
    })
  },
  onImgChangeTap(e){
    this.data.imgs =e.detail.all;
  },
  onImgRemoveTap(e){
    this.data.imgs=[];
  },
  onImgBannerChangeTap(e){
    this.data.banners= e.detail.all;
  },
  onImgBannerRemoveTap(e){
    this.data.banners= e.detail.all;
  },
  GenerateEditUrls(data){
    var arr = new Array();
    var baseurl = this.data.baseMVCURL;
    if(data){
      let temp= data.split(',');
      for (let index = 0; index < temp.length; index++) {
        const element = temp[index];
        arr.push({ url: baseurl+element});
      }
    }
    return arr;
  },
  GenerateImgStr(data){
    let imgstr= '';
    if(data.length>0)
    {
      imgstr= data.map(x=>{return x.url}).join()
    }
    return imgstr;
  },
  onSaveInfo(e){
    var _that = this;
    if(!this.data.doorName) {
      wx.showToast({
      title: '场馆名称不能为空',
      icon:'none'});
      return;
    }
   

    var data = {
      id:this.data.doorId,
      door_name:this.data.doorName,
      door_desc:this.data.doorDesc,
      door_tel:this.data.doorTel,
      door_img:this.data.doorImg,
      door_banners:this.data.doorBanners,
      door_address:this.data.doorAdd,
      only_allow_member:this.data.onlyAllowMember,
      status:this.data.status,
      active:this.data.active,
      create_openid:wx.getStorageSync('loginSessionKey')
    }
    if(this.data.imgs.length>0 || this.data.banners.length>0){
      Upload({
        filePaths: _that.GenerateImgStr(_that.data.imgs)
      }).then(res => {
        if(res.length>0) data.door_img= res[0].src;
        Upload({
          filePaths: _that.GenerateImgStr(_that.data.banners)
        }).then(res => {
          if(res.length>0) {
            data.door_banners = res.map(s=>{return s.src}).join(',');
          }
          _that.EndSave(data);
        })
      })
    }
    else{
      _that.EndSave(data);
    }
  },
  EndSave(data){
    
    var _that = this;
    var url = _that.data.ISUPDATE ? 
    urls.process.UpdateDoors:
    urls.process.CreateDoors;
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
          let page= getCurrentPages()[getCurrentPages().length-2];
          page.setData({
            _doorName:data.door_name
          })
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