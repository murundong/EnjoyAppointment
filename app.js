//app.js
import urls from './utils/urls.js';
App({
  onLaunch: function () {

    //启动时更新
    const updateManager = wx.getUpdateManager();
    const _that = this;
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已准备好,是否重启应用?',
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        }
      })
    })

    // 登录
    wx.login({
      success: res_login => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: _that.globalData.baseURL + urls.data.GetOpenidByCode,
          method: 'get',
          data: { code: res_login.code },
          success: function (res_getopenid) {
            var openid = res_getopenid.data.openid;
            var sk = res_getopenid.data.session_key;
            wx.setStorage({
              data: openid,
              key: 'loginSessionKey',
            })
            wx.getSetting({
              success: res_setting => {
                if (res_setting.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    success: res_uinfo => {
                      // 可以将 res 发送给后台解码出 unionId
                      wx.request({
                        url: _that.globalData.baseURL + urls.data.UpdateUserInfoHome,
                        method: 'post',
                        data: {
                          'nick_name': res_uinfo.userInfo.nickName,
                          'avatar': res_uinfo.userInfo.avatarUrl,
                          'gender': res_uinfo.userInfo.gender,
                          'open_id': openid
                        },
                        success:function(res_saved){
                          if(res_saved.data.errCode==0){
                            _that.globalData.userInfo = res_saved.data.data
                          }
                        }
                      })
                      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                      // 所以此处加入 callback 以防止这种情况
                      if (_that.userInfoReadyCallback) {
                        _that.userInfoReadyCallback(res_setting)
                      }
                    }
                  })
                }
                else{
                  wx.showModal({
                    title:'提示',
                    content:'该小程序需要用户授权后方可使用所有功能，请切换到 “我的” 点击授权,或稍后再试！',
                    confirmText:'确认',
                    showCancel:false,
                    confirmColor:'#ff6f11',
                    success(res){
                      if (res.confirm) {
                        wx.switchTab({
                          url: '/pages/mine/mine',
                        })
                      } 
                    }
                  })
                }
              }
            })

          }
        })
      }
    })

  },

  globalData: {
    userInfo: null,
    baseURL: 'http://localhost:54688/',
    baseMVCURL:'http://localhost:54688/',

    //baseImgURL:'http://localhost:54180/',

    // baseURL: 'https://www.appoint.icu/',
    // baseMVCURL: 'https://www.appoint.icu/',
    baseImgURL:'https://static.appoint.icu/',
  }
})