// Components/SwiperCalender/index.js
 var util  = require('../../libs/util.js')
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
      this.setData({
        currentday:this.GetCurrentDay(new Date())
      })
      let _start= this.data.StartDay ?new Date( this.data.StartDay ) : new Date();
      this.onGenerateDate(_start)
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
    onGenerateDate(dt){
      let ds = this.data.days;
      this.setData({
        SelectedDay: this.GetCurrentDay(new Date(dt)),
        daylist: this.GenerateDayList(dt, ds),
      })
    },
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
      obj.str_date = util.dateFormat("YYYY-mm-dd",dt);
      obj.week = '周' + util.toWeekDay(dt.getDay());
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
 
  }
})
