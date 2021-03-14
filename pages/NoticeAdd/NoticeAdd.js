// pages/NoticeAdd/NoticeAdd.js
import urls from '../../utils/urls';
import request from '../../utils/network.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    _noticeId: 0,

    _doorId: '',
    _doorName: '',
    ISUPDATE: false,

    title: '',
    msg: '',
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data._doorId = options.doorId;
    this.data._doorName = options.doorName;
    this.data._noticeId = options.noticeId;
    if (options.noticeId) {
      wx.setNavigationBarTitle({
        title: `编辑公告`,
      })
      this.setData({
        ISUPDATE:true,
      })
      this.GetNoticeItem();
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
  onTitleiput(e) {
    this.setData({
      title: e.detail.value
    })
  },
  onMsgiput(e) {
    this.setData({
      msg: e.detail.value
    })
  },
  onSaveInfo() {
    if (!this.data.title) {
      wx.showToast({
        title: '公告标题不能为空',
        icon: 'none'
      });
      return;
    }
    var _that = this;
    var url = _that.data.ISUPDATE ?
      urls.Notice.UpdateDoorNotice :
      urls.Notice.CreateDoorNotice;
    request({
      url: url,
      method: 'post',
      data: {
        door_id: _that.data._doorId,
        du_id: app.globalData.userInfo.uid,
        title: _that.data.title,
        msg: _that.data.msg,
        id:_that.data._noticeId,
      }
    }).then(res => {
      if (res.errCode == 0) {
        wx.showToast({
          title: '保存成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 0,
          })
        }, 1000);
      }
      else {
        setTimeout(() => {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }, 500);
      }
    })
  },
  GetNoticeItem() {
    var _that = this;
    request({
      url: urls.Notice.GetDoorNoticeItem,
      data: { id: _that.data._noticeId }
    }).then(res => {
      if (res.errCode == 0) {
        _that.setData({
          msg: res.data.msg,
          title: res.data.title
        })
      }
      else {
        setTimeout(() => {
          wx.showToast({
            title: res.msg,
          })
        }, 500);
      }
    })
  }
})