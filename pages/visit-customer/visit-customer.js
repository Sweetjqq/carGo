// pages/visit-customer/visit-customer.js
import {
  getCustomerList
} from '../../api/index';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageSize: 5,
    pageNum: 1,
    pageTotal: 0,
    customerName: '',
    listData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      pageNum: 1,
      customerName: '',
      listData: []
    }, () => {
      this.getList();
    })
  },
  getList() {
    const {
      pageNum,
      pageSize,
      customerName,
      listData
    } = this.data;
    const params = {
      customerName,
      pageNum,
      pageSize,
      phone: wx.myPhone,
      wechatId: wx.myOpenId
    }
    getCustomerList(params).then(data => {
      this.setData({
        pageTotal:data.pageTotal,
        listData: listData.concat(data.rows)
      })
    }).catch(error => {
      console.log(error)
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
        this.getList();
      })
    }
  },
  searchList(event) {
    const {
      value
    } = event.detail;
    this.setData({
      customerName: value,
      pageNum: 1,
      listData: []
    }, function () {
      this.getList();
    })
  },
  addCustomer() {
    wx.navigateTo({
      url: '/pages/add-customer/add-customer',
    })
  },
  customer(event) {
    const item = event.currentTarget.dataset.item;
    app.globalData.customer =item;
    wx.navigateTo({
      url: `/pages/visit-detail/visit-detail`,
    })
  },
})