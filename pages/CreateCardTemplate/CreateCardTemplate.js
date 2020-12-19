import request from '../../utils/network.js';
import urls from '../../utils/urls.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _cardId:'',
    _doorId:'',
    cardName:'',
    cardType:0,
    cardDesc:'',
    cardTypeRange:[{
      key:1,
      value:'次卡'
    },{
      key:2,
      value:'年卡'
    },{
      key:3,
      value:'半年卡'
    },{
      key:4,
      value:'季卡'
    },{
      key:5,
      value:'月卡'
    },{
      key:6,
      value:'体验卡'
    },{
      key:7,
      value:'私教卡'
    },{
      key:8,
      value:'时效卡'
    },{
      key:9,
      value:'储值卡'
    }],
    ISUPDATE:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this;
    this.data._doorId = options.doorId;
    if(options.cardId){
      wx.setNavigationBarTitle({
        title: '编辑卡片模板',
      })
      request({
        url:urls.cardTemplate.GetCardTemplateById,
        data:{'cardId':options.cardId},
      }).then(res=>{
        if(res.data){
          this.setData({
            _cardId:options.cardId,
            cardName:res.data.card_name,
            cardType:res.data.card_type,
            cardDesc:res.data.card_desc,
            ISUPDATE:true
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
      cardName:e.detail.value
    })
  },
  onDesciput(e){
    this.setData({
      cardDesc:e.detail.value
    })
  },
  bindTypeChange(e){
    this.setData({
      cardType:e.detail.value
    })
  },
  onSaveInfo(e){
    var _that = this;

    if(!this.data.cardName){
      wx.showToast({
        title: '卡片名称不能为空',
        icon:'none'});
        return;
    }

    var data={
      id:_that.data._cardId,
      door_id:_that.data._doorId,
      card_name:_that.data.cardName,
      card_type:_that.data.cardType,
      card_desc:_that.data.cardDesc,
      create_openid:wx.getStorageSync('loginSessionKey')
    }
    var  url = _that.data.ISUPDATE?urls.cardTemplate.UpdateCardtemplate
    :urls.cardTemplate.CreateCardTempalte;
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
    })
  }
})