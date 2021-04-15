// components/my-navigation-bar/my-navigation-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    "titleText": {
      type: String,
      value: "货客保"
    },
    "showIcon": {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
   barHeight:`${wx.navHeight}px`,
   topBar:`${wx.navTop}px`,
   menubtnHeight:`${wx.BarHeight}px`,
   loseTop:`-${wx.navTop}px`,
   iconTop:`${wx.navTop+wx.BarHeight/2}px`,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goBack: function () {
      wx.navigateBack({
        delta: 1
      })
    }
  }
})