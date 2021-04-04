// pages/train/train.js
let app = getApp();
import {
  getTrainList
} from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabBarData: ['未学', '已学'],
    currentTab: 0,
    pageSize: 5,
    pageNum: 1,
    pageTotal: 0,
    listData: []
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
      this.getTrainList();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTrainList();
  },
  //获取列表
  getTrainList() {
    const {
      currentTab,
      pageNum,
      pageSize,
      listData
    } = this.data;
    getTrainList({
      pageNum,
      pageSize,
      "queryType": currentTab === 0 ? "01" : '02', //01已学,02未学
      "wechatId": wx.myOpenId,
      "phone": wx.myPhone
    }).then((data) => {
      this.setData({
        pageTotal: data.pageTotal,
        listData: listData.concat(data.rows)
      })
    })
  },
  goDetail(event) {
    console.log(event)
    const {
      trainid
    } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/train-detail/train-detail?trainid=${trainid}`,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
})