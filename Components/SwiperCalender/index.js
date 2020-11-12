// Components/SwiperCalender/index.js
// var utils = require('../../libs/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    days: {
      type: Number,
      value: 7
    }, //显示的总天数
    StartDay:String, //开始的第一天
  },
  /**
   * 组件的初始数据
   */
  data: {
    SelectedDay: Object,//默认选中的日期
    currentday: Object,//当前日期
    daylist: Object, //构造出来的日期列表
  },
  lifetimes: {
    attached() {
      let ds = this.data.days;
      let sd = this.data.StartDay ?new Date( this.data.StartDay ) : new Date();
      this.setData({
        currentday: this.GetCurrentDay(new Date()),
        SelectedDay: this.GetCurrentDay(new Date()),
        daylist: this.GenerateDayList(sd, ds),
      })
    },
  },
  pageLifetimes: {
    show() {
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function (event) {
      this.setData({
        SelectedDay:event.currentTarget.dataset.calenderItem
      })
      this.triggerEvent("onItemTap", {
        citem: event.currentTarget.dataset.calenderItem
      });
    },
    GetCurrentDay(dt) {
      let obj = {};
      obj.year = dt.getFullYear();
      obj.month = dt.getMonth() + 1;
      obj.day = dt.getDate();
      obj.week = '周' + this.toWeekDay(dt.getDay());
      return obj;
    },
    GenerateDayList(startdt, length) {
      let arr = new Array();

      for (let index = 0; index < length; index++) {
        let arr_item = this.GetCurrentDay(startdt);
        arr.push(arr_item);
        startdt = new Date(startdt.getTime() + 1000 * 60 * 60 * 24 * 1);
      }
      return arr;
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
