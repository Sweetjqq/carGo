// pages/visit-detail/conponents/new-visit/new-visit.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    customer: {
      type: Object,
      value: {
        customer_name: '',
        visit_method: '',
        visit_time: '',
        position: '',
        visit_name: ''
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    methodArray: ['见面', '腾讯会议']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange(event) {
      const {
        value
      } = event.detail;
      const {
        customer,
        methodArray
      } = this.data;
      const {
        type
      } = event.currentTarget.dataset;
      switch (type) {
        case 'visit_method':
          customer[type] = methodArray[value];
          break;
        case "visit_time":
          customer[type] = value;
          break;
        default:
          break;
      }
      this.setData({
        customer
      })
    },
  }
})