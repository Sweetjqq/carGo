// pages/login/login.js
let app = getApp();
import {
  phoneChecke
} from '../../api/login'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    options: {

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  modalClick() {
    const {
      options
    } = this.data;
    this.setData({
      options: {
        ...options,
        show: false
      }
    })
    console.log("modal点击了ok")
  },
  getInputValue(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  phoneBind() {
    let phone = this.data.phone;
    if (!this.checkPhone(this.data.phone)) {
      app.showTip('请输入合法的手机号')
    } else {
      //验证手机号
      phoneChecke(phone).then(data => {
        wx.navigateTo({
          url: `/pages/smsCode/smsCode?phone=${phone}`,
        })
      }).catch(err => {
        const {
          options
        } = this.data;
        this.setData({
          options: {
            ...options,
            show: true,
            icon: 'fail',
            title: '验证失败',
            mdMessage:err.message&&[err.message]
          }
        })
      })
    }
  },
  checkPhone(number) {
    let filter = /^1\d{10}$/;
    return filter.test(number);
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