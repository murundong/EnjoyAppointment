// pages/CardTemplate/CardTemplate.js
import urls from '../../utils/urls';
import request from '../../utils/network.js';
const app = getApp();
const baseURL = app.globalData.baseMVCURL;
const baseImgURL = app.globalData.baseImgURL
Page({

  /**
   * 页面的初始数据
   */
  data: {
      baseURL: baseURL,
      baseImgURL: baseImgURL,
      _noData:false,
    pageIndex:1,
    pageSize:10,
    pageTotal:'',
    _doorId:'',
    _doorName:'',
    _img:'',
    cardTemplate:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data._doorId = options.doorId;
    this.data._doorName=options.doorName;
    wx.setNavigationBarTitle({
      title: `${options.doorName} 的卡片模板`,
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
    request({
      url:urls.cardTemplate.GetTemplates,
      method:'post',
      data: {
        page_index:this.data.pageIndex,
        page_size:this.data.pageSize,
        door_id: this.data._doorId
      }
    }).then(res=>{
      if(res.errCode==0){
        this.setData({
          _noData:res.data.total==0,
          cardTemplate:res.data.data.temps,
          _img:res.data.data.img,
          pageTotal:Math.floor(res.data.total /this.data.pageSize)
        })
      }
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
    if(this.data.pageIndex > this.data.pageTotal){
      wx.showToast({
        title: '没有更多数据了',
        icon:'none',
        duration:2000
      })
    }
    else{
      this.data.page_index++;
      request({
        url:urls.cardTemplate.GetTemplates,
        method:'post',
        data: {
          page_index:this.data.pageIndex,
          page_size:this.data.pageSize,
          door_id: this.data._doorId
        }
      }).then(res=>{
        if(res.errCode==0){
          this.setData({
            cardTemplate:res.data.data.temps,
            _img:res.data.data.img,
            pageTotal:Math.floor(res.data.total /this.data.pageSize)
          })
        }
      })
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onTemplateAdd(e){
    wx.navigateTo({
      url: '../CreateCardTemplate/CreateCardTemplate?doorId='+this.data._doorId,
    })
  },
  onCardTap(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../CreateCardTemplate/CreateCardTemplate?cardId=${id}&doorId=${this.data._doorId}`,
    })
  }
})