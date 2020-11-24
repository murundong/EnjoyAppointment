// Components/CardComp/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardTitle: String,
    cardInfo: Object,
    doorImg:String
  },

  /**
   * 组件的初始数据
   */
  data: {
  
  },
  lifetimes: {
    attached() {
      this.setData({
        cardTitle:'EnjoyYoga',
        doorImg:'http://img1.cache.netease.com/catchpic/A/A5/A5F8F7A546CF3CF7C0EF6F1D02AC94D5.jpg',
        cardInfo:{
          'card_id':1,
          'card_type':'年卡',
          'st_time':'2020/1/12',
          'ed_time':'2020/12/31',
          'times':-1,
          'perweek':-1,
          'peerday':-1,
        }
      })
    }
  },
  pageLifetimes: {
    show() {

    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
