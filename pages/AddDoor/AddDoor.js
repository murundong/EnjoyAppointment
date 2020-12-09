// pages/AddDoor/AddDoor.js
import request from '../../utils/network.js';
import urls from '../../utils/urls.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs:[],
    doorId:'',
    doorName:'',
    doorTel:'',
    doorAdd:'',
    doorDesc:'',
    doorImg:'',
    onlyAllowMember:false,
    status:0,
    active:true,
    ISUPDATE:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.doorId){
      request({
        url:urls.data.GetDoorsById,
        data:{id:options.doorId}
      }).then(res=>{
        this.setData({
          doorId:res.data.id,
          doorName:res.data.door_name,
          doorDesc:res.data.door_desc,
          doorTel:res.data.door_tel,
          doorImg:res.data.door_img,
          doorAdd:res.data.door_address,
          onlyAllowMember:res.data.only_allow_member,
          status:res.data.status,
          active:res.data.active,
          ISUPDATE:true
        })
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
    var _that = this;
    this.data.imgs= e.detail.all;
    this.setData({
      doorImg:_that.GenerateImgStr()
    })
  },
  onImgRemoveTap(e){
    var _that = this;
    this.data.imgs= e.detail.all;
    this.setData({
      doorImg:_that.GenerateImgStr()
    })
  },
  GenerateImgStr(){
    let imgstr= '';
    if(this.data.imgs.length>0)
    {
      imgstr= this.data.imgs.map(x=>{return x.url}).join()
    }
    return imgstr;
  },
  onSaveInfo(e){
    var data = {
      id:this.data.doorId,
      door_name:this.data.doorName,
      door_desc:this.data.doorDesc,
      door_tel:this.data.doorTel,
      door_img:this.data.doorImg,
      door_address:this.data.doorAdd,
      only_allow_member:this.data.onlyAllowMember,
      status:this.data.status,
      active:this.data.active,
      create_openid:wx.getStorageSync('loginSessionKey')

    }
    request({
      url:urls.process.CreateDoors,
      method:'post',
      data:data
    }).then(res=>{
      console.log(res)
    });
  }

})