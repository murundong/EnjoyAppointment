import urls from './urls.js';

const app = getApp();
const BaseURL = app.globalData.baseURL;
const BaseMVCURL = app.globalData.baseMVCURL;
export async function Upload(option) {
    var endData = new Array();
    if (option.filePaths == undefined || option.filePaths == '') return endData;
    var filePaths = option.filePaths.trim().split(',');
  
    //循环
    wx.showLoading({
      title: `正在上传……`
    })
    for (var i = 0; i < filePaths.length; i++) {
      var index = i;

      if(filePaths[i].indexOf(BaseMVCURL)>=0){

        var fileRes = {
          org: filePaths[index],
          src: filePaths[i].replace(BaseMVCURL,'')
        };
        endData.push(fileRes);
        continue;
      }
      
      await new Promise((resolve, reject) => {
        wx.uploadFile({
          filePath: filePaths[i],
          name: 'upload',
          url: BaseMVCURL + urls.process.MvcUploadFile,
          success: function (res) {
            var fileRes = {
              org: filePaths[index],
              src: JSON.parse(res.data).data
            };
            endData.push(fileRes);
            resolve(res.data);
          },
          fail: function (error) {
            reject(error);
          },
          complete: function () {}
        })
      })
    }
    wx.hideLoading();
    return endData;
}

export default function request(option) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中……',
    })
    wx.request({
      url: BaseURL + option.url,
      method: option.method || 'get',
      data: option.data || {},
      success: function (res) {
        wx.hideLoading();
        resolve(res.data);
      },
      fail: function (error) {
        wx.hideLoading();
        reject(error);
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  })

}
