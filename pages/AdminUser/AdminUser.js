// pages/AdminUser/AdminUser.js
import request from '../../utils/network.js';
import urls from '../../utils/urls.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nick:'',
    scrollTop: 0,
    slideData:[],
    userLst:[],
    scrollTop:0,
    roleLst:[{"role":-1,"name":"拉黑"},{"role":0,"name":"普通会员"},{"role":1,"name":"馆主"},{"role":3,"name":"管理员"}],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.GetUserLst();
  },
  onNickInput(e){
    var input = e.detail.value;
    this.setData({
      nick:input
    })
    this.GetUserLst();
  },
  onSlideEdit(e){
    var uid = e.currentTarget.dataset.id;
    var _that = this;
    console.log(uid);
  },
  onImgShow(e){
    var src = e.currentTarget.dataset.src;
    var srcArr = new Array();
    srcArr.push(src);
    wx.previewImage({
      urls: srcArr,
      current: src
    })
  },
  onEditModel(e){
    var uid = e.currentTarget.dataset.id;
    var role = e.currentTarget.dataset.role;
    // wx.lin.showActionSheet({
    //   title: '选择下列角色：',
    //   itemList: [{
    //     name: '系统管理员',
    //     icon: 'success',
    //     imageStyle:'width:40rpx;height:100rpx;',
    //     color:'#ff6f11'
    //   },
    //   {
    //     name: '馆主',
    //     icon: ''
    //   },
    //   {
    //     name: '拉黑',
    //     icon: ''
    //   }],
    //   success(res){
    //     console.log(res);
    //   }
    // })
   
  },
  onPageScroll(res) {
    // this.setData({
    //   scrollTop: res.scrollTop,
    // })
    //wx.lin.setScrollTop(res.scrollTop)
  },
  GetUserLst(){
    var _that = this;
    request({
      url:`${urls.UInfo.GetUserLst_Admin}?nick=${_that.data.nick}`
    }).then(res=>{
      if(res.errCode==0){
        _that.setData({
          slideData:res.data.initials,
          userLst:res.data.uinfos
        })
      }
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

  }
})