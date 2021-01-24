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
    roleLst:[{"role":0,"name":"游客"},{"role":1,"name":"馆主"},{"role":3,"name":"管理员"},{"role":-1,"name":"拉黑"}],
    userRole:0,
    _showModel:false,
    _showModelTitle:'',
    _selectRole:'',
    _selectUid:'',

    _showModelRmk:false,
    _showModelRmkTitle:'',
    _showModelRmkValue:'',
    _showModelRmkUid:'',
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
    var rmk = e.currentTarget.dataset.rmk;
    var name = e.currentTarget.dataset.name;
    var _that = this;
    
    this.setData({
      _showModelRmk:true,
      _showModelRmkTitle:name,
      _showModelRmkValue:rmk==null?'':rmk,
      _showModelRmkUid:uid
    })

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
  onRemarkInput(e){
    var rmk = e.detail.value;
    this.setData({
      _showModelRmkValue:rmk
    })
  },
  onEditModel(e){
    var _that = this;
    var uid = e.currentTarget.dataset.id;
    var role = e.currentTarget.dataset.role;
    var name = e.currentTarget.dataset.name;
    this.setData({
      _showModel:true,
      userRole:role,
      _showModelTitle:name,
      _selectRole:role,
      _selectUid:uid,
    })
  },
  onArcClose(e){
    this.setData({
      userRole:0,
      _showModelTitle:'',
      _selectRole:'',
      _selectUid:''
    })
  },
  onArcRmkClose(e){
    this.setData({
      _showModelRmkTitle:'',
      _showModelRmkValue:'',
      _showModelRmkUid:'',
    })
  },
  bindEditRemark(e){
    var _that = this;
    request({
      url:urls.UInfo.RemarkUser,
      method:'post',
      data:{
        uid:_that.data._showModelRmkUid,
        rmk:_that.data._showModelRmkValue
      }
    }).then(res=>{
      if(res&& res.errCode==0){
        wx.showToast({
          title: '操作成功！',
          icon:'success'
        })
        setTimeout(() => {
          _that.setData({
            _showModelRmk:false,
            _showModelRmkValue:'',
          })
          _that.GetUserLst();
        }, 1000);
      }
      else{
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
      }
    })
  },
  bindAlloc(e){
    var _that = this;
    if(_that.data._selectUid!='' &&_that.data._selectRole!='' ){
      request({
        url:urls.UInfo.AllocRole,
        method:'post',
        data:{
          uid:_that.data._selectUid,
          role:_that.data._selectRole
        }
      }).then(res=>{
        if(res&& res.errCode==0){
          wx.showToast({
            title: '操作成功！',
            icon:'success'
          })
          setTimeout(() => {
            _that.setData({
              _showModel:false
            })
            _that.GetUserLst();
          }, 1000);
        }
        else{
          wx.showToast({
            title: res.msg,
            icon:'none'
          })
        }
      })
    }
  },
  onRoleChanged(e){
    var role = e.detail.currentKey;
    this.setData({
      _selectRole:role
    })
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