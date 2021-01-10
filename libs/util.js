// 时间格式转换 yyyy/mm/dd
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 时间格式转换 yyyy－mm－dd
function formatTime2(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-')
}

function formatDate(date, split) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join(split || '')
}

// 两位数自动补零
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 两位数以内的数字自动补零
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 计算变化多少天后的日期
function DateAddDay(d, days) {

  var d = new Date(d);
  return new Date(d.setDate(d.getDate() + days));
}
// 获得本周周日的日期
function FirstDayInThisWeek(d) {

  var d = new Date(d);
  // console.log(formatTime(DateAddDay(d, 0 - d.getDay())));
  return DateAddDay(d, 0 - d.getDay());
}

// 判断类型
function Type(obj) {
  var typeStr = Object.prototype.toString.call(obj).split(" ")[1];
  return typeStr.substr(0, typeStr.length - 1).toLowerCase();
}
function toWeekDay(weekDay) {// 传入数据  讲一周的某一天返回成中文状态下的字符
  switch (weekDay) {
    case 1: return '一'; break;
    case 2: return '二'; break;
    case 3: return '三'; break;
    case 4: return '四'; break;
    case 5: return '五'; break;
    case 6: return '六'; break;
    case 0: return '日'; break;
    default: break;
  }
  return '传入未知参数';
}
function dateFormat(fmt, date) {
  let ret;
  const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
  };
  return fmt;
}
module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  formatTime2,
  DateAddDay: DateAddDay,
  FirstDayInThisWeek: FirstDayInThisWeek,
  type: Type,
  addZero: formatNumber,
  toWeekDay: toWeekDay,
  dateFormat:dateFormat
}