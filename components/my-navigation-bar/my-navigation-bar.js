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