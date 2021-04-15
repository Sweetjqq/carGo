// components/navigation-bar/navigation-bar.js
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
    },
    "isArc": {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    indexBarHeight: `${wx.navHeight+(268/wx.pixelRatio)}px`,
    myBarHeight: `${wx.navHeight+(140/wx.pixelRatio)}px`,
    topBar: `${wx.navTop}px`,
    menuButtonHeight: `${wx.BarHeight}px`,
    spaceHeight: `${wx.navHeight}px`
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})