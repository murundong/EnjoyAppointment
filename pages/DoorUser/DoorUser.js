// pages/DoorUser/DoorUser.js
import request from '../../utils/network.js';
import urls from '../../utils/urls.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _doorId:'',
    nick:'',
    slideData:[],
    userLst:[],

    _showModel:false,
    _showModelData:Object,
    _showModelRmk:false,
    _showModelRmkValue:'',
    _showModelUinfo:false,
    _showModeUinfoAge:'',
    _showModelRole:false,
    _selectRole:'',
    roleLst:[{"role":0,"name":"游客"},{"role":1,"name":"馆主"},{"role":2,"name":"教职工"},{"role":4,"name":"持卡会员"},{"role":-1,"name":"拉黑"}],
    myselfuid:'',
    myselfrole:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      _doorId:options.doorId,
      myselfuid:app.globalData.userInfo.uid
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
    this.GetUserLst();
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
   GetUserLst(){
    var _that = this;
    request({
      url:urls.UInfo.GetUserLst_Door,
      data:{
        doorid:_that.data._doorId,
        nick:_that.data.nick
      }
    }).then(res=>{
      if(res.errCode==0){
        _that.setData({
          slideData:res.data.initials,
          userLst:res.data.uinfos
        })
        res.data.uinfos.filter(item=>{
          item.uinfos.filter(s=>{
            if(s.uid == _that.data.myselfuid){
              _that.setData({
                myselfrole:s.door_role
              })
            }
          })
        });
      }
    })
  },
  onNickInput(e){
    var input = e.detail.value;
    this.setData({
      nick:input
    })
    this.GetUserLst();
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
  onEditUser(e){
    var obj =e.currentTarget.dataset.obj;
    this.setData({
      _showModel:true,
      _showModelData:obj,
      _selectRole:obj.door_role,
    })
  },
  onArcClose(e){
    // this.setData({
    //   _showModelData:null
    // })
  },
  onLstRmk(e){
    var _that = this;
    this.setData({
      _showModelRmk:true,
      _showModelRmkValue:_that.data._showModelData.door_remark==null?'':_that.data._showModelData.door_remark
    })
  },
  onLstAllocCard(e){
      wx.navigateTo({
      url: `../UserCards/UserCards?id=${this.data._showModelData.id}&uid=${this.data._showModelData.uid}&doorId=${this.data._doorId}&uname=${(this.data._showModelData.door_remark!=null &&this.data._showModelData.door_remark!='')? this.data._showModelData.door_remark:this.data._showModelData.nick_name}`,
    })
  },
  onLstUserCard(e){

  },
  onLstAllocRole(e) {
    var arr = [-1,0,4];
    if (app.globalData.userInfo.role != 3) {
      if (this.data.myselfuid == this.data._showModelData.uid) {
        wx.showToast({
          title: '不能对自身角色进行操作！',
          icon: 'none'
        })
        return;
      }
      else if(this.data.myselfrole!=1 && arr.indexOf(this.data._showModelData.door_role)<0)
      {
        wx.showToast({
          title: '没有足够的操作权限！',
          icon: 'none'
        })
        return;
      }
    } 
    this.setData({
      _showModelRole: true
    })
  },
  onLstStatic(e){

  },
  onLstUinfo(e){
    var _that = this;
    this.setData({
      _showModelUinfo:true,
      _showModeUinfoAge:_that.data._showModelData.str_birthday==null?'':(new Date().getFullYear()-new Date(_that.data._showModelData.str_birthday).getFullYear())
    })
  },
  onRemarkInput(e){
    var rmk = e.detail.value;
    this.setData({
      _showModelRmkValue:rmk
    })
  },
  bindEditRemark(e){
    var _that = this;
    request({
      url:urls.UInfo.RemarkUser,
      method:'post',
      data:{
        uid:_that.data._showModelData.id,
        rmk:_that.data._showModelRmkValue,
        isMain:false
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
  onRoleChanged(e){
    var role = e.detail.currentKey;
    this.setData({
      _selectRole:role
    })
  },
  bindAlloc(e){
    var _that = this;
    var arr = [-1,0,4];
    if (app.globalData.userInfo.role != 3) {
      if (this.data.myselfuid == this.data._showModelData.uid) {
        wx.showToast({
          title: '不能对自身角色进行操作！',
          icon: 'none'
        })
        return;
      }
      else if(this.data.myselfrole!=1 
        &&arr.indexOf(this.data._showModelData.door_role)<0)
      {
        wx.showToast({
          title: '没有足够的操作权限！',
          icon: 'none'
        })
        return;
      }
      else if (this.data.myselfrole!=1 &&
        arr.indexOf(parseInt( this.data._selectRole))<0){
          wx.showToast({
            title: '没有足够的操作权限！',
            icon: 'none'
          })
          return;
        }
    } 


    // if(app.globalData.userInfo.role!=3 && _that.data._showModelData.door_role==1){
    //   wx.showToast({
    //     title: '馆主的角色不能被更改！',
    //     icon:'none'
    //   })
    //   return;
    // }
    if(_that.data._showModelData.id!='' &&_that.data._selectRole!='' ){
      request({
        url:urls.UInfo.AllocRole,
        method:'post',
        data:{
          uid:_that.data._showModelData.id,
          role:_that.data._selectRole,
          isMain:false,
        }
      }).then(res=>{
        if(res&& res.errCode==0){
          wx.showToast({
            title: '操作成功！',
            icon:'success'
          })
          setTimeout(() => {
            _that.setData({
              _showModelRole:false
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
})