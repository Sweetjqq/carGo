// pages/mine/rank.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true
  },
  properties: {
    "rankTitle": {
      type: String,
      value: ""
    },
    "allNum": {
      type: Number,
      value: 0
    },
    "currNum": {
      type: Number,
      value: 0
    },
    "isLine": {
      type: Boolean,
      value: false
    }
  },
  ready() {
    let query = wx.createSelectorQuery().in(this);
    query.select('#num').boundingClientRect((rect) => {
      this.setData({
        numWidth: rect.width * wx.pixelRatio
      })
    }).exec();
  },
  observers: {
    'allNum, currNum': function (allNum, currNum) {
      // 异常数据处理
      if (currNum > allNum) {
        currNum = allNum;
      }
      let percentage = (currNum / allNum) * 622;
      this.setData({
        percentage
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    percentage: 0,
    numWidth: 10
  },

  /**
   * 组件的方法列表
   */
  methods: {
    numHandle() {

    },
  }
})