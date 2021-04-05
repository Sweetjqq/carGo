// pages/visit-detail/visit-detail.js
const app = getApp();
import {
  getDictData,
  getVisitList
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
    pageSize: 5,
    pageNum: 1,
    pageTotal: 0,
    listData: []
  },
  setCurrentTab(event) {
    const {
      index
    } = event.currentTarget.dataset;
    if (index === 1) {
      this.getVisitList();
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

  },
  // 获取字典字数
  getDictData() {
    getDictData('sys_visit_type').then(data => {
      this.setData({
        visitType: data
      })
    })
  },
  getVisitList() {
    const {
      pageNum,
      pageSize,
      listData,
      customer
    } = this.data;
    const params = {
      pageNum,
      pageSize,
      phone: wx.myPhone,
      wechatId: wx.myOpenId,
      customerId:customer.customerId,
    }
    getVisitList(params).then(data => {
      console.log(data)
    })
  }
})