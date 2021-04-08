// pages/train/train.js
let app = getApp();
import {
  getExamineList
} from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabBarData: ['我的提交', '审核处理中', '审核完成'],
    currentTab: 0,
    pageSize: 5,
    pageNum: 1,
    pageTotal: 0,
    listData: [],
  },
  setCurrentTab(event) {
    const {
      index
    } = event.currentTarget.dataset;
    this.setData({
      currentTab: index,
      listData: [],
      pageNum: 1
    }, () => {
      this.getExamineList();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.myOpenId && wx.myPhone) {
      this.getExamineList();
    } else {
      app.getUser(() => {
        this.getExamineList();
      })
    }
  },
  //获取列表
  getExamineList() {
    const {
      currentTab,
      pageNum,
      pageSize,
      listData
    } = this.data;
    getExamineList({
      pageNum,
      pageSize,
      "myQueryType": '0'+(currentTab+1), //01:我的提交, 02:审核处理中, 03:审核完成
      "wechatId": wx.myOpenId,
      "phone": wx.myPhone
    }).then((data) => {
      this.setData({
        pageTotal: data.pageTotal,
        listData: listData.concat(data.rows)
      })
    })
  },
  customer(event) {
    let currentTab = this.data.currentTab;
    currentTab = '0'+(currentTab+1);
    const item = event.currentTarget.dataset.item;
    if (currentTab === '01' || currentTab === '02'){
      app.globalData.customer = {
        type: '01',
        customerName: item.customerName,
        customerPoolId: item.customerPoolId,
        customerApplyId: item.customerApplyId
      }
      wx.navigateTo({
        url: `/pages/customer/customer`,
      })
    }else{
      wx.navigateTo({
        url:`/pages/edit-myCustomer/edit-myCustomer?customerId=${item.customerId}`,
      })
    }
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
        this.getExamineList();
      })
    }
  }
})