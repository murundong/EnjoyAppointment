// Components/CardComp/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardInfo: Object,
    baseImgURL:String,
    ClickEdit:{
      type:Boolean,
      value:false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    ShowPopUp:false,
    ShowPopupData:Object,
  },
  lifetimes: {
    attached() {
      
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
    onTapEdit(e) {
      this.triggerEvent("onTapEdit", {
        obj: this.data.ShowPopupData
      });
    },
    onTapDelet(e){
      this.triggerEvent("onTaDel", {
        obj: this.data.ShowPopupData
      });
    },
    onItemTap(e){
      var _that = this;
      if(!_that.data.ClickEdit) return;
      var obj = e.currentTarget.dataset.obj;
      this.setData({
        ShowPopUp:true,
        ShowPopupData:obj,
      })
    }
  }
})
