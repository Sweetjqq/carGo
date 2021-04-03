import {
  getPoolCustomerList,
  getBanners
} from '../../api/index'
const app = getApp()

Page({
  data: {
    background: [],
    autoplay: true,
    interval: 2000,
    duration: 500,
    circular: true,
    current: 0,
    tabContent: ['全国机会', '身边机会'],
    activeTab: 0,
    buttonType: {
      '01': {
        text: '抢',
        bgColor: '#3E95FD'
      },
      '02': {
        text: '改',
        bgColor: '#FD9A3E'
      },
      '03': {
        text: '名花有主',
        bgColor: '#80CA5B'
      }
      //01 抢 02 改 03 名花有主
    },
    listData: [],
    inputValue: "",
    pageSize: 5,
    pageNum: 1,
    pageTotal: 5
  },

  onLoad() {},
  onShow() {
    if (wx.myOpenId && wx.myPhone) {
      this.onshowInit();
    } else {
      app.getUser(() => {
        this.onshowInit();
      });
    }
  },
  onshowInit() {
    this.getList();
    this.getBanner();
  },
  getBanner() {
    getBanners({
      "phone": wx.myPhone,
      "wechatId": wx.myOpenId
    }).then(data => {
      this.setData({
        background: data
      })
    });
  },
  getCurrent(event) {
    const {
      current
    } = event.detail;
    this.setData({
      current
    })
  },
  setActiveTab(event) {
    const {
      index
    } = event.currentTarget.dataset;
    this.setData({
      activeTab: index,
      pageNum:1,
      listData:[],
      inputValue:''
    }, () => {
      this.getList();
    })
  },
  /**
   * 获取机会客户列表
   * @param {*} event 
   * queryType  01:首页全国机会, 02:首页身边机会
   */
  getList() {
    const {
      activeTab,
      pageNum,
      pageSize,
      listData,
      inputValue
    } = this.data;
    getPoolCustomerList({
      customerName: inputValue,
      phone: wx.myPhone,
      queryType: activeTab == 1 ? "02" : "01",
      wechatId: wx.myOpenId,
      pageNum: pageNum,
      pageSize: pageSize
    }).then(data => {
      this.setData({
        listData: listData.concat(data)
      })
    })
  },
  customer(event) {
    console.log(event);
    const item = event.currentTarget.dataset.item;
    app.globalData.customer = {
      type: item.status,
      customerName: item.customerName,
      customerPoolId: item.customerPoolId,
      customerApplyId: item.customerApplyId
    }
    wx.navigateTo({
      url: `/pages/customer/customer`,
    })
  },
  searchList(event) {
    const {
      value
    } = event.detail;
    this.setData({
      inputValue:value,
      pageNum:1,
      listData:[]
    },function(){
      this.getList();
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
      })
      this.getList();
    }
  },
})