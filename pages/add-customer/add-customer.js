let app = getApp();
import {
  addCustomer,
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
      contactsPhone: '',
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
    }],
    showInsurance: false,
    selected: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDictData();
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
        customer[type] = industryArray[value].dictValue;
        customer.industry_value = industryArray[value].dictLabel;
        break;
      case "peopleNumber":
        customer.peopleNumber_value = peopleArray[value].dictLabel;
        customer[type] = peopleArray[value].dictValue;
        break;
      case "dueDate":
        customer[type] = value;
        break;
      case "insuranceChance":
        customer[type] = insuranceArray[value].dictValue;
        customer.insuranceChance_value = insuranceArray[value].dictLabel;
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
  add(params) {
    addCustomer(params).then(data => {
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 1500
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/visit-customer/visit-customer',
        })
      }, 1600)
    })
  },
  addCustomer() {
    const {
      customer
    } = this.data;
    let newParams = {
      ...customer,
      phone: wx.myPhone,
      wechatId: wx.myOpenId
    }
    let valited = {
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
      contactsPhone: '',
      insuranceChance: null,
    }
    let hasValited = {};
    for (let key in customer) {
      if (Object.keys(valited).includes(key) && customer[key]) {
        hasValited[key] = customer[key]
      }
    }
    if (Object.keys(hasValited).length > 2) {
      this.add(newParams);
    } else {
      wx.showToast({
        title: '请填写至少三项',
        icon: 'none'
      })
    }
  },
  modalClick() {
    this.setData({
      showModal: false
    })
    console.log("modal点击了ok")
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
      })
    })
  },
  getInsData(e) {
    const {
      reDictLabel,
      reDictValue
    } = e.detail;
    const {
      customer
    } = this.data;
    this.setData({
      customer: {
        ...customer,
        insuranceChance: reDictValue,
        insuranceChance_value: reDictLabel
      }
    })
  },
  setSelected() {
    this.setData({
      showInsurance: true
    })
  },
})