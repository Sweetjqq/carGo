// pages/customer/customer.js
let app =getApp();
import {
  saveCustomerPool,
  updateCustomerPool,
  getApplyCustomer
} from '../../api/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer: {
      customerName: '',
      industry: '',
      money: "",
      people_number: '',
      insurance_company: '',
      annualPremium: '', //年保费
      due_date: "",
      previous: "",
      payment_detail: '',
      related_party: '',
      related_name: '',
      insurance_opportunities: ''
    },
    peopleArray: [10, 20, 30, 40, 50],
    industryArray: ['阿里', '腾讯', '唯品会', '涂虎'],
    insuranceArray: ['太平洋', '中国平安'],
    showModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let customer = app.globalData.customer;
    this.setData({
      customer,
    },()=>{
      app.globalData.customer=null
    })
    if(customer.type=='02'){
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
        customer[type] = industryArray[value];
        break;
      case "people_number":
        customer[type] = peopleArray[value];
        break;
      case "due_date":
        customer[type] = value;
        break;
      case "insurance_opportunities":
        customer[type] = insuranceArray[value];
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
      value
    } = event.detail;
    console.log(value)
  },
  getData() {
    console.log("*****")
    this.setData({
      showModal: true
    })
  },
  modalClick() {
    this.setData({
      showModal: false
    })
    console.log("modal点击了ok")
  },
  //抢Api
  grabCustomer() {
    saveCustomerPool().then(data => {
      console.log(data)
    }).catch(error => {
      console.log(error)
    })
  },
  //改API
  upDataCustomer(){
    updateCustomerPool().then(data=>{

    }).catch(err =>{
      console.log(err)
    })
  },
  // 获取详情
  getCustomerInfo(){
    getApplyCustomer().then(data=>{

    }).catch(err =>{
      app.showTip(err.message,()=>{
        wx.navigateBack({})
      })
    })

  },
  paramsHandle(){
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
  }
})