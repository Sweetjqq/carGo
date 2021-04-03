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
    this.getTrainList();
  },
  //获取列表
  getTrainList() {
    getTrainList({
      "pageNum": 1,
      "pageSize": 3,
      "queryType": "01", //01已学,02未学
      "wechatId": wx.myOpenId,
      "phone": wx.myPhone
    }).then((data) => {

    })
  },
  goDetail(){
  wx.navigateTo({
    url: '/pages/train-detail/train-detail',
  })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})