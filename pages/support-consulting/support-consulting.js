// pages/support-consulting/support-consulting.js
import {
  getCusVisitList,
  addCusSupprot
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
    const {
      value
    } = event.detail;
    this.setData({
      content: value.replace(/(^\s*)|(\s*$)/g, "")
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
    this.setData({
      isFinished: false
    })
    getCusVisitList(params).then(data => {
      if (pageNum >= data.pageTotal) {
        this.setData({
          isFinished: true
        })
      }
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
  addCusSupprot() {
    const {
      customerid,
      content
    } = this.data;
    const params = {
      customerId: customerid,
      phone: wx.myPhone,
      wechatId: wx.myOpenId,
      content
    }
    addCusSupprot(params).then(data => {
      this.setData({
        pageNum: 1,
        pageTotal: 0,
        listData: [],
        content: ''
      }, () => {
        this.getList()
      })
    }).catch(error => {
      console.log(error)
    })
  },
  submit() {
    const {
      content
    } = this.data;
    if (content === "") {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 1500
      })
    } else {
      this.addCusSupprot();
    }
  }
})