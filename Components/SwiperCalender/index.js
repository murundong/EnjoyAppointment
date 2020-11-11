// Components/SwiperCalender/index.js
// var utils = require('../../libs/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  
  /**
   * 组件的初始数据
   */
  data: {
    // defaultData:new Date().toLocaleDateString()
   
    testdata: [{
      week: '周二',
      date: '今'
    },
    {
      week: '周三',
      date: '11'
    },
    {
      week: '周四',
      date: '12'
    },
    {
      week: '周五',
      date: '13'
    },
    {
      week: '周六',
      date: '14'
    },
    {
      week: '周日',
      date: '15'
    },
    {
      week: '周一',
      date: '16'
    },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    weekDate: function () {
      //获取周数据
      var myDate = new Date();// hehe
      myDate.toLocaleDateString();
      var month = myDate.getMonth() + 1;
      var time = myDate.getFullYear() + '年' + month + '月' + myDate.getDate() + '日';
   
      var total = 1;// 个数
      var dayList = [];
      dayList.push({
        'day': myDate.getDate(),
        'month': myDate.getMonth() + total,
        'week': toWeekDay(myDate.getDay()),
        'year': myDate.getFullYear()
      });
      for (var i = 0; i < 6; i++) {
        myDate.setDate(myDate.getDate() + total); // number 是最近几天  则会自动计算
        // 需求  月份-日   星期几
        dayList.push({
          'day': myDate.getDate(),
          'month': myDate.getMonth() + total,
          'week': toWeekDay(myDate.getDay()),
          'year': myDate.getFullYear()
        });
      }
      return dayList;
    },
    toWeekDay(weekDay) {// 传入数据  讲一周的某一天返回成中文状态下的字符
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
  },
  }
})
