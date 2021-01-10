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



 const scan_event= e=>{
  wx.scanCode({
    onlyFromCamera: true,
    success:res=>{
      console.log(res)
      wx.navigateTo({
        url: `../Sign/Sign?cid=1`,
      })
    }
  })
}
module.exports = {
  formatTime: formatTime,
  scan_event:scan_event
}
