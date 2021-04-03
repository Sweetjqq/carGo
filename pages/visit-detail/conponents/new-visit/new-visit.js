// pages/visit-detail/conponents/new-visit/new-visit.js
import {
  addCusVisit
} from '../../../../api/index'
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
        customerName: '',
        visit_method: '',
        visitDate: '',
        visitPost: '',
        visitName: '',
        visitContent: '',
        needSupport: ''
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
        case "visitDate":
          customer[type] = value;
          break;
        default:
          break;
      }
      this.setData({
        customer
      })
    },
    getInputValue(event) {
      const {
        customer
      } = this.data;
      const {
        type
      } = event.currentTarget.dataset;
      const {
        value
      } = event.detail;
      this.setData({
        customer: {
          ...customer,
          [type]: value
        }
      })

    },
    addVisit(params) {
      addCusVisit(params).then(data => {
        wx.showToast({
          title: '新增拜访记录成功',
          icon: 'success',
          duration: 1500
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/visit-customer/visit-customer',
          })
        }, 1600)
      }).catch(error => {
        console.log(error)
      })
    },
    submit() {
      const {
        customer
      } = this.data;
      this.addVisit(customer);
    }
  }
})