// pages/public-info/public-info.js
import {
  getDictData,
  getCommonDataList,
  addCommonRecode
} from '../../api/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabContent: [],
    activeTab: 0,
    listData: [],
    pageSize: 5,
    pageNum: 1,
    pageTotal: 0,
    dictType: 'sys_commondata_type',
    fileType: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDictData();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  setActiveTab(event) {
    const {
      index,
      filetype
    } = event.currentTarget.dataset;
    this.setData({
      activeTab: index,
      pageNum: 1,
      listData: [],
      fileType: filetype
    }, () => {
      this.getList();
    })
  },
  // 获取字典
  getDictData() {
    const {
      dictType
    } = this.data;
    getDictData(dictType).then(data => {
      if (data.length > 0) {
        this.setData({
          tabContent: data,
          fileType: data[0].dictValue
        }, () => {
          this.getList();
        })
      }
    })
  },
  getList() {
    const {
      pageNum,
      pageSize,
      listData,
      fileType
    } = this.data;
    const params = {
      pageNum,
      pageSize,
      fileType,
      phone: wx.myPhone,
      wechatId: wx.myOpenId
    }
    this.setData({
      isFinished: false
    })
    getCommonDataList(params).then(data => {
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
  // 分页加载
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
  webView(event) {
    const {
      id,
      path
    } = event.currentTarget.dataset;
    wx.downloadFile({
      url: path,
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          // showMenu: true,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
    // const webView = encodeURIComponent(path)
    // wx.navigateTo({
    //   url: `/pages/web-view/web-view?webView=${webView}`,
    // })
    this.setData({
      commondataId: id,
      path
    }, () => {
      this.addRecode()
    })
  },
  addRecode() {
    const {
      commondataId,
      fileType
    } = this.data;
    const params = {
      fileType,
      commondataId,
      fileType,
      phone: wx.myPhone,
      wechatId: wx.myOpenId
    }
    addCommonRecode(params).then(data => {}).catch(error => {
      console.log(error)
    })
  }
})