// Components/SwipperTopBar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    datalist:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    _selectedIndex:0,
    _selectedStr:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e){
      let index =e.currentTarget.dataset.index;
      let str = e.currentTarget.dataset.str;
      this.setData({
        _selectedIndex:index,
        _selectedStr:str
      })
      this.triggerEvent("onItemTap",{
        titemIndex:index,
        titemStr:str
      })
    },
    selectInit(index=0){
      this.setData({
        _selectedIndex:index
      })
    }
  }
 
})
