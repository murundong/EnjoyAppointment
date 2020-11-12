// Components/SwiperCalender/index.js
// var utils = require('../../libs/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentday:Object,
    daylist:Object
  },
  lifetimes:{
    attached(){
      // console.log('attached',this)
      this.setData({
        currentday:this.GetCurrentDay(new Date()),
        daylist:this.GenerateDayList(new Date(),7)
      })
    },
  },
  pageLifetimes:{
    show(){
      // console.log('show',this)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap:function (event){
      this.triggerEvent("onItemTap",{
        citem:event.currentTarget.dataset.calenderItem
      });
    },
    GetCurrentDay(dt){
        let obj={};
        obj.year = dt.getFullYear();
        obj.month = dt.getMonth()+1;
        obj.day = dt.getDate();
        obj.week ='周'+ this.toWeekDay( dt.getDay());
        return obj;
    },
    GenerateDayList(startdt,length){
      let arr = new Array();
      
      for (let index = 0; index < length; index++) {
        let arr_item = this.GetCurrentDay(startdt);
        arr.push(arr_item);
        startdt= new Date( startdt.getTime()+1000*60*60*24*1);
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
