// pages/mine/mine.js
import {
  myData,
  myDataInfo
} from '../../api/login'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headTop:`${wx.navHeight+(16/wx.pixelRatio)}px`,
    myTop:`${wx.navHeight+(210/wx.pixelRatio)}px`,
    barHeight:`${wx.navHeight}px`,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goMyDetail() {
    wx.navigateTo({
      url: '/pages/mineDetail/mineDetail',
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
    this.getMyData();
    // this.getMyInfo();
  },
  // getMyInfo(){
  //   myData({
  //     "phone": wx.myPhone,
  //     "wechatId": wx.myOpenId
  //   }).then((data)=>{
  //     this.setData({
  //       my:data
  //     })
  //   })
  // },
  getMyData() {
    myDataInfo({
      "phone": wx.myPhone,
      "wechatId": wx.myOpenId
    }).then((data) => {
      this.setData({
        myData: data
      })
    })
  },
  goOneServe(e) {
    const {
      type
    } = e.currentTarget.dataset;
    let url='';
    switch (type) {
      case 'visitor':
      url = '/pages/my-visit/my-visit'
      break;
      case 'train':
      url = '/pages/my-train/my-train'
      break;
      case 'examine':
      url = '/pages/toExamine/toExamine';
      break;
    }
    console.log(url,'url')
    // if(type=='train'){
    //   wx.switchTab({
    //     url:url
    //   })
    // }else{
      wx.navigateTo({
        url: url,
      })
    // }
    
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