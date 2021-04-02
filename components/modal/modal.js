// components/modal/modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    options: {
      type: Object,
      value: {
        title:'提交成功',
        show:false,
        mdMessage:['系统繁忙请稍后再试'],
        icon:'success'
      }
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
    onTap: function () {
      this.triggerEvent('myevent')
    }
  }
})