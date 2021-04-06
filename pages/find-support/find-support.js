// pages/find-support/find-support.js
import {
  supportList,
  updateSupportMsgStatus

} from '../../api/index'
let app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageSize: 5,
    pageNum: 1,
    pageTotal: 5,
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
    if (wx.myOpenId && wx.myPhone) {
      this.onshowInit();
    } else {
      app.getUser(() => {
        this.onshowInit();
      });
    }
  },
  onshowInit(){
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
    supportList(params).then(data => {
      this.setData({
        pageTotal: data.pageTotal,
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
  customer(event) {
    console.log(event)
    const {
      customerid,
      supportmsg
    } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/support-consulting/support-consulting?customerid=${customerid}`,
      success: (res)=> {
        if(!supportmsg)return;
        updateSupportMsgStatus(customerid)
      }
    })
  }
})