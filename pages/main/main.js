import urls from  '../../utils/urls.js';
import request from '../../utils/network.js';
var utils = require ('../../utils/util.js');
var bmap = require('../../libs/bmap-wx.min');
const app = getApp();
var baseURL= app.globalData.baseMVCURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseURL:baseURL,
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
      url:urls.data.GetBanners
    }).then(res=>{
      if(res.errCode==0){
        this.setData({
          Banners:res.data,
        })
      }
    })

    request({
      url:urls.data.GetDoors,
      method:'post',
    }).then(res=>{
      if(res.errCode==0)
        this.setData({
          Doors:res.data
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
    console.log('onReachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('onShareAppMessage')
  },
  onScan(option){
    utils.scan_event(option);
  },
  onDoorNav(e){
    var doorId = e.currentTarget.dataset.doorId;
    wx.navigateTo({
      url:`../Lesson/Lesson?doorId=${doorId}`
    })
  },
  bindRegionChange(e){
    this.setData({
      Region: e.detail.value,
      Position: e.detail.value[0]+'-'+ e.detail.value[1]+'-'+ e.detail.value[2]
    })
  }
})