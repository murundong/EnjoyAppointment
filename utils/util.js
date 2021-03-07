const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}



const scan_event = e => {
  wx.scanCode({
    onlyFromCamera: true,
    success: res => {
      if (res.result != null && res.result != '') {
        try {
          var course= JSON.parse( res.result );
          console.log(course);
          if(course.cid){
            wx.navigateTo({
              url: `../Sign/Sign?cid=${course.cid}`,
            })
          }
          else{
            wx.showToast({
              title: '请扫描正确的二维码！',
              icon:'none'
            })
          }
        } catch (error) {
          wx.showToast({
            title: '请扫描正确的二维码！',
            icon:'none'
          })
        }
      }
    },
    fail: res => {
      wx.showToast({
        title: '请扫描正确的二维码！',
        icon:'none'
      })
    }
  })
}
module.exports = {
  formatTime: formatTime,
  scan_event: scan_event
}
