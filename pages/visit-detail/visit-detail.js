// pages/visit-detail/visit-detail.js
const app = getApp();
import {
  getDictData,
  getVisitList,
  getCustomerById
} from '../../api/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabBarData: ['新增拜访', '过往拜访记录'],
    currentTab: 0,
    customer: {},
    visitType: [],
    peopleArray: [],
    industryArray: [],
    insuranceArray: [],
    pageSize: 5,
    pageNum: 1,
    pageTotal: 0,
    listData: [],
    customerDetail: {},
    dictType: [{
      dataType: 'insuranceArray',
      params: 'sys_risk_type'
    }, {
      dataType: 'peopleArray',
      params: 'sys_peoples_type'
    }, {
      dataType: 'industryArray',
      params: 'sys_industry_type'
    }, {
      dataType: 'visitType',
      params: 'sys_visit_type'
    }],
  },
  setCurrentTab(event) {
    const {
      index
    } = event.currentTarget.dataset;
    if (index === 1) {
      this.getVisitList();
      this.getCustomerById();
    }
    this.setData({
      currentTab: index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let globalCustomer = app.globalData.customer;
    const {
      customer
    } = this.data;
    this.setData({
      customerId: globalCustomer.customerId,
      customer: Object.assign(customer, globalCustomer)
    })
    this.getDictData();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const {
      currentTab
    } = this.data;
    if (currentTab === 1) {
      this.setData({
        pageNum: 1,
        listData: []
      }, () => {
        this.getVisitList();
      })
      this.getCustomerById();
    }
  },
  // 获取字典字数
  async getDictData() {
    const {
      dictType,
      customer
    } = this.data;
    for (let i = 0; i < dictType.length; i++) {
      await getDictData(dictType[i].params).then(data => {
        let obj = {};
        obj[dictType[i].dataType] = data;
        this.setData(obj);
        if (i == dictType.length - 1) {
          if (customer.type == '01') {
            this.getCustomerInfo();
          }
        }
      })
    }
  },
  getVisitList() {
    const {
      pageNum,
      pageSize,
      listData,
      customer,
      visitType
    } = this.data;
    const params = {
      pageNum,
      pageSize,
      phone: wx.myPhone,
      wechatId: wx.myOpenId,
      customerId: customer.customerId,
    }
    this.setData({
      isFinished: false
    })
    getVisitList(params).then(data => {
      //  处理picker数据
      let changeData = JSON.parse(JSON.stringify(data.rows));
      changeData.map(item => {
        visitType.map(only => {
          if (item.visitType === only.dictValue) {
            item.visitType = only.dictLabel;
          }
        })
      })
      if (pageNum >= data.pageTotal) {
        this.setData({
          isFinished: true
        })
      }
      this.setData({
        pageTotal: data.pageTotal,
        listData: listData.concat(changeData)
      })
    })
  },
  getCustomerById() {
    const {
      customer,
      peopleArray,
      industryArray,
      insuranceArray
    } = this.data;
    getCustomerById(customer.customerId).then(data => {
      // 处理picker数据
      if (data.industry) {
        industryArray.map(item => {
          if (item.dictValue == data.industry) {
            data.industry = item.dictLabel;
          }
        })
      }
      if (data.peopleNumber) {
        peopleArray.map(item => {
          if (item.dictValue == data.peopleNumber) {
            data.peopleNumber = item.dictLabel;
          }
        })
      }
      if (data.insuranceChance) {
        if (data.insuranceChance.indexOf(",") > -1) {
          let label = [];
          const insuranceChanceArr = data.insuranceChance.split(",");
          insuranceChanceArr.map(item => {
            insuranceArray.map(only => {
              if (item == only.dictValue) {
                label.push(only.dictLabel);
              }
            })
          })
          data.insuranceChance = label.join(',');
        } else {
          insuranceArray.map(item => {
            if (item.dictValue == data.insuranceChance) {
              data.insuranceChance = item.dictLabel;
            }
          })
        }
      }
      this.setData({
        customerDetail: data
      })
    })
  },
  getNextPageData() {
    const {
      pageNum,
      pageTotal
    } = this.data;
    if (pageNum < pageTotal) {
      let newPageNum = pageNum + 1;
      this.setData({
        pageNum: newPageNum
      }, () => {
        this.getVisitList();
      })
    }
  },
})