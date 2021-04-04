// pages/visit-detail/visit-detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabBarData: ['新增拜访', '过往拜访记录'],
    currentTab: 0,
    customer: {}
  },
  setCurrentTab(event) {
    const {
      index
    } = event.currentTarget.dataset;
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
      customerName
    } = globalCustomer;
    const {
      customer
    } = this.data;
    this.setData({
      customer: {
        ...customer,
        customerName
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
})