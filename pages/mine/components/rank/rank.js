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
  },
  ready(){
    const {
      allNum,
      currNum
    }=this.data;
    console.log(this.data)
   let percentage = (currNum/allNum)*622;
   this.setData(
    percentage
   )
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
    numHandle(){

    },
  }
})
