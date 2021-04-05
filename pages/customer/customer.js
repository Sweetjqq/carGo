// pages/customer/customer.js
let app = getApp();
import {
  saveCustomerPool,
  updateCustomerPool,
  getApplyCustomer,
  getDictData
} from '../../api/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer: {
      customerName: '',
      industry: null,
      turnover: "",
      peopleNumber: null,
      inscompanyname: '',
      annualPremium: '', //年保费
      dueDate: null,
      lossRatio: "",
      lossDetail: '',
      contactsPost: '',
      contactsName: '',
      insuranceChance: null,
    },
    peopleArray: [],
    industryArray: [],
    insuranceArray: [],
    showModal: false,
    titleText: '',
    dictType: [{
      dataType: 'insuranceArray',
      params: 'sys_risk_type'
    }, {
      dataType: 'peopleArray',
      params: 'sys_peoples_type'
    }, {
      dataType: 'industryArray',
      params: 'sys_industry_type'
    }],
    options: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDictData();
    let globalCustomer = app.globalData.customer;
    console.log(globalCustomer,'globalCustomer')
    const {
      customer
    } = this.data;
    this.setData({
      customer: Object.assign(customer, globalCustomer),
      titleText: customer.type === '02' ? '修改客户' : '抢客户',
      btnText: customer.type === '02' ? '提交修改' : '客户归我'
    }, () => {
      app.globalData.customer = null
    })
    if (customer.type == '02') {
      this.getCustomerInfo();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  bindPickerChange(event) {
    console.log(event)
    const {
      value
    } = event.detail;
    const {
      customer,
      peopleArray,
      industryArray,
      insuranceArray
    } = this.data;
    const {
      type
    } = event.currentTarget.dataset;
    switch (type) {
      case 'industry':
        customer[type] = industryArray[value].dictLabel;
        break;
      case "peopleNumber":
        customer[type] = peopleArray[value].dictLabel;
        break;
      case "dueDate":
        customer[type] = value;
        break;
      case "insuranceChance":
        customer[type] = insuranceArray[value].dictLabel;
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
  getData() {
    const {
      customer
    } = this.data;
    let newParams = {
      ...customer,
      phone: wx.myPhone,
      wechatId: wx.myOpenId
    }
    if (customer.type === '01') {
      this.grabCustomer(newParams);
    } else if (customer.type === '02') {
      this.upDataCustomer(newParams);
    }
  },
  modalClick() {
    const {
      options
    } = this.data;
    this.setData({
      options: {
        ...options,
        show: false
      }
    })
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  //抢Api
  grabCustomer(params) {
    saveCustomerPool(params).then(data => {
      const {
        message
      } = data;
      const {
        options
      } = this.data;
      this.setData({
        options: {
          ...options,
          show: true,
          icon: 'success',
          title: '提交成功',
          mdMessage: message
        }
      })
    }).catch(error => {
      console.log(error)
    })
  },
  //改API
  upDataCustomer(params) {
    updateCustomerPool(params).then(data => {
      wx.showToast({
        title: '修改信息成功',
        icon: 'success',
        duration: 1500
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/index/index',
        })
      }, 1600)
    }).catch(err => {
      console.log(err)
    })
  },
  // 获取详情
  getCustomerInfo() {
    const {
      customer
    } = this.data;
    getApplyCustomer(customer.customerApplyId).then(data => {
      this.setData({
        customer: Object.assign(customer, data)
      })
    }).catch(err => {
      app.showTip(err.message, () => {
        wx.navigateBack({})
      })
    })

  },
  // 获取字典字数
  getDictData() {
    const {
      dictType
    } = this.data;
    dictType.forEach((value, index) => {
      getDictData(value.params).then(data => {
        let obj = {};
        obj[value.dataType] = data;
        this.setData(obj)
        console.log(data, value.dataType, 'getApplyCustomer')
      })
    })
  }
})