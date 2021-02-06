// pages/SendUserCards/SendUserCards.js
import urls from '../../utils/urls';
import request from '../../utils/network.js';
import { dateFormat } from '../../libs/util.js';
var util = require('../../libs/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _uid: '',
    _doorId: '',
    _dcid: '',
    _ISUPDATE: false,
    _cardTemplate: [],
    baseImgURL: app.globalData.baseImgURL,
    SelectCardValue: 0,
    SelectStTime: '',
    SelectEdTime: '',
    CopyEdTime: '',
    SelectCardTemplate: [],
    FreezeChecked: false,
    AutoEdtimeExtend: true,
    FreezeEdTime: '',
    limit_week_time: '',
    limit_day_time: '',
    effective_time: '',

    avatar: '',
    door_remark: '',
    nick_name: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var now = new Date();
    this.setData({
      _uid: options.uid,
      _doorId: options.doorId,
      SelectStTime: util.dateFormat("YYYY-mm-dd", now),
      _dcid: options.dcid
    })
    if (options.dcid) {
      this.setData({ _ISUPDATE: true });
      this.GetUserCardsInfo();
    }
    else {
      this.GetDoorCardTemplates();
      this.GetUserInfo();
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
  GetDoorCardTemplates() {
    var _that = this;
    request({
      url: urls.Cards.GetDoorCardTemplates,
      method: 'post',
      data: {
        doorId: _that.data._doorId
      }
    }).then(res => {
      var arr = [];
      var obj = new Object();
      obj.limit_week_time = 0;
      obj.limit_day_time = 0;
      if (res.data.length > 0) {
        obj.door_img = res.data[0].door_img;
        obj.card_desc = res.data[0].card_desc;
        obj.card_name = res.data[0].card_name;
        obj.str_ctype = res.data[0].str_ctype;
      }
      obj.str_card_edtime = _that.data.SelectEdTime;
      obj.effective_time = 0;
      arr.push(obj);
      _that.setData({
        _cardTemplate: res.data,
        SelectCardTemplate: arr
      })
    })
  },
  GetUserCardsInfo() {
    var _that = this;
    request({
      url: urls.Cards.GetDoorCardTemplates,
      method: 'post',
      data: {
        doorId: _that.data._doorId
      }
    }).then(res => {
      _that.setData({
        _cardTemplate: res.data,
      })
      //----------------
      request({
        url: urls.UInfo.GetUserCardsInfo,
        method: 'post',
        data: {
          id: _that.data._dcid
        }
      }).then(res => {
        if (res.errCode == 0 && res.data) {
          var _index = _that.data._cardTemplate.indexOf(_that.data._cardTemplate.filter(s => s.id == res.data.cid)[0]);
          var arr = [];
          var obj = new Object();
          obj.limit_week_time = res.data.limit_week_time;
          obj.limit_day_time = res.data.limit_day_time;
          obj.door_img = _that.data._cardTemplate[_index].door_img;
          obj.card_desc = _that.data._cardTemplate[_index].card_desc;
          obj.card_name = _that.data._cardTemplate[_index].card_name;
          obj.str_ctype = _that.data._cardTemplate[_index].str_ctype;
          obj.str_card_edtime = res.data.str_card_edtime;
          obj.effective_time = res.data.effective_time;
          obj.is_freeze = res.data.is_freeze;
          obj.str_freeze_edtime = res.data.str_freeze_edtime;
          arr.push(obj);
          _that.setData({
            SelectStTime: res.data.str_card_sttime,
            SelectEdTime: res.data.str_card_edtime,
            CopyEdTime: res.data.str_card_edtime,
            FreezeChecked: res.data.is_freeze,
            FreezeEdTime: res.data.str_freeze_edtime,
            limit_week_time: res.data.limit_week_time,
            limit_day_time: res.data.limit_day_time,
            effective_time: res.data.effective_time,
            avatar: res.data.avatar,
            SelectCardValue: _index,
            door_remark: res.data.door_remark,
            nick_name: res.data.nick_name,
            SelectCardTemplate: arr
          })
        }
      })
      //---------------
    })
  },
  GetUserInfo() {
    var _that = this;
    request({
      url: urls.Cards.GetDoorUserInfo,
      method: 'post',
      data: {
        id: _that.data._uid
      }
    }).then(res => {
      if (res.data) {
        _that.setData({
          avatar: res.data.avatar,
          door_remark: res.data.remark,
          nick_name: res.data.nick_name
        })
      }
    })
  },
  onCardPickerChanged(e) {
    var selectTemp = this.data.SelectCardTemplate;
    if (selectTemp.length > 0) {
      selectTemp[0].card_desc = this.data._cardTemplate[e.detail.value].card_desc;
      selectTemp[0].card_name = this.data._cardTemplate[e.detail.value].card_name;
      selectTemp[0].str_ctype = this.data._cardTemplate[e.detail.value].str_ctype;
      this.setData({
        SelectCardValue: e.detail.value,
        SelectCardTemplate: selectTemp
      })
    }
  },
  onStTimeChanged(e) {
    this.setData({
      SelectStTime: e.detail.value,
    })
  },
  onFreezeEndChanged(e) {
    var _that = this;
    this.setData({
      FreezeEdTime: e.detail.value,
    })
    if (this.data.AutoEdtimeExtend && this.data.SelectEdTime != '') {
      //自动帮计算卡片截止日期
      var now = new Date();
      //当前时间紧
      now = new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`);
      //选择的冻结截止日期
      var select = new Date(e.detail.value);
      select = new Date(`${select.getFullYear()}-${select.getMonth() + 1}-${select.getDate()}`);
      //冻结到当前时间的差值（天）
      var diffDay = parseInt((select - now) / 1000 / 86400);
      //会员卡的截止时间
      var selectEdDay = new Date(this.data.CopyEdTime);
      selectEdDay = new Date(`${selectEdDay.getFullYear()}-${selectEdDay.getMonth() + 1}-${selectEdDay.getDate()}`);
      selectEdDay.setDate(selectEdDay.getDate() + diffDay);
      this.setData({
        SelectEdTime: util.dateFormat("YYYY-mm-dd", selectEdDay),
      })
      var selectTemp = this.data.SelectCardTemplate;
      if (selectTemp.length > 0) {
        selectTemp[0].str_card_edtime = this.data.SelectEdTime;
        selectTemp[0].str_freeze_edtime = e.detail.value;
        this.setData({
          SelectCardTemplate: selectTemp
        })
      }
    }
    var selectTemp = this.data.SelectCardTemplate;
    if (selectTemp.length > 0) {
      selectTemp[0].str_freeze_edtime = e.detail.value;
      this.setData({
        SelectCardTemplate: selectTemp
      })
    }
  },
  onAutoEdtimeChanged(e) {
    var _that = this;
    this.setData({
      AutoEdtimeExtend: e.detail.value,
      SelectEdTime:_that.data.CopyEdTime,
    })
    var selectTemp = this.data.SelectCardTemplate;
    if (selectTemp.length > 0) {
      selectTemp[0].str_card_edtime = _that.data.CopyEdTime;
      this.setData({
        SelectCardTemplate: selectTemp
      })
    }
  },
  onEdTimeChanged(e) {
    this.setData({
      SelectEdTime: e.detail.value,
      CopyEdTime: e.detail.value,
    })

    var selectTemp = this.data.SelectCardTemplate;
    if (selectTemp.length > 0) {
      selectTemp[0].str_card_edtime = e.detail.value
      this.setData({
        SelectCardTemplate: selectTemp
      })
    }
  },
  onEffectTimes(e) {
    this.setData({
      effective_time: e.detail.value
    })

    var selectTemp = this.data.SelectCardTemplate;
    if (selectTemp.length > 0) {
      selectTemp[0].effective_time = e.detail.value
      this.setData({
        SelectCardTemplate: selectTemp
      })
    }
  },
  onLimitWeekTimes(e) {
    this.setData({
      limit_week_time: e.detail.value
    })
    var selectTemp = this.data.SelectCardTemplate;
    if (selectTemp.length > 0) {
      selectTemp[0].limit_week_time = e.detail.value
      this.setData({
        SelectCardTemplate: selectTemp
      })
    }
  },
  onLimitDayTimes(e) {
    this.setData({
      limit_day_time: e.detail.value
    })

    var selectTemp = this.data.SelectCardTemplate;
    if (selectTemp.length > 0) {
      selectTemp[0].limit_day_time = e.detail.value
      this.setData({
        SelectCardTemplate: selectTemp
      })
    }
  },
  onFreezeChanged(e) {
    var freeze = e.detail.value;
    this.setData({
      FreezeChecked: freeze,
    })
    var selectTemp = this.data.SelectCardTemplate;
    var copyFreezeEdTime = this.data.FreezeEdTime;
    if (selectTemp.length > 0) {
      selectTemp[0].is_freeze = e.detail.value
      selectTemp[0].str_freeze_edtime = !freeze ? '' : selectTemp[0].str_freeze_edtime;
      this.setData({
        SelectCardTemplate: selectTemp,
        FreezeEdTime: !freeze ? '' : copyFreezeEdTime
      })
    }
  },
  onEdTimeClear(e) {
    this.setData({
      SelectEdTime: '',
      CopyEdTime: '',
    })
    var selectTemp = this.data.SelectCardTemplate;
    if (selectTemp.length > 0) {
      selectTemp[0].str_card_edtime = ''
      this.setData({
        SelectCardTemplate: selectTemp
      })
    }
  },
  onFreezeEdTimeClear(e) {
    this.setData({
      FreezeEdTime: ''
    });
    var selectTemp = this.data.SelectCardTemplate;
    if (selectTemp.length > 0) {
      selectTemp[0].str_freeze_edtime = ''
      this.setData({
        SelectCardTemplate: selectTemp
      })
    }
  },
  bindSubmit(e) {
    var _that = this;
    wx.showModal({
      title: '确认',
      content: '确认会员卡的类型,开始/截止日期、限制次数 等相关信息！',
      confirmText: '我已确认',
      confirmColor: '#ff6f11',
      success(res) {
        if (res.confirm) {
          if (_that.data._ISUPDATE) _that.UpdateSubmit();
          else _that.RealSubmit();
        }
      }
    })
  },
  RealSubmit(e) {
    var _that = this;
    if (_that.data._cardTemplate.length <= 0) {
      wx.showToast({
        title: '请先去设置卡片模板！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_that.data.SelectEdTime == '' && (_that.data.effective_time == null || _that.data.effective_time == '')) {
      wx.showToast({
        title: '会员卡截止日期和有效次数至少需要填一个！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    var data = {
      door_id: _that.data._doorId,
      du_id: _that.data._uid,
      cid: _that.data._cardTemplate[_that.data.SelectCardValue].id,
      uid:_that.data.UID,
      ctype: _that.data._cardTemplate[_that.data.SelectCardValue].card_type,
      card_sttime: _that.data.SelectStTime,
      card_edtime: _that.data.SelectEdTime,
      effective_time: _that.data.effective_time,
      limit_week_time: _that.data.limit_week_time,
      limit_day_time: _that.data.limit_day_time,
      is_freeze: _that.data.FreezeChecked,
      freeze_edtime: _that.data.FreezeEdTime,
    }
    console.log(data);
    request({
      url: urls.Cards.AddUserACard,
      method: 'post',
      data: data
    }).then(res => {
      if (res.errCode == 0) {
        wx.showToast({
          title: '操作成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 0,
          })
        }, 1000);
      }
      else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 3000
        })
      }
    })
  },
  UpdateSubmit() {
    var _that = this;
    if (_that.data._cardTemplate.length <= 0) {
      wx.showToast({
        title: '请先去设置卡片模板！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (_that.data.SelectEdTime == '' && (_that.data.effective_time == null || _that.data.effective_time == '')) {
      wx.showToast({
        title: '会员卡截止日期和有效次数至少需要填一个！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    var data = {
      id:_that.data._dcid,
      cid: _that.data._cardTemplate[_that.data.SelectCardValue].id,
      ctype: _that.data._cardTemplate[_that.data.SelectCardValue].card_type,
      card_sttime: _that.data.SelectStTime,
      card_edtime: _that.data.SelectEdTime,
      effective_time: _that.data.effective_time,
      limit_week_time: _that.data.limit_week_time,
      limit_day_time: _that.data.limit_day_time,
      is_freeze: _that.data.FreezeChecked,
      freeze_edtime: _that.data.FreezeEdTime,
    }
    request({
      url: urls.Cards.UpdateUserCardsInfo,
      method: 'post',
      data: data
    }).then(res => {
      if (res.errCode == 0) {
        wx.showToast({
          title: '操作成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 0,
          })
        }, 1000);
      }
      else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 3000
        })
      }
    })
  }
})