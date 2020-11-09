// pages/main/main.js

// var local_banner = require('../../MockData/data.js')
import {local_banners,local_doors} from '../../MockData/data.js'
var bmap = require('../../libs/bmap-wx.min');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     Banners:[],
     Doors:[],
     Region:[],
     Position:'',
  },

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      Banners:local_banners,
      Doors:local_doors.data,
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
  bindRegionChange(e){
    this.setData({
      Region: e.detail.value,
      Position: e.detail.value[0]+'-'+ e.detail.value[1]+'-'+ e.detail.value[2]
    })
  }
})