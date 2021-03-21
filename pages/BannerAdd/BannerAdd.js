// pages/BannerAdd/BannerAdd.js
import {Upload} from '../../utils/network.js';
import request from '../../utils/network.js';
import urls from '../../utils/urls.js';
const app = getApp();
const baseMVCURL = app.globalData.baseMVCURL;
const baseImgURL = app.globalData.baseImgURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseMVCURL: baseMVCURL,
    baseImgURL: baseImgURL,
    
    bannerId:'',

    imgs:[],
    img_type:0,
    img:'',
    url:'',
    sort:0,
    active:true,

    ISUPDATE:false,

    editImgs:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this;
    if(options.bannerId){
      wx.setNavigationBarTitle({
        title: '编辑Banner',
      });
      _that.setData({
        bannerId:options.bannerId
      });
      _that.GetBannerById();
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
  onImgTypeChanged(e){
    this.setData({
      img_type:e.detail.key,
      img:'',
    })
  },
  onLinkIput(e){
    this.setData({
      img:e.detail.value
    })
  },
  onImgBannerChangeTap(e){
    this.setData({
      imgs:e.detail.all
    })
  },
  onImgBannerRemoveTap(e){
    this.setData({
      imgs:e.detail.all
    })
  },
  onActiveChanged(e){
    this.setData({
      active:e.detail.key==1
    })
  },
  onSortIput(e){
    this.setData({
      sort:e.detail.all
    })
  },
  onJumpUrliput(e){
    this.setData({
      url:e.detail.value
    })
  },
  GetBannerById(){
    var _that = this;
    request({
      url:urls.Banner.GetBannerItem,
      data:{'id':_that.data.bannerId}
    }).then(res=>{
      if(res.data){
        this.setData({
          img_type:res.data.img_type,
          img:res.data.img,
          url:res.data.url,
          active:res.data.active,
          sort:res.data.sort,
          ISUPDATE:true,
          editImgs:_that.GenerateEditUrls(res.data.img),
        })
      }
    })
  },
  onSaveInfo(e){
    var _that = this;
    if(!_that.data.img && _that.data.imgs.length<=0){
      wx.showToast({
        title: 'Banner图片不能为空',
        icon:'none'});
        return;
    }

    var data = {
      id:_that.data.bannerId,
      img_type:_that.data.img_type,
      img:_that.data.img_type==0?_that.data.img:_that.data.imgs.join(),
      url:_that.data.url,
      sort:_that.data.sort,
      active:_that.data.active,
    }

    if(_that.data.img_type==1 && _that.data.imgs.length>0){
      Upload({
        filePaths:_that.GenerateImgStr(_that.data.imgs)
      }).then(res=>{
        if(res.length>0) data.img = res[0].src;
        _that.EndSave(data);
      })
    }else{
      _that.EndSave(data);
    }
  },
  GenerateImgStr(data){
    let imgstr= '';
    if(data.length>0)
    {
      imgstr= data.map(x=>{return x.url}).join()
    }
    return imgstr;
  },
  GenerateEditUrls(data){
    var arr = new Array();
    var baseurl = this.data.baseImgURL;
    if(data){
      let temp= data.split(',');
      for (let index = 0; index < temp.length; index++) {
        const element = temp[index];
        arr.push({ url: baseurl+element});
      }
    }
    return arr;
  },
  EndSave(data){
    var _that = this;
    var url = _that.data.ISUPDATE ? 
    urls.Banner.UpdateBanner:
    urls.Banner.CreateBanner;
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
      }else{
        setTimeout(() => {
          wx.showToast({
              title: res.msg,
              icon: 'none'
          })
      }, 500);
      }
    })

  }
})