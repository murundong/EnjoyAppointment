// pages/SystemDoorManage/SystemDoorManage.js
import urls from '../../utils/urls';
import request from '../../utils/network.js';
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
      _noData:false,
    Doors:[]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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
      url:urls.data.GetAdminAllDoors,
      method:'post',
      data: {
        page_index:this.data.pageIndex,
        page_size:this.data.pageSize,
      }
    }).then(res=>{
      if(res.errCode==0){
        this.setData({
          Doors:res.data.data,
          _noData:res.data.total <=0,
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
		if(this.data.pageIndex >= this.data.pageTotal){
      wx.showToast({
        title: '没有更多数据了',
        icon:'none',
        duration:2000
      })
    }
    else{
      this.data.page_index++;
      request({
        url:urls.data.GetAdminAllDoors,
        method:'post',
        data: {
          page_index:this.data.pageIndex,
          page_size:this.data.pageSize
        }
      }).then(res=>{
        if(res.errCode==0){
          this.setData({
            Doors:res.data.data,
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
	onDoorTap(e){
    var _that = this;
    var doorId = e.currentTarget.dataset.id;
    var doorName = e.currentTarget.dataset.name;
    //'../Manage/Manage?doorId='+doorId,
    wx.navigateTo({
      url: `../Manage/Manage?doorId=${doorId}&doorName=${doorName}`
    })
  }
})