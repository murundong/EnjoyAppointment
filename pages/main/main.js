import urls from  '../../utils/urls.js';
import request from '../../utils/network.js';
var utils = require ('../../utils/util.js');
var bmap = require('../../libs/bmap-wx.min');
const app = getApp();
const baseURL = app.globalData.baseMVCURL;
const baseImgURL = app.globalData.baseImgURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex:1,
    pageSize:10,
    pageTotal:'',
      baseURL: baseURL,
      baseImgURL: baseImgURL,
     Banners:[],
     Doors:[],
     Region:[],
     Position:'',
     NewMessage:'是否显示通告栏'
  },

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      Region:['上海市','上海市','浦东新区'],
      Position:'上海市-上海市-浦东新区'
    })
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let BMap = new bmap.BMapWX({ak:'sRA0Psclmq7P67iKmmIOXKb9plFxTecc'});
    
    //地理位置
    BMap.regeocoding({
       success: res=>{
        this.setData({
          Region:[res.originalData.result.addressComponent.province,res.originalData.result.addressComponent.city,res.originalData.result.addressComponent.district],
          Position:res.originalData.result.addressComponent.province+'-'+res.originalData.result.addressComponent.city+'-'+res.originalData.result.addressComponent.district
         })}
    })
   
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    request({
      url:urls.data.GetBanners,
    }).then(res=>{
      console.log(res);
      if(res.errCode==0){
        this.setData({
          Banners:res.data,
        })
      }
    })

    request({
      url:urls.data.GetDoors,
      data:{
        page_index:this.data.pageIndex,
        page_size:this.data.pageSize,
      },
      method:'post',
    }).then(res=>{
      console.log(res);
      if(res.errCode==0)
        this.setData({
          Doors:res.data.data,
          pageTotal:Math.floor(res.data.total /this.data.pageSize)
        })
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
    var _that = this;
    if(this.data.pageIndex > this.data.pageTotal){
      wx.showToast({
        title: '没有更多数据了',
        icon:'none',
        duration:2000
      })
    }
    else{
      this.data.pageIndex++;
      request({
        url:urls.data.GetDoors,
        data:{
          page_index:this.data.pageIndex,
          page_size:this.data.pageSize,
        },
        method:'post',
      }).then(res=>{
        if(res.errCode==0)
          this.setData({
            Doors:_that.data.Doors.concat( res.data.data),
          })
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },
  onScan(option){
    utils.scan_event(option);
  },
  onDoorNav(e){
    if(app.globalData.userInfo==null){
      wx.showModal({
        title:'提示',
        content:'该小程序需要用户授权后方可使用所有功能，请切换到 “我的” 点击授权！',
        confirmText:'确认',
        confirmColor:'#ff6f11',
        success(res){
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/mine/mine',
            })
          } 
        }
      })
      return;
    }
    var doorId = e.currentTarget.dataset.doorId;
    var doorName = e.currentTarget.dataset.doorName;
    request({
      url:urls.UInfo.AddUserAttention,
      data:{
        openid:wx.getStorageSync("loginSessionKey"),
        doorid:doorId
      }
    })
    wx.navigateTo({
      url:`../Lesson/Lesson?doorId=${doorId}&doorName=${doorName}`
    })
  },
  bindRegionChange(e){
    this.setData({
      Region: e.detail.value,
      Position: e.detail.value[0]+'-'+ e.detail.value[1]+'-'+ e.detail.value[2]
    })
  },
  onPreviewImg(e){
    var src = e.currentTarget.dataset.src;
    // var srcArr = this.data.Banners.map(x => this.data.baseURL + x.img);
    var srcArr = this.data.Banners.map(x => x.img);
    console.log(src);
    wx.previewImage({
      urls: srcArr,
      current: src
    })
  }
})