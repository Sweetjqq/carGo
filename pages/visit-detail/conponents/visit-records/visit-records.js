Component({
  /**
   * 组件的属性列表
   */
  properties: {
    customerDetail: {
      type: Object,
      value: {}
    },
    listData: {
      type: Array,
      value: []
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
    getNextData() {
      this.triggerEvent('myevent')
    }
  }
})