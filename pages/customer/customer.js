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
      industry: '',
      turnover: "",
      peopleNumber: '',
      inscompanyname: '',
      annualPremium: '', //年保费
      dueDate: "",
      lossRatio: "",
      lossDetail: '',
      contactsPost: '',
      contactsName: '',
      insuranceChance: '',
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
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDictData();
    let globalCustomer = app.globalData.customer;
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
    if (customer.type === '01') {
      this.grabCustomer();
    } else if (customer.type === '02') {
      this.upDataCustomer();
    }
  },
  modalClick() {
    this.setData({
      showModal: false
    })
    console.log("modal点击了ok")
  },
  //抢Api
  grabCustomer() {
    const {
      customer
    } = this.data;
    let newParams = {
      ...customer,
      phone: wx.myPhone,
      wechatId: wx.myOpenId
    }
    saveCustomerPool(newParams).then(data => {
      console.log(data)
    }).catch(error => {
      console.log(error)
    })
  },
  //改API
  upDataCustomer() {
    const {
      customer
    } = this.data;
    updateCustomerPool(customer).then(data => {

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
      console.log(data, 'getApplyCustomer')
    }).catch(err => {
      app.showTip(err.message, () => {
        wx.navigateBack({})
      })
    })

  },
  paramsHandle() {
    let data = {
      "annualPremium": 0,
      "contactsName": "string",
      "contactsPhone": "string",
      "contactsPost": "string",
      "customerApplyId": 0,
      "customerName": "string",
      "customerPoolId": 0,
      "deptId": 0,
      "dueDate": "string",
      "industry": "string",
      "inscompanyname": "string",
      "insuranceChance": "string",
      "lossDetail": "string",
      "lossRatio": "string",
      "peopleNumber": 0,
      "phone": wx.myOpenId,
      "turnover": "string",
      "wechatId": wx.myOpenId
    }
    return data;
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