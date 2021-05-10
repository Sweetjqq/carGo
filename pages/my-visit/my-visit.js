// pages/train/train.js
let app = getApp();
import {
  baseHost
} from '../../utils/env-config';
import {
  myVisitList
} from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageSize: 5,
    pageNum: 1,
    pageTotal: 0,
    listData: [],
    baseHost: baseHost
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow() {
    this.setData({
      pageNum: 1,
      listData: []
    }, () => {
      this.myVisitList();
    })
  },
  //获取列表
  myVisitList() {
    const {
      pageNum,
      pageSize,
      listData
    } = this.data;
    myVisitList({
      pageNum,
      pageSize,
      "wechatId": wx.myOpenId,
      "phone": wx.myPhone
    }).then((data) => {
      this.setData({
        pageTotal: data.pageTotal,
        listData: listData.concat(data.rows)
      })
    })
  },
  editMyVisit(event) {
    const {
      visitid
    } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/edit-myVisit/edit-myVisit?visitId=${visitid}`,
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
        this.myVisitList();
      })
    } else {
      this.setData({
        isFinished: true
      })
    }
  }
})