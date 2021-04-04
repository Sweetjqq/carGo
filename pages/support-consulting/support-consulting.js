// pages/support-consulting/support-consulting.js
import {
  getCusVisitList
} from '../../api/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    pageSize: 5,
    pageNum: 1,
    pageTotal: 0,
    listData: []
  },
  getValue(event) {
    console.log(event)
    const {
      value
    } = event.detail;
    this.setData({
      value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      customerid
    } = options;
    this.setData({
      customerid
    }, () => {
      this.getList();
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  getList() {
    const {
      pageNum,
      pageSize,
      listData,
      customerid
    } = this.data;
    const params = {
      customerId: customerid,
      pageNum,
      pageSize,
      phone: wx.myPhone,
      wechatId: wx.myOpenId
    }
    getCusVisitList(params).then(data => {
      this.setData({
        pageTotal: data.pageTotal,
        listData: listData.concat(data.rows)
      })
    }).catch(error => {
      console.log(error)
    })
  },
})