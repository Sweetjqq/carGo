// pages/customer/customer.js
let app = getApp();
import {
  getCustomerById,
  updateCustomer,
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
      contactsPhone: '',
      insuranceChance: null,
    },
    peopleArray: [],
    industryArray: [],
    insuranceArray: [],
    showModal: false,
    titleText: '修改我的客户信息',
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
    options: {},
    customerId: '',
    showInsurance: false,
    selected: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      customerId
    } = options;
    this.setData({
      customerId
    }, () => {
      this.getDictData();
    })

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
  getData() {
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
      this.upDataCustomer(newParams);
    } else {
      wx.showToast({
        title: '请填写至少三项',
        icon: 'none'
      })
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
  //改API
  upDataCustomer(params) {
    updateCustomer(params).then(data => {
      wx.showToast({
        title: '修改信息成功',
        icon: 'success',
        duration: 1500
      })
      setTimeout(() => {
        wx.navigateBack({})
        // wx.navigateTo({
        //   url: '/pages/visit-detail/visit-detail',
        // })
      }, 1600)
    }).catch(err => {
      console.log(err)
    })
  },
  // 获取详情
  getCustomerById() {
    let {
      customer,
      peopleArray,
      industryArray,
      insuranceArray,
      customerId
    } = this.data;
    getCustomerById(customerId).then(data => {
      console.log(industryArray, '************');
      if (data.industry) {
        industryArray.map(item => {
          if (item.dictValue == data.industry) {
            customer.industry_value = item.dictLabel;
          }
        })
      }
      if (data.peopleNumber) {
        peopleArray.map(item => {
          if (item.dictValue == data.peopleNumber) {
            customer.peopleNumber_value = item.dictLabel;
          }
        })
      }
      if (data.insuranceChance) {

        if (data.insuranceChance.indexOf(",") === -1) {
          insuranceArray.map(item => {
            if (item.dictValue == data.insuranceChance) {
              customer.insuranceChance_value = item.dictLabel;
              this.setData({
                selected: [item.dictValue]
              })
            }
          })
        } else {
          let label = [],
            value = [];
          const insuranceChanceArr = data.insuranceChance.split(",");
          insuranceChanceArr.map(item => {
            insuranceArray.map(only => {
              if (item == only.dictValue) {
                label.push(only.dictLabel);
                value.push(only.dictValue)
              }
            })
          })
          customer.insuranceChance_value = label.join(',');
          this.setData({
            selected: value
          })
        }
      }
      this.setData({
        customer: Object.assign(customer, data)
      })
    })
  },
  // 获取字典字数
  async getDictData() {
    const {
      dictType
    } = this.data;
    for (let i = 0; i < dictType.length; i++) {
      await getDictData(dictType[i].params).then(data => {
        let obj = {};
        obj[dictType[i].dataType] = data;
        this.setData(obj);
        if (i == dictType.length - 1) {
          this.getCustomerById();
        }
      })
    }
  },
  setSelected() {
    this.setData({
      showInsurance: true
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
})